import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import headerImage from "@/assets/header-image-1a216d.png";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <header className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden pt-20 md:pt-24">
      
      {/* 1. Background Image & Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={headerImage} 
          alt="Peternakan lebah Madu Jaya Lestari di Jati Agung Lampung Selatan" 
          // UPDATE: 'object-top' agar bagian atas gambar tidak terpotong
          className="w-full h-full object-cover object-top transition-transform duration-1000 hover:scale-105" 
        />
        
        {/* UPDATE: Overlay Kuning Madu (#FFDE7D) dengan mode multiply */}
        <div className="absolute inset-0 bg-[#FFDE7D]/90 mix-blend-multiply"></div>
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Content Box */}
        <div 
          className={`max-w-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          
          {/* Heading */}
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg"
            style={{ fontFamily: 'Nort, sans-serif' }}
          >
            Rasakan Madu Asli <br />
            Dari{' '}
            <span className="relative inline-block text-[#FFDE7D]">
              <span className="text-white drop-shadow-md">Sumbernya</span>
              {/* Garis bawah dekoratif */}
              <span className="absolute bottom-2 left-0 w-full h-2 md:h-4 bg-[#00B8A9] -z-10"></span>
            </span>
          </h1>

          {/* Description */}
          <div 
            className="mb-8 border-l-4 border-[#00B8A9] pl-6 py-2 backdrop-blur-sm bg-black/10 rounded-r-lg"
          >
            <p 
              className="text-white text-base sm:text-lg md:text-xl font-medium leading-relaxed drop-shadow-md"
              style={{ fontFamily: 'Nort, sans-serif' }}
            >
              Selamat datang di Madu Jaya Lestari. Kami bangga mempersembahkan madu 100% asli yang dipanen langsung dari peternakan lebah alami tanpa campuran bahan apapun. Setiap tetes madu kami adalah hasil kemurnian alam yang diproses dengan hati-hati untuk kesehatan Anda.
            </p>
          </div>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/product">
              <Button
                className="w-full sm:w-auto px-8 py-6 bg-[#FFDE7D] text-black hover:bg-[#f5c869] font-bold text-lg rounded-none flex items-center justify-center gap-3 transition-all duration-300 hover:translate-x-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
                style={{ fontFamily: 'Nort, sans-serif' }}
              >
                <span>Belanja Sekarang</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
