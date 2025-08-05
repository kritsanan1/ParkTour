import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertBusinessSchema, insertReviewSchema, insertVirtualTourSchema } from "@shared/schema";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Business routes
  app.get('/api/businesses', async (req, res) => {
    try {
      const { category, limit } = req.query;
      const businesses = await storage.getBusinesses(
        category as string,
        limit ? parseInt(limit as string) : undefined
      );
      res.json(businesses);
    } catch (error) {
      console.error("Error fetching businesses:", error);
      res.status(500).json({ message: "Failed to fetch businesses" });
    }
  });

  app.get('/api/businesses/:id', async (req, res) => {
    try {
      const business = await storage.getBusinessById(req.params.id);
      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }
      
      // Increment view count
      await storage.incrementBusinessViews(req.params.id);
      
      res.json(business);
    } catch (error) {
      console.error("Error fetching business:", error);
      res.status(500).json({ message: "Failed to fetch business" });
    }
  });

  app.get('/api/my-businesses', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const businesses = await storage.getBusinessesByUserId(userId);
      res.json(businesses);
    } catch (error) {
      console.error("Error fetching user businesses:", error);
      res.status(500).json({ message: "Failed to fetch businesses" });
    }
  });

  app.post('/api/businesses', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertBusinessSchema.parse(req.body);
      const business = await storage.createBusiness(userId, validatedData);
      res.status(201).json(business);
    } catch (error) {
      console.error("Error creating business:", error);
      res.status(400).json({ message: "Invalid business data" });
    }
  });

  app.put('/api/businesses/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const business = await storage.getBusinessById(req.params.id);
      
      if (!business || business.userId !== userId) {
        return res.status(404).json({ message: "Business not found or unauthorized" });
      }
      
      const validatedData = insertBusinessSchema.partial().parse(req.body);
      const updatedBusiness = await storage.updateBusiness(req.params.id, validatedData);
      res.json(updatedBusiness);
    } catch (error) {
      console.error("Error updating business:", error);
      res.status(400).json({ message: "Invalid business data" });
    }
  });

  // Review routes
  app.get('/api/businesses/:id/reviews', async (req, res) => {
    try {
      const reviews = await storage.getReviewsByBusinessId(req.params.id);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post('/api/businesses/:id/reviews', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const reviewData = {
        ...req.body,
        businessId: req.params.id,
      };
      const validatedData = insertReviewSchema.parse(reviewData);
      const review = await storage.createReview(userId, validatedData);
      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(400).json({ message: "Invalid review data" });
    }
  });

  // Virtual tour routes
  app.get('/api/businesses/:id/virtual-tours', async (req, res) => {
    try {
      const tours = await storage.getVirtualToursByBusinessId(req.params.id);
      res.json(tours);
    } catch (error) {
      console.error("Error fetching virtual tours:", error);
      res.status(500).json({ message: "Failed to fetch virtual tours" });
    }
  });

  app.post('/api/businesses/:id/virtual-tours', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const business = await storage.getBusinessById(req.params.id);
      
      if (!business || business.userId !== userId) {
        return res.status(404).json({ message: "Business not found or unauthorized" });
      }
      
      const tourData = {
        ...req.body,
        businessId: req.params.id,
      };
      const validatedData = insertVirtualTourSchema.parse(tourData);
      const tour = await storage.createVirtualTour(validatedData);
      res.status(201).json(tour);
    } catch (error) {
      console.error("Error creating virtual tour:", error);
      res.status(400).json({ message: "Invalid virtual tour data" });
    }
  });

  // Stripe payment routes
  app.post("/api/create-payment-intent", isAuthenticated, async (req: any, res) => {
    try {
      const { amount, feature, businessId, plan } = req.body;
      const userId = req.user.claims.sub;
      
      // Handle pricing packages
      let finalAmount = amount;
      if (plan) {
        const pricingMap: { [key: string]: number } = {
          'เบสิค': 1500,
          'Basic': 1500,
          'โปร': 3000,
          'Pro': 3000,
          'พรีเมี่ยม': 5000,
          'Premium': 5000
        };
        finalAmount = pricingMap[plan] || amount;
      }
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(finalAmount * 100), // Convert to satang (Thai cents)
        currency: "thb",
        metadata: {
          userId,
          feature: feature || plan || "package",
          businessId: businessId || "",
          plan: plan || "",
        },
      });

      // Create payment transaction record
      await storage.createPaymentTransaction({
        userId,
        businessId: businessId || null,
        stripePaymentIntentId: paymentIntent.id,
        amount: finalAmount.toString(),
        currency: "thb",
        status: "pending",
        type: plan ? "subscription" : "one_time",
        feature: feature || plan || "package",
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Premium subscription route
  app.post('/api/get-or-create-subscription', isAuthenticated, async (req: any, res) => {
    try {
      let user = req.user;
      const userId = user.claims.sub;

      if (user.stripeSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId, {
          expand: ['latest_invoice.payment_intent']
        });
        const latestInvoice = subscription.latest_invoice as any;
        res.json({
          subscriptionId: subscription.id,
          clientSecret: latestInvoice?.payment_intent?.client_secret,
        });
        return;
      }

      if (!user.claims.email) {
        return res.status(400).json({ message: 'No user email on file' });
      }

      const customer = await stripe.customers.create({
        email: user.claims.email,
        name: `${user.claims.first_name || ''} ${user.claims.last_name || ''}`.trim(),
      });

      await storage.updateUserStripeInfo(userId, customer.id, "");

      // Create subscription with a test price ID - replace with actual price ID
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
          price: process.env.STRIPE_PRICE_ID || "price_test_premium",
        }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      await storage.updateUserStripeInfo(userId, customer.id, subscription.id);

      // Create payment transaction record
      await storage.createPaymentTransaction({
        userId,
        stripeSubscriptionId: subscription.id,
        amount: "299", // Default premium subscription price
        currency: "thb",
        status: "pending",
        type: "subscription",
        feature: "premium_features",
      });

      const latestInvoice = subscription.latest_invoice as any;
      res.json({
        subscriptionId: subscription.id,
        clientSecret: latestInvoice?.payment_intent?.client_secret,
      });
    } catch (error: any) {
      console.error("Error creating subscription:", error);
      res.status(400).json({ message: error.message });
    }
  });

  // Payment history route
  app.get('/api/payment-history', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const transactions = await storage.getPaymentTransactionsByUserId(userId);
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching payment history:", error);
      res.status(500).json({ message: "Failed to fetch payment history" });
    }
  });

  // Search route
  app.get('/api/search', async (req, res) => {
    try {
      const { q, category } = req.query;
      let businesses = await storage.getBusinesses(category as string);
      
      if (q) {
        const query = (q as string).toLowerCase();
        businesses = businesses.filter(b => 
          b.name.toLowerCase().includes(query) ||
          b.nameEn?.toLowerCase().includes(query) ||
          b.description?.toLowerCase().includes(query) ||
          b.descriptionEn?.toLowerCase().includes(query) ||
          b.address?.toLowerCase().includes(query)
        );
      }
      
      res.json(businesses);
    } catch (error) {
      console.error("Error searching businesses:", error);
      res.status(500).json({ message: "Search failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
