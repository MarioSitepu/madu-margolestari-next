import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <nav className="w-full bg-[#ffde7d] py-4 border-b border-black/5 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl md:text-3xl font-black text-black">
            Marles
          </span>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-black hover:text-[#00b8a9] transition-colors font-semibold text-base">
            Beranda
          </a>
          <a href="#" className="text-black hover:text-[#00b8a9] transition-colors font-semibold text-base">
            Produk
          </a>
          <a href="#" className="text-black hover:text-[#00b8a9] transition-colors font-semibold text-base">
            Artikel
          </a>
          <a href="#" className="text-black hover:text-[#00b8a9] transition-colors font-semibold text-base">
            Tentang Kami
          </a>
        </div>
        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden bg-[#ffde7d] border-t border-black/5">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <a href="#" className="text-black hover:text-[#00b8a9] transition-colors font-semibold text-base py-2">
              Beranda
            </a>
            <a href="#" className="text-black hover:text-[#00b8a9] transition-colors font-semibold text-base py-2">
              Produk
            </a>
            <a href="#" className="text-black hover:text-[#00b8a9] transition-colors font-semibold text-base py-2">
              Artikel
            </a>
            <a href="#" className="text-black hover:text-[#00b8a9] transition-colors font-semibold text-base py-2">
              Tentang Kami
            </a>
          </div>
        </div>}
    </nav>;
}