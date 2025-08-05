import {
  users,
  businesses,
  reviews,
  virtualTours,
  paymentTransactions,
  type User,
  type UpsertUser,
  type Business,
  type InsertBusiness,
  type Review,
  type InsertReview,
  type VirtualTour,
  type InsertVirtualTour,
  type PaymentTransaction,
} from "@shared/schema";
import { randomUUID } from "crypto";

// Interface for storage operations
export interface IStorage {
  // User operations - mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User>;
  
  // Business operations
  getBusinesses(category?: string, limit?: number): Promise<Business[]>;
  getBusinessById(id: string): Promise<Business | undefined>;
  getBusinessesByUserId(userId: string): Promise<Business[]>;
  createBusiness(userId: string, business: InsertBusiness): Promise<Business>;
  updateBusiness(id: string, business: Partial<InsertBusiness>): Promise<Business>;
  incrementBusinessViews(id: string): Promise<void>;
  
  // Review operations
  getReviewsByBusinessId(businessId: string): Promise<Review[]>;
  createReview(userId: string, review: InsertReview): Promise<Review>;
  updateBusinessRating(businessId: string): Promise<void>;
  
  // Virtual tour operations
  getVirtualToursByBusinessId(businessId: string): Promise<VirtualTour[]>;
  createVirtualTour(tour: InsertVirtualTour): Promise<VirtualTour>;
  
  // Payment operations
  createPaymentTransaction(transaction: Partial<PaymentTransaction>): Promise<PaymentTransaction>;
  getPaymentTransactionsByUserId(userId: string): Promise<PaymentTransaction[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private businesses: Map<string, Business> = new Map();
  private reviews: Map<string, Review> = new Map();
  private virtualTours: Map<string, VirtualTour> = new Map();
  private paymentTransactions: Map<string, PaymentTransaction> = new Map();

  constructor() {
    // Initialize with some sample data for development
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample businesses
    const sampleBusinesses: Business[] = [
      {
        id: "1",
        userId: "user1",
        name: "วังใหญ่ปาร์ค",
        nameEn: "Wang Yai Park",
        description: "สวนสาธารณะที่มีชื่อเสียงด้วยรูปปั้นจระเข้ยักษ์ขนาดใหญ่ พร้อมทิวทัศน์ธรรมชาติที่สวยงาม เหมาะสำหรับครอบครัว",
        descriptionEn: "Famous public park featuring a giant crocodile statue with beautiful natural scenery, perfect for families",
        category: "attractions",
        address: "วังสามหมอ, อุดรธานี",
        phone: "042-123-456",
        email: "info@wangyaipark.com",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3",
        latitude: "17.4138",
        longitude: "102.7878",
        isVerified: true,
        isPremium: true,
        rating: "4.8",
        reviewCount: 127,
        viewCount: 1234,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        userId: "user2",
        name: "ครัวป้าศรี",
        nameEn: "Krua Pa Sri",
        description: "ร้านอาหารท้องถิ่นแสนอร่อย เสิร์ฟอาหารอีสานต้นตำรับ ลิ้นชักหาญงุ้ยฮ้าง ส้มตำแซบเบอร์",
        descriptionEn: "Delicious local restaurant serving authentic Isaan cuisine with traditional flavors",
        category: "restaurants",
        address: "ตลาดเก่า วังสามหมอ",
        phone: "042-234-567",
        email: "kruapasri@gmail.com",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3",
        latitude: "17.4125",
        longitude: "102.7865",
        isVerified: true,
        isPremium: false,
        rating: "4.5",
        reviewCount: 89,
        viewCount: 567,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        userId: "user3",
        name: "บ้านสวนลุงโจ",
        nameEn: "Baan Suan Uncle Jo",
        description: "โฮมสเตย์สไตล์ไทยล้านนา ท่ามกลางสวนไผ่ธรรมชาติ รับประสบการณ์วิถีชีวิตคนไทย",
        descriptionEn: "Traditional Thai homestay surrounded by natural bamboo gardens, experience authentic Thai lifestyle",
        category: "homestays",
        address: "บ้านดong วังสามหมอ",
        phone: "042-345-678",
        email: "baansuan@gmail.com",
        imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3",
        latitude: "17.4152",
        longitude: "102.7892",
        isVerified: true,
        isPremium: false,
        rating: "4.7",
        reviewCount: 45,
        viewCount: 234,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleBusinesses.forEach(business => {
      this.businesses.set(business.id, business);
    });

    // Sample reviews
    const sampleReviews: Review[] = [
      {
        id: "r1",
        businessId: "1",
        userId: "reviewer1",
        rating: 5,
        comment: "วังใหญ่ปาร์คสวยมากค่ะ จระเข้ยักษ์ตัวใหญ่มาก ถ่ายรูปได้สวยๆ เด็กๆ ชอบมาก แนะนำให้มาเที่ยวกันเลยค่ะ",
        commentEn: "Wang Yai Park is very beautiful! The giant crocodile statue is impressive. Great for photos and kids love it. Highly recommended!",
        isVerified: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "r2",
        businessId: "2",
        userId: "reviewer2",
        rating: 4,
        comment: "อาหารอร่อยมาก ส้มตำแซบ ถูกปากคนไทยและต่างชาติ",
        commentEn: "Amazing local food at Krua Pa Sri! The som tam was incredibly fresh and spicy. Great authentic Thai experience.",
        isVerified: true,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: "r3",
        businessId: "3",
        userId: "reviewer3",
        rating: 5,
        comment: "โฮมสเตย์บ้านสวนลุงโจบรรยากาศดีมาก เจ้าของใจดี อาหารอร่อย เด็กๆ ได้เรียนรู้วิถีชีวิตคนไทย",
        commentEn: "Amazing homestay experience! The atmosphere is fantastic, owners are very kind, delicious food. Kids learned so much about Thai lifestyle.",
        isVerified: true,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    ];

    sampleReviews.forEach(review => {
      this.reviews.set(review.id, review);
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingUser = Array.from(this.users.values()).find(u => u.id === userData.id);
    
    if (existingUser) {
      const updatedUser: User = {
        ...existingUser,
        ...userData,
        updatedAt: new Date(),
      };
      this.users.set(existingUser.id, updatedUser);
      return updatedUser;
    } else {
      const newUser: User = {
        id: userData.id || randomUUID(),
        email: userData.email || null,
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        profileImageUrl: userData.profileImageUrl || null,
        stripeCustomerId: null,
        stripeSubscriptionId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.users.set(newUser.id, newUser);
      return newUser;
    }
  }

  async updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    
    const updatedUser: User = {
      ...user,
      stripeCustomerId,
      stripeSubscriptionId,
      updatedAt: new Date(),
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Business operations
  async getBusinesses(category?: string, limit?: number): Promise<Business[]> {
    let businesses = Array.from(this.businesses.values());
    
    if (category) {
      businesses = businesses.filter(b => b.category === category);
    }
    
    businesses.sort((a, b) => {
      // Premium businesses first, then by rating, then by view count
      if (a.isPremium && !b.isPremium) return -1;
      if (!a.isPremium && b.isPremium) return 1;
      if (parseFloat(b.rating) !== parseFloat(a.rating)) {
        return parseFloat(b.rating) - parseFloat(a.rating);
      }
      return b.viewCount - a.viewCount;
    });
    
    return limit ? businesses.slice(0, limit) : businesses;
  }

  async getBusinessById(id: string): Promise<Business | undefined> {
    return this.businesses.get(id);
  }

  async getBusinessesByUserId(userId: string): Promise<Business[]> {
    return Array.from(this.businesses.values()).filter(b => b.userId === userId);
  }

  async createBusiness(userId: string, business: InsertBusiness): Promise<Business> {
    const id = randomUUID();
    const newBusiness: Business = {
      ...business,
      id,
      userId,
      rating: "0",
      reviewCount: 0,
      viewCount: 0,
      isVerified: false,
      isPremium: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.businesses.set(id, newBusiness);
    return newBusiness;
  }

  async updateBusiness(id: string, business: Partial<InsertBusiness>): Promise<Business> {
    const existing = this.businesses.get(id);
    if (!existing) throw new Error("Business not found");
    
    const updated: Business = {
      ...existing,
      ...business,
      updatedAt: new Date(),
    };
    this.businesses.set(id, updated);
    return updated;
  }

  async incrementBusinessViews(id: string): Promise<void> {
    const business = this.businesses.get(id);
    if (business) {
      business.viewCount += 1;
      this.businesses.set(id, business);
    }
  }

  // Review operations
  async getReviewsByBusinessId(businessId: string): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(r => r.businessId === businessId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createReview(userId: string, review: InsertReview): Promise<Review> {
    const id = randomUUID();
    const newReview: Review = {
      ...review,
      id,
      userId,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.reviews.set(id, newReview);
    
    // Update business rating
    await this.updateBusinessRating(review.businessId);
    
    return newReview;
  }

  async updateBusinessRating(businessId: string): Promise<void> {
    const reviews = await this.getReviewsByBusinessId(businessId);
    const business = this.businesses.get(businessId);
    
    if (business && reviews.length > 0) {
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      business.rating = avgRating.toFixed(1);
      business.reviewCount = reviews.length;
      this.businesses.set(businessId, business);
    }
  }

  // Virtual tour operations
  async getVirtualToursByBusinessId(businessId: string): Promise<VirtualTour[]> {
    return Array.from(this.virtualTours.values())
      .filter(vt => vt.businessId === businessId && vt.isActive);
  }

  async createVirtualTour(tour: InsertVirtualTour): Promise<VirtualTour> {
    const id = randomUUID();
    const newTour: VirtualTour = {
      ...tour,
      id,
      createdAt: new Date(),
    };
    this.virtualTours.set(id, newTour);
    return newTour;
  }

  // Payment operations
  async createPaymentTransaction(transaction: Partial<PaymentTransaction>): Promise<PaymentTransaction> {
    const id = randomUUID();
    const newTransaction: PaymentTransaction = {
      id,
      userId: transaction.userId!,
      businessId: transaction.businessId || null,
      stripePaymentIntentId: transaction.stripePaymentIntentId || null,
      stripeSubscriptionId: transaction.stripeSubscriptionId || null,
      amount: transaction.amount!,
      currency: transaction.currency || "thb",
      status: transaction.status!,
      type: transaction.type!,
      feature: transaction.feature || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.paymentTransactions.set(id, newTransaction);
    return newTransaction;
  }

  async getPaymentTransactionsByUserId(userId: string): Promise<PaymentTransaction[]> {
    return Array.from(this.paymentTransactions.values())
      .filter(pt => pt.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const storage = new MemStorage();
