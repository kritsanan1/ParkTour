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
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-thai-slate-800 font-kanit">
          สถานที่เด่น / Featured Places
        </h2>
        <button 
          onClick={() => window.location.href = "/listings"}
          className="text-crocodile-600 hover:text-crocodile-700 font-medium"
        >
          ดูทั้งหมด <i className="fas fa-arrow-right ml-1"></i>
        </button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBusinesses.map((business) => (
            <ListingCard key={business.id} business={business} />
          ))}
        </div>
      )}
    </section>
  );
}
