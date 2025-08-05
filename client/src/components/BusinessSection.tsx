import { Button } from "@/components/ui/button";

export default function BusinessSection() {
  const handleBusinessSignup = () => {
    window.location.href = "/api/login";
  };

  const handleLearnMore = () => {
    // Scroll to business features or open modal
    console.log("Learn more about business features");
  };

  return (
    <section className="mb-12">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-thai-slate-800 mb-4 font-kanit">
              สำหรับธุรกิจท้องถิ่น
            </h2>
            <p className="text-thai-slate-600 mb-6 text-lg">
              ร่วมเป็นส่วนหนึ่งของการส่งเสริมการท่องเที่ยววังสามหมอ 
              ลงทะเบียนธุรกิจของคุณฟรี!
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-thai-slate-600">
                <i className="fas fa-check-circle text-green-500 mr-3"></i>
                <span>ลงทะเบียนและสร้างโปรไฟล์ธุรกิจฟรี</span>
              </div>
              <div className="flex items-center text-thai-slate-600">
                <i className="fas fa-chart-line text-crocodile-500 mr-3"></i>
                <span>เข้าถึงระบบวิเคราะห์และสถิติขั้นสูง</span>
              </div>
              <div className="flex items-center text-thai-slate-600">
                <i className="fas fa-share-alt text-blue-500 mr-3"></i>
                <span>เชื่อมต่อโซเชียลมีเดียอัตโนมัติ</span>
              </div>
              <div className="flex items-center text-thai-slate-600">
                <i className="fas fa-crown text-yellow-500 mr-3"></i>
                <span>อัพเกรดเป็น Premium สำหรับฟีเจอร์พิเศษ</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleBusinessSignup}
                className="crocodile-500 text-white hover:bg-crocodile-600"
                size="lg"
              >
                เริ่มต้นฟรี / Start Free
              </Button>
              <Button 
                onClick={handleLearnMore}
                variant="outline"
                size="lg"
                className="border-crocodile-500 text-crocodile-600 hover:bg-crocodile-50"
              >
                เรียนรู้เพิ่มเติม
              </Button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-crocodile-50 to-orange-100 rounded-xl p-6">
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Local Business Owner" 
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
