import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ feature, amount }: { feature: string; amount: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/business-dashboard`,
        },
      });

      if (error) {
        toast({
          title: "การชำระเงินล้มเหลว / Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "การชำระเงินสำเร็จ / Payment Successful",
          description: "ขอบคุณสำหรับการชำระเงิน! / Thank you for your payment!",
        });
        navigate('/business-dashboard');
      }
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด / Error",
        description: "เกิดข้อผิดพลาดในการชำระเงิน / An error occurred during payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getFeatureDetails = (feature: string) => {
    switch (feature) {
      case 'highlighted':
        return {
          name: 'รายการเด่น / Highlighted Listing',
          description: 'แสดงรายการของคุณในหน้าแรกและหมวดหมู่ที่เกี่ยวข้อง',
          descriptionEn: 'Display your listing on the homepage and relevant categories',
          icon: 'fas fa-star',
        };
      case 'virtual-tour':
        return {
          name: 'ทัวร์เสมือนจริง / Virtual Tour',
          description: 'เพิ่มทัวร์ 360 องศา ให้ลูกค้าสามารถชมธุรกิจของคุณแบบเสมือนจริง',
          descriptionEn: 'Add 360-degree tours for customers to virtually explore your business',
          icon: 'fas fa-vr-cardboard',
        };
      case 'premium_features':
        return {
          name: 'Premium Features',
          description: 'เข้าถึงฟีเจอร์พิเศษทั้งหมดและการวิเคราะห์ขั้นสูง',
          descriptionEn: 'Access all premium features and advanced analytics',
          icon: 'fas fa-crown',
        };
      default:
        return {
          name: 'Premium Service',
          description: 'บริการพิเศษสำหรับธุรกิจของคุณ',
          descriptionEn: 'Premium service for your business',
          icon: 'fas fa-star',
        };
    }
  };

  const featureDetails = getFeatureDetails(feature);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-thai-slate-800 font-kanit mb-2">
            ชำระเงิน / Payment
          </h1>
          <p className="text-thai-slate-600">ชำระเงินสำหรับบริการพิเศษของคุณ</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="font-kanit">สรุปคำสั่งซื้อ / Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <i className={`${featureDetails.icon} text-2xl text-crocodile-500`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-thai-slate-800 font-kanit">
                    {featureDetails.name}
                  </h3>
                  <p className="text-sm text-thai-slate-600 mt-1">
                    {featureDetails.description}
                  </p>
                  <p className="text-sm text-thai-slate-500 mt-1">
                    {featureDetails.descriptionEn}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-thai-slate-800">
                    ฿{parseFloat(amount).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-thai-slate-800">รวมทั้งสิ้น / Total</span>
                  <span className="text-2xl font-bold text-crocodile-600">
                    ฿{parseFloat(amount).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-xs text-thai-slate-500 space-y-1">
                <p>• การชำระเงินจะถูกประมวลผลอย่างปลอดภัยผ่าน Stripe</p>
                <p>• Payment will be processed securely through Stripe</p>
                <p>• คุณจะได้รับอีเมลยืนยันหลังจากการชำระเงินสำเร็จ</p>
                <p>• You will receive a confirmation email after successful payment</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="font-kanit">ข้อมูลการชำระเงิน / Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-4 border rounded-lg bg-white">
                  <PaymentElement 
                    options={{
                      layout: 'accordion',
                    }}
                  />
                </div>

                <div className="text-sm text-thai-slate-600 bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-shield-alt text-blue-600 mr-2"></i>
                    <span className="font-medium">การชำระเงินปลอดภัย / Secure Payment</span>
                  </div>
                  <p>ข้อมูลการชำระเงินของคุณได้รับการปกป้องด้วยการเข้ารหัสระดับธนาคาร และจะไม่ถูกเก็บไว้ในระบบของเรา</p>
                  <p className="text-xs mt-1">Your payment information is protected with bank-level encryption and is not stored on our servers.</p>
                </div>

                <Button
                  type="submit"
                  disabled={!stripe || !elements || isProcessing}
                  className="w-full crocodile-500 text-white hover:bg-crocodile-600 h-12 text-lg font-semibold"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      กำลังประมวลผล... / Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-credit-card mr-2"></i>
                      ชำระเงิน ฿{parseFloat(amount).toLocaleString()} / Pay ฿{parseFloat(amount).toLocaleString()}
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => window.history.back()}
                    className="text-thai-slate-600 hover:text-thai-slate-800"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    กลับไปหน้าก่อน / Go Back
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [feature, setFeature] = useState("");
  const [amount, setAmount] = useState("0");

  useEffect(() => {
    // Get client secret and feature from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const clientSecretParam = urlParams.get('client_secret');
    const featureParam = urlParams.get('feature') || 'premium';
    
    if (clientSecretParam) {
      setClientSecret(clientSecretParam);
      setFeature(featureParam);
      
      // Set amount based on feature
      const featureAmounts: Record<string, string> = {
        'highlighted': '299',
        'virtual-tour': '499',
        'premium_features': '299',
      };
      setAmount(featureAmounts[featureParam] || '299');
    } else {
      // Redirect to business dashboard if no client secret
      window.location.href = '/business-dashboard';
    }
  }, []);

  if (!clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-thai-slate-600">กำลังโหลดหน้าชำระเงิน... / Loading payment page...</p>
        </div>
      </div>
    );
  }

  // Make SURE to wrap the form in <Elements> which provides the stripe context.
  return (
    <Elements 
      stripe={stripePromise} 
      options={{ 
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#FF8C42', // crocodile-500
            colorBackground: '#ffffff',
            colorText: '#1A202C', // thai-slate-800
            colorDanger: '#DC2626',
            fontFamily: 'Inter, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '8px',
          },
        },
      }}
    >
      <CheckoutForm feature={feature} amount={amount} />
    </Elements>
  );
}
