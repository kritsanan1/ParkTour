import { Link } from "wouter";

interface CategoryTabsProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function CategoryTabs({ selectedCategory = "", onCategoryChange }: CategoryTabsProps) {
  const categories = [
    { id: "attractions", label: "สถานที่ท่องเที่ยว", icon: "fas fa-mountain" },
    { id: "restaurants", label: "ร้านอาหาร", icon: "fas fa-utensils" },
    { id: "accommodations", label: "ที่พัก", icon: "fas fa-bed" },
    { id: "homestays", label: "โฮมสเตย์", icon: "fas fa-home" },
    { id: "services", label: "บริการ", icon: "fas fa-concierge-bell" },
  ];

  const handleCategoryClick = (categoryId: string) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    } else {
      window.location.href = `/listings/${categoryId}`;
    }
  };

  return (
    <section className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide py-4 space-x-8">
          {categories.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-crocodile-600 border-b-2 border-crocodile-600 font-semibold"
                    : "text-thai-slate-600 hover:text-crocodile-600"
                }`}
              >
                <i className={category.icon}></i>
                <span className="font-kanit">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
