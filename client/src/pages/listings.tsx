import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import { Business } from "@shared/schema";

export default function Listings() {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "");

  const { data: businesses = [], isLoading } = useQuery({
    queryKey: ["/api/businesses", selectedCategory, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory) params.append("category", selectedCategory);
      if (searchQuery) params.append("q", searchQuery);
      
      const response = await fetch(`/api/search?${params}`);
      if (!response.ok) throw new Error("Failed to fetch businesses");
      return response.json() as Promise<Business[]>;
    },
  });

  useEffect(() => {
    setSelectedCategory(category || "");
  }, [category]);

  const categoryLabels: Record<string, string> = {
    attractions: "สถานที่ท่องเที่ยว / Attractions",
    restaurants: "ร้านอาหาร / Restaurants", 
    accommodations: "ที่พัก / Accommodations",
    homestays: "โฮมสเตย์ / Homestays",
    services: "บริการ / Services",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryTabs selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-thai-slate-800 font-kanit">
            {selectedCategory ? categoryLabels[selectedCategory] : "ทั้งหมด / All Listings"}
          </h1>
          <div className="text-thai-slate-600">
            {businesses.length} results found
          </div>
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
        ) : businesses.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-search text-6xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-thai-slate-800 mb-2">ไม่พบผลการค้นหา</h3>
            <p className="text-thai-slate-600">ลองค้นหาด้วยคำอื่น หรือเปลี่ยนหมวดหมู่</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <ListingCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
