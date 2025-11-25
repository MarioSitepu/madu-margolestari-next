import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// Pastikan path gambar benar
import headerImage from "@/assets/header-image-1a216d.png";

export function Documentation() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden group">
      
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={headerImage} 
          alt="Dokumentasi proses panen madu" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-8">
            
            {/* Content */}
            <div className="space-y-4">
              <span className="inline-block px-4 py-1 bg-[#ffde7d] text-black text-sm font-bold tracking-wider uppercase rounded-full mb-2">
                Transparansi Proses
              </span>
              
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight"
                style={{ fontFamily: 'Nort, sans-serif' }}
              >
                Lihat Bagaimana <br/>
                Kami <span className="text-[#00B8A9]">Bekerja</span>
              </h2>
              
              <p className="text-white/80 text-lg md:text-xl max-w-lg">
                Saksikan dedikasi kami dalam menjaga kualitas di setiap tahap, mulai dari perawatan sarang hingga pengemasan.
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <Link to="/article">
                <Button 
                  className="h-14 px-8 bg-[#00B8A9] hover:bg-[#008f82] text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-[#00B8A9]/50 transition-all duration-300 group-hover:translate-x-2 flex items-center gap-3"
                >
                  <span>Lihat Dokumentasi</span>
                  <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}