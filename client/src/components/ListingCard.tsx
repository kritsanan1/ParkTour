import { Business } from "@shared/schema";

interface ListingCardProps {
  business: Business;
}

export default function ListingCard({ business }: ListingCardProps) {
  const handleViewDetails = () => {
    // Navigate to business detail page (would be implemented later)
    console.log("View details for:", business.id);
  };

  const categoryLabels: Record<string, { thai: string; color: string }> = {
    attractions: { thai: "สถานที่ท่องเที่ยว", color: "bg-crocodile-100 text-crocodile-800" },
    restaurants: { thai: "ร้านอาหาร", color: "bg-green-100 text-green-800" },
    accommodations: { thai: "ที่พัก", color: "bg-blue-100 text-blue-800" },
    homestays: { thai: "โฮมสเตย์", color: "bg-purple-100 text-purple-800" },
    services: { thai: "บริการ", color: "bg-gray-100 text-gray-800" },
  };

  const categoryInfo = categoryLabels[business.category] || categoryLabels.services;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 touch-manipulation">
      <div className="aspect-ratio-container" style={{ paddingBottom: '60%' }}>
        <img 
          src={business.imageUrl || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&w=800&h=600&fit=crop"} 
          alt={`${business.name} - ${business.nameEn || categoryInfo.thai} in Wang Sam Mo District, Udon Thani`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width="400"
          height="240"
        />
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium ${categoryInfo.color}`}>
            {categoryInfo.thai}
          </span>
          <div className="flex items-center text-yellow-500">
            <i className="fas fa-star text-sm"></i>
            <span className="ml-1 text-thai-slate-600 font-medium text-sm">{business.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-thai-slate-800 mb-1.5 sm:mb-2 font-kanit leading-tight">{business.name}</h3>
        {business.nameEn && (
          <p className="text-xs sm:text-sm text-thai-slate-500 mb-1.5 sm:mb-2">{business.nameEn}</p>
        )}
        
        <p className="text-thai-slate-600 mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base leading-relaxed">
          {business.description || "ไม่มีคำอธิบาย"}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center text-thai-slate-500 text-xs sm:text-sm">
            <i className="fas fa-map-marker-alt mr-1 text-xs"></i>
            <span className="truncate">{business.address || "วังสามหมอ, อุดรธานี"}</span>
          </div>
          <button 
            onClick={handleViewDetails}
            className="text-crocodile-600 hover:text-crocodile-700 font-medium text-sm self-start sm:self-auto min-h-[44px] flex items-center touch-manipulation"
          >
            ดูรายละเอียด <i className="fas fa-arrow-right ml-1 text-xs"></i>
          </button>
        </div>
        
        {business.isPremium && (
          <div className="mt-2 sm:mt-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-crocodile-100 text-crocodile-800">
              <i className="fas fa-crown mr-1 text-xs"></i>
              Premium
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
