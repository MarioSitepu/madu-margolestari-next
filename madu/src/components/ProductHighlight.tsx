import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import botolKacaBest from "@/assets/honey-bg-6badc9.png";
import honeyBg from "@/assets/honey-bg-6badc9.png";

export function ProductHighlight() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="w-full bg-[#00B8A9] relative overflow-hidden min-h-[700px] flex items-center py-16 md:py-0">
      
      {/* Background Decoration (Texture) */}
      <div className="absolute right-0 top-0 h-full w-full md:w-2/3 pointer-events-none opacity-20 md:opacity-40">
        <img 
          src={honeyBg} 
          alt="Texture Honey" 
          className="w-full h-full object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00B8A9] to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
          
          {/* 1. Bagian Teks (Kiri) */}
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left order-2 md:order-1">
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1]"
              style={{ fontFamily: 'Nort, sans-serif' }}
            >
              Produk Paling<br />
              Banyak{' '}
              <span className="relative inline-block text-[#FFDE7D]">
                Terjual
                {/* Garis bawah dekoratif */}
                <span className="absolute bottom-2 left-0 w-full h-2 md:h-4 bg-black/20 -z-10 rounded-full"></span>
              </span>
            </h2>

            <p 
              className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-lg mx-auto md:mx-0"
              style={{ fontFamily: 'Nort, sans-serif' }}
            >
              Madu Hutan Premium dalam kemasan botol kaca eksklusif ini adalah favorit pelanggan kami. 
              Dipanen langsung dari hutan alami dengan rasa khas yang autentik. Kemurnian yang terjaga 
              untuk kesehatan keluarga Anda.
            </p>

            <div className="pt-2">
              <Link to="/product">
                <button 
                  className="inline-flex items-center gap-3 bg-[#FFDE7D] text-black px-10 py-4 font-bold text-lg rounded-lg hover:bg-[#f5c869] transition-all duration-300 hover:-translate-y-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  Lihat Koleksi Lengkap
                  <ArrowRight size={22} strokeWidth={2.5} />
                </button>
              </Link>
            </div>
          </div>

          {/* 2. Bagian Gambar (Kanan) - DIPERBESAR & RESPONSIF */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative order-1 md:order-2">

            {/* Container Gambar */}
            <div className="relative w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-auto cursor-pointer group">
              
              {/* Efek Glow di Belakang */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/20 rounded-full blur-[80px] -z-10 transition-all duration-500 group-hover:bg-white/30 group-hover:blur-[100px]"></div>
              
              {/* Gambar Botol */}
              <img
                src={botolKacaBest}
                alt="Botol Kaca Madu Best Seller"
                className={`w-full h-full object-contain drop-shadow-2xl transition-all duration-500 ease-out transform group-hover:scale-110 group-hover:-rotate-2 ${imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

