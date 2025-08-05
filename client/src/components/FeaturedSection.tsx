import { useQuery } from "@tanstack/react-query";
import ListingCard from "./ListingCard";
import { Business } from "@shared/schema";

export default function FeaturedSection() {
  const { data: featuredBusinesses = [], isLoading } = useQuery({
    queryKey: ["/api/businesses", "", 6], // Get featured businesses, limit to 6
    queryFn: async () => {
      const response = await fetch("/api/businesses?limit=6");
      if (!response.ok) throw new Error("Failed to fetch featured businesses");
      return response.json() as Promise<Business[]>;
    },
  });

  return (
    <section className="mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-thai-slate-800 font-kanit">
          สถานที่เด่น / Featured Places
        </h2>
        <button 
          onClick={() => window.location.href = "/listings"}
          className="text-crocodile-600 hover:text-crocodile-700 font-medium text-sm sm:text-base self-start sm:self-auto min-h-[44px] flex items-center"
        >
          ดูทั้งหมด <i className="fas fa-arrow-right ml-1"></i>
        </button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 animate-pulse">
              <div className="w-full h-40 sm:h-48 bg-gray-200 rounded-lg mb-3 sm:mb-4"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4 mb-3 sm:mb-4"></div>
              <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredBusinesses.map((business) => (
            <ListingCard key={business.id} business={business} />
          ))}
        </div>
      )}
    </section>
  );
}
