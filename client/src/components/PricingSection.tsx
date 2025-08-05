import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";

const pricingPlans = [
  {
    name: "เบสิค",
    nameEn: "Basic",
    price: "1,500",
    period: "เดือน",
    periodEn: "month",
    description: "เหมาะสำหรับธุรกิจเริ่มต้น",
    descriptionEn: "Perfect for starting businesses",
    icon: Star,
    color: "bg-blue-50 border-blue-200",
    features: [
      "รายการธุรกิจพื้นฐาน",
      "รูปภาพ 5 รูป",
      "ข้อมูลติดต่อและที่อยู่",
      "การรีวิวจากลูกค้า",
      "สถิติการเข้าชมเบื้องต้น"
    ],
    featuresEn: [
      "Basic business listing",
      "5 photos included",
      "Contact info & address",
      "Customer reviews",
      "Basic view statistics"
    ]
  },
  {
    name: "โปร",
    nameEn: "Pro",
    price: "3,000",
    period: "เดือน", 
    periodEn: "month",
    description: "สำหรับธุรกิจที่ต้องการเติบโต",
    descriptionEn: "For growing businesses",
    icon: Zap,
    color: "bg-orange-50 border-orange-200",
    popular: true,
    features: [
      "ทุกอย่างในแพ็คเกจเบสิค",
      "รูปภาพไม่จำกัด",
      "แสดงในหน้าแรก (Featured)",
      "ทัวร์เสมือนจริง 360°",
      "วิเคราะห์ผู้เข้าชมแบบละเอียด",
      "การตลาดโซเชียลมีเดีย",
      "แชทบอทอัตโนมัติ"
    ],
    featuresEn: [
      "Everything in Basic",
      "Unlimited photos",
      "Featured on homepage",
      "360° virtual tours",
      "Detailed analytics",
      "Social media marketing",
      "Automated chatbot"
    ]
  },
  {
    name: "พรีเมี่ยม",
    nameEn: "Premium",
    price: "5,000",
    period: "เดือน",
    periodEn: "month", 
    description: "สำหรับธุรกิจขนาดใหญ่",
    descriptionEn: "For large enterprises",
    icon: Crown,
    color: "bg-purple-50 border-purple-200",
    features: [
      "ทุกอย่างในแพ็คเกจโปร",
      "อันดับ 1 ในผลการค้นหา",
      "วิดีโอโปรโมชั่น",
      "ระบบจองออนไลน์",
      "รายงานการตลาดเชิงลึก",
      "ปรึกษาผู้เชี่ยวชาญ 1:1",
      "การสนับสนุน 24/7"
    ],
    featuresEn: [
      "Everything in Pro",
      "Top search ranking",
      "Promotional videos",
      "Online booking system", 
      "Advanced marketing reports",
      "1:1 expert consultation",
      "24/7 priority support"
    ]
  }
];

export default function PricingSection() {
  const handleSelectPlan = (planName: string, price: string) => {
    // Redirect to checkout with selected plan
    window.location.href = `/checkout?plan=${planName}&price=${price}`;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-kanit">
            แพ็คเกจสำหรับธุรกิจ
          </h2>
          <p className="text-xl text-gray-600 font-kanit font-light">
            Choose Your Business Package
          </p>
          <p className="text-lg text-gray-500 mt-2 max-w-2xl mx-auto">
            เลือกแพ็คเกจที่เหมาะสมกับธุรกิจของคุณ เพื่อเพิ่มยอดขายและเข้าถึงลูกค้าใหม่
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card key={index} className={`relative ${plan.color} hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white">
                    แนะนำ / Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-3 sm:pb-4 p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold font-kanit">
                    {plan.name}
                    <span className="block text-base sm:text-lg font-normal text-gray-600 mt-1">
                      {plan.nameEn}
                    </span>
                  </CardTitle>
                  <CardDescription className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 font-kanit">
                      ฿{plan.price}
                      <span className="text-base sm:text-lg font-normal text-gray-600">/{plan.period}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 mt-1">
                      per {plan.periodEn}
                    </div>
                  </CardDescription>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">
                    {plan.description}
                    <span className="block text-xs text-gray-500 mt-1">
                      {plan.descriptionEn}
                    </span>
                  </p>
                </CardHeader>

                <CardContent className="pb-3 sm:pb-4 px-4 sm:px-6">
                  <ul className="space-y-2 sm:space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-xs sm:text-sm text-gray-700 font-kanit leading-relaxed">{feature}</span>
                          <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">
                            {plan.featuresEn[featureIndex]}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-3 sm:pt-4 px-4 sm:px-6">
                  <Button 
                    onClick={() => handleSelectPlan(plan.name, plan.price)}
                    className={`w-full ${plan.popular 
                      ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                      : 'bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-50'
                    } font-kanit text-sm sm:text-base lg:text-lg py-3 sm:py-4 lg:py-6 min-h-[44px] touch-manipulation`}
                  >
                    <span className="flex flex-col items-center">
                      <span>เลือกแพ็คเกจนี้</span>
                      <span className="text-xs sm:text-sm opacity-75 mt-0.5">
                        Select This Plan
                      </span>
                    </span>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            ต้องการคำปรึกษาเพิ่มเติม? / Need more information?
          </p>
          <Button variant="outline" className="font-kanit">
            ติดต่อเรา / Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}