import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, Home, MapPin, Package, Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const navItems = [
    { href: '/', label: 'หน้าแรก', labelEn: 'Home', icon: Home },
    { href: '/listings', label: 'สถานที่', labelEn: 'Places', icon: MapPin },
    { href: '#pricing', label: 'แพ็คเกจ', labelEn: 'Packages', icon: Package },  
    { href: '#reviews', label: 'รีวิว', labelEn: 'Reviews', icon: Star },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="h-8 w-8 p-0"
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`
        fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-thai-slate-800 font-kanit">เมนู / Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0"
            aria-label="Close mobile menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="py-4">
          {/* User Section */}
          {isAuthenticated && (
            <div className="px-4 py-3 border-b mb-2">
              <div className="flex items-center space-x-3">
                {(user as any)?.profileImageUrl ? (
                  <img 
                    src={(user as any).profileImageUrl} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-crocodile-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-crocodile-600" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-thai-slate-800 text-sm">
                    {(user as any)?.firstName} {(user as any)?.lastName}
                  </p>
                  <p className="text-xs text-thai-slate-500">สมาชิก / Member</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <div className="px-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.href}>
                  {item.href.startsWith('#') ? (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="w-full flex items-center px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left touch-manipulation"
                    >
                      <IconComponent className="w-5 h-5 text-thai-slate-600 mr-3" />
                      <div>
                        <span className="text-thai-slate-800 font-medium font-kanit block">{item.label}</span>
                        <span className="text-xs text-thai-slate-500">{item.labelEn}</span>
                      </div>
                    </button>
                  ) : (
                    <Link href={item.href}>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-full flex items-center px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left touch-manipulation"
                      >
                        <IconComponent className="w-5 h-5 text-thai-slate-600 mr-3" />
                        <div>
                          <span className="text-thai-slate-800 font-medium font-kanit block">{item.label}</span>
                          <span className="text-xs text-thai-slate-500">{item.labelEn}</span>
                        </div>
                      </button>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="px-4 mt-6 space-y-3">
            {isAuthenticated ? (
              <>
                <Link href="/business-dashboard">
                  <Button 
                    onClick={() => setIsOpen(false)}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    สำหรับธุรกิจ / For Business
                  </Button>
                </Link>
                <Button 
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = "/api/logout";
                  }}
                  variant="outline" 
                  className="w-full justify-start"
                >
                  ออกจากระบบ / Logout
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = "/api/login";
                }}
                className="w-full bg-crocodile-600 hover:bg-crocodile-700 text-white"
              >
                เข้าสู่ระบบ / Login
              </Button>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}