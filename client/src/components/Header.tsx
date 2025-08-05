import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import logoPath from "@assets/logo_1754404819577.png";

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Navigate to listings with search query
    if (query.trim()) {
      window.location.href = `/listings?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-4">
            <img src={logoPath} alt="Tour Der Wang Logo" className="w-12 h-8" />
            <div>
              <h1 className="text-xl font-bold text-thai-slate-800 font-kanit">ที่นี่ วังสามหมอ</h1>
              <p className="text-sm text-crocodile-600 font-medium">TOURDERWANG</p>
            </div>
          </Link>
          
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/business-dashboard">
                  <Button variant="ghost" className="hidden lg:flex">
                    สำหรับธุรกิจ / For Business
                  </Button>
                </Link>
                <div className="flex items-center space-x-2">
                  {user?.profileImageUrl && (
                    <img 
                      src={user.profileImageUrl} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span className="text-sm text-thai-slate-700 hidden sm:block">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <Button 
                  onClick={() => window.location.href = "/api/logout"}
                  variant="outline"
                  size="sm"
                >
                  ออกจากระบบ / Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="hidden lg:block">
                  สำหรับธุรกิจ / For Business
                </Button>
                <Button 
                  onClick={() => window.location.href = "/api/login"}
                  className="crocodile-500 text-white hover:bg-crocodile-600"
                >
                  เข้าสู่ระบบ / Login
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
