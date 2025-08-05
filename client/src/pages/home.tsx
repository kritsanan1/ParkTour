import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryTabs from "@/components/CategoryTabs";
import FeaturedSection from "@/components/FeaturedSection";
import BusinessSection from "@/components/BusinessSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <CategoryTabs />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FeaturedSection />
        
        {/* Personalized Recommendations Section for authenticated users */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-crocodile-500 to-crocodile-600 rounded-xl p-8 text-white">
            <div className="flex items-center mb-4">
              <i className="fas fa-robot text-3xl mr-4"></i>
              <div>
                <h2 className="text-2xl font-bold font-kanit">แนะนำสำหรับคุณ / Personalized for You</h2>
                <p className="text-crocodile-100">ระบบ AI แนะนำสถานที่ตามความสนใจของคุณ</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-colors">
                <i className="fas fa-camera text-2xl mb-2"></i>
                <h3 className="font-semibold mb-1 font-kanit">สำหรับคนรักถ่ายรูป</h3>
                <p className="text-sm text-crocodile-100">5 สถานที่ถ่ายรูปสวยในวังสามหมอ</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-colors">
                <i className="fas fa-utensils text-2xl mb-2"></i>
                <h3 className="font-semibold mb-1 font-kanit">ลิ้มรสอาหารท้องถิ่น</h3>
                <p className="text-sm text-crocodile-100">ร้านอาหารเด็ดที่ต้องลอง</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-colors">
                <i className="fas fa-hiking text-2xl mb-2"></i>
                <h3 className="font-semibold mb-1 font-kanit">ผจญภัยธรรมชาติ</h3>
                <p className="text-sm text-crocodile-100">เส้นทางเดินป่าและกิจกรรม</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button className="bg-white text-crocodile-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                รับคำแนะนำเฉพาะคุณ / Get Personalized Recommendations
              </button>
            </div>
          </div>
        </section>

        <BusinessSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
}
