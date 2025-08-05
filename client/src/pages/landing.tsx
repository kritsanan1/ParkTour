import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryTabs from "@/components/CategoryTabs";
import FeaturedSection from "@/components/FeaturedSection";
import BusinessSection from "@/components/BusinessSection";
import PricingSection from "@/components/PricingSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function Landing() {
  const landingStructuredData = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": "Wang Sam Mo District",
    "alternateName": "วังสามหมอ",
    "description": "Popular tourist destination in Udon Thani, Thailand featuring attractions, restaurants, and accommodations",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Wang Sam Mo",
      "addressRegion": "Udon Thani",
      "addressCountry": "Thailand"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.4138",
      "longitude": "102.7878"
    },
    "url": "https://tourderwang.com",
    "sameAs": [
      "https://www.facebook.com/tourderwang",
      "https://www.instagram.com/tourderwang"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="ที่นี่ วังสามหมอ - แหล่งท่องเที่ยวอุดรธานี | Wang Sam Mo Tourism Guide"
        description="ค้นพบสถานที่ท่องเที่ยว ร้านอาหาร และที่พักในอำเภอวังสามหมอ อุดรธานี พร้อมรีวิวและข้อมูลครบครัน พร้อมแพ็คเกจพรีเมี่ยมสำหรับธุรกิจ | Discover attractions, restaurants, and accommodations in Wang Sam Mo District, Udon Thani with premium business packages"
        keywords="วังสามหมอ, อุดรธานี, ท่องเที่ยว, ร้านอาหาร, ที่พัก, โฮมสเตย์, Wang Sam Mo, Udon Thani, tourism, attractions, restaurants, accommodations, homestays, Thailand travel, business listing"
        canonicalUrl="https://tourderwang.com"
        structuredData={landingStructuredData}
      />
      <Header />
      <HeroSection />
      <CategoryTabs />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <FeaturedSection />
        <BusinessSection />
      </main>
      <PricingSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <ReviewsSection />
      </div>
      <Footer />
    </div>
  );
}
