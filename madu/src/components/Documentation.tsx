import React from 'react';
import { ArrowRight } from 'lucide-react';
export function Documentation() {
  return <section className="w-full bg-white py-0 relative">
      <div className="relative w-full h-[500px] md:h-[600px]">
        <img src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1600&h=800&fit=crop" alt="Peternak lebah memeriksa sarang" className="w-full h-full object-cover" />
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
                <span className="text-[#ffde7d] relative">
                  Kami
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-[#ffde7d]"></span>
                </span>
              </h2>
              <button className="bg-white text-black px-8 py-3 rounded-lg flex items-center hover:bg-gray-100 transition-all duration-300 font-bold text-sm shadow-xl">
                <span className="mr-2">Kunjungi Sekarang</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>;
}