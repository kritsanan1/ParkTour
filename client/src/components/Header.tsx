import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import MobileNav from "./MobileNav";
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
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-shrink-0">
            <img src={logoPath} alt="Tour Der Wang Logo - วังสามหมอ Tourism Guide" className="w-10 h-6 sm:w-12 sm:h-8 object-contain" />
            <div className="min-w-0">
              <h1 className="text-sm sm:text-xl font-bold text-thai-slate-800 font-kanit truncate">ที่นี่ วังสามหมอ</h1>
              <p className="text-xs sm:text-sm text-crocodile-600 font-medium">TOURDERWANG</p>
            </div>
          </Link>
          
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {isAuthenticated ? (
              <>
                <Link href="/business-dashboard">
                  <Button variant="ghost" className="hidden lg:flex text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-9">
                    สำหรับธุรกิจ
                  </Button>
                </Link>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {(user as any)?.profileImageUrl && (
                    <img 
                      src={(user as any).profileImageUrl} 
                      alt="User Profile Picture" 
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                    />
                  )}
                  <span className="text-xs sm:text-sm text-thai-slate-700 hidden md:block max-w-20 lg:max-w-none truncate">
                    {(user as any)?.firstName} {(user as any)?.lastName}
                  </span>
                </div>
                <Button 
                  onClick={() => window.location.href = "/api/logout"}
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-9"
                >
                  <span className="hidden sm:inline">ออกจากระบบ</span>
                  <span className="sm:hidden">ออก</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="hidden lg:block text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-9">
                  สำหรับธุรกิจ
                </Button>
                <Button 
                  onClick={() => window.location.href = "/api/login"}
                  className="crocodile-500 text-white hover:bg-crocodile-600 text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-9"
                >
                  <span className="hidden sm:inline">เข้าสู่ระบบ</span>
                  <span className="sm:hidden">เข้าสู่ระบบ</span>
                </Button>
              </>
            )}
            <MobileNav />
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </header>
  );
}
