import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import headerImage from "@/assets/header-image-1a216d.png";

export function Documentation() {
  return <section className="w-full bg-white py-0 relative">
      <div className="relative w-full h-[500px] md:h-[600px]">
        <img src={headerImage} alt="Dokumentasi peternak lebah Madu Margo Lestari memeriksa sarang lebah di Jati Agung Lampung Selatan - Proses produksi madu murni berkualitas" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight text-white">
                Lihat Dokumentasi
                <br />
                Pengerjaan Dan
                <br />
                Artikel{' '}
                <span className="text-[#ffde7d]">
                  Kami
                </span>
              </h2>
              <div className="w-full md:w-[240px] h-[47px]">
                <Link to="/article">
                  <Button
                    className="w-full h-full bg-[#00B8A9] text-white hover:bg-[#009a8d] font-bold rounded-none flex items-center justify-center gap-2 px-8 whitespace-nowrap"
                    style={{ 
                      fontFamily: 'Nort, sans-serif', 
                      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)',
                      fontSize: '14px',
                      lineHeight: '1.342'
                    }}
                  >
                    <span>Kunjungi Sekarang</span>
                    <ArrowRight className="w-[9.92px] h-[10px]" strokeWidth={2} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}