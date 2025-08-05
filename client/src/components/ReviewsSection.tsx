import { useQuery } from "@tanstack/react-query";
import { Business } from "@shared/schema";

export default function ReviewsSection() {
  // Get recent reviews from featured businesses
  const { data: businesses = [] } = useQuery({
    queryKey: ["/api/businesses", "", 3],
    queryFn: async () => {
      const response = await fetch("/api/businesses?limit=3");
      if (!response.ok) throw new Error("Failed to fetch businesses");
      return response.json() as Promise<Business[]>;
    },
  });

  // Mock review data based on businesses
  const mockReviews = [
    {
      id: "r1",
      userName: "สุดา ใจดี",
      userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=100&h=100&fit=crop",
      rating: 5,
      content: "วังใหญ่ปาร์คสวยมากค่ะ จระเข้ยักษ์ตัวใหญ่มาก ถ่ายรูปได้สวยๆ เด็กๆ ชอบมาก แนะนำให้มาเที่ยวกันเลยค่ะ",
      placeName: "วังใหญ่ปาร์ค",
      date: "2 วันที่แล้ว",
    },
    {
      id: "r2",
      userName: "John Smith",
      userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=100&h=100&fit=crop",
      rating: 4,
      content: "Amazing local food at Krua Pa Sri! The som tam was incredibly fresh and spicy. Great authentic Thai experience in Wang Sam Mo.",
      placeName: "ครัวป้าศรี",
      date: "5 days ago",
    },
    {
      id: "r3",
      userName: "มานี รักเที่ยว",
      userImage: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&w=100&h=100&fit=crop",
      rating: 5,
      content: "โฮมสเตย์บ้านสวนลุงโจบรรยากาศดีมาก เจ้าของใจดี อาหารอร่อย เด็กๆ ได้เรียนรู้วิถีชีวิตคนไทย",
      placeName: "บ้านสวนลุงโจ",
      date: "1 สัปดาห์ที่แล้ว",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-thai-slate-800 mb-6 font-kanit">
        รีวิวล่าสุด / Latest Reviews
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <img 
                src={review.userImage}
                alt="Reviewer Profile" 
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold text-thai-slate-800">{review.userName}</h4>
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i 
                      key={i}
                      className={i < review.rating ? "fas fa-star" : "far fa-star"}
                    />
                  ))}
                  <span className="ml-2 text-thai-slate-600 text-sm">{review.rating}.0</span>
                </div>
              </div>
            </div>
            <p className="text-thai-slate-600 mb-3">
              "{review.content}"
            </p>
            <div className="flex items-center justify-between text-sm text-thai-slate-500">
              <span>{review.placeName}</span>
              <span>{review.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
