import { Button } from "@/components/ui/button";
import Image from "@/components/Image";

export default function HeroSection() {
  const handleExploreAttractions = () => {
    window.location.href = "/listings/attractions";
  };

  const handleViewVirtualTour = () => {
    // Mock virtual tour functionality
    window.open("https://www.google.com/maps/@17.4138,102.7878,3a,75y,90t/data=!3m6!1e1!3m4!1s123", "_blank");
  };

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      <Image className="absolute inset-0">
        <div className="absolute inset-0 bg-black/40" />
      </Image>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-kanit">
            ยินดีต้อนรับสู่<br />
            <span className="text-crocodile-400">วังสามหมอ</span>
          </h1>
          <p className="text-xl md:text-2xl mb-6 font-kanit font-light">
            Welcome to Wang Sam Mo
          </p>
          <p className="text-lg mb-8 text-gray-200 max-w-lg">
            ดินแดนมหัศจรรย์แห่งจระเข้ยักษ์ สวนสนและวัฒนธรรมท้องถิ่น 
            ค้นพบความงามและเสน่ห์ของอุดรธานี
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleExploreAttractions}
              className="crocodile-500 text-white hover:bg-crocodile-600"
              size="lg"
            >
              <i className="fas fa-compass mr-2"></i>
              สำรวจสถานที่ท่องเที่ยว
            </Button>
            <Button 
              onClick={handleViewVirtualTour}
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-thai-slate-800"
            >
              <i className="fas fa-vr-cardboard mr-2"></i>
              ทัวร์เสมือนจริง
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
