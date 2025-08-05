import { Link } from "wouter";
import logoPath from "@assets/logo_1754404819577.png";

export default function Footer() {
  return (
    <footer className="thai-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <img src={logoPath} alt="Tour Der Wang Logo" className="w-12 h-8" />
              <div>
                <h3 className="text-xl font-bold font-kanit">ที่นี่ วังสามหมอ</h3>
                <p className="text-crocodile-400">TOURDERWANG</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              แพลตฟอร์มส่งเสริมการท่องเที่ยววังสามหมอ อุดรธานี 
              เชื่อมโยงนักท่องเที่ยวกับธุรกิจท้องถิ่น
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-crocodile-400 transition-colors">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-crocodile-400 transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-crocodile-400 transition-colors">
                <i className="fab fa-line text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-crocodile-400 transition-colors">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 font-kanit">หมวดหมู่</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/listings/attractions" className="hover:text-crocodile-400 transition-colors">
                  สถานที่ท่องเที่ยว
                </Link>
              </li>
              <li>
                <Link href="/listings/restaurants" className="hover:text-crocodile-400 transition-colors">
                  ร้านอาหาร
                </Link>
              </li>
              <li>
                <Link href="/listings/accommodations" className="hover:text-crocodile-400 transition-colors">
                  ที่พัก
                </Link>
              </li>
              <li>
                <Link href="/listings/homestays" className="hover:text-crocodile-400 transition-colors">
                  โฮมสเตย์
                </Link>
              </li>
              <li>
                <Link href="/listings/services" className="hover:text-crocodile-400 transition-colors">
                  บริการ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 font-kanit">ติดต่อเรา</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>วังสามหมอ อุดรธานี 41170</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                <span>042-123-456</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                <span>info@tourderwang.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-thai-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Tourderwang. สงวนลิขสิทธิ์ทั้งหมด.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-crocodile-400 text-sm transition-colors">
              นโยบายความเป็นส่วนตัว
            </a>
            <a href="#" className="text-gray-400 hover:text-crocodile-400 text-sm transition-colors">
              เงื่อนไขการใช้งาน
            </a>
            <button className="thai-slate-700 text-white px-3 py-1 rounded text-sm hover:bg-thai-slate-600 transition-colors">
              🇹🇭 ไทย / EN
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
