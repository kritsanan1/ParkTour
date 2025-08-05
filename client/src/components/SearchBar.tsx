import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "ค้นหาสถานที่ ร้านอาหาร ที่พัก... / Search attractions, restaurants, hotels..." 
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="w-full relative">
      <form onSubmit={handleSubmit} className="flex">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 rounded-r-none focus:ring-2 focus:ring-crocodile-500 focus:border-transparent"
        />
        <Button 
          type="submit"
          className="crocodile-500 text-white hover:bg-crocodile-600 rounded-l-none"
        >
          <i className="fas fa-search"></i>
        </Button>
      </form>
    </div>
  );
}
