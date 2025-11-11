import React from 'react';
import { CheckCircle, Leaf, Heart } from 'lucide-react';
export function Footer() {
  return <footer className="w-full bg-[#ffde7d] py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16">
          Kenapa Harus Madu{' '}
          <span className="text-[#00b8a9] relative">
            Marles
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#00b8a9]"></span>
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-white">
              <CheckCircle size={56} stroke="#00b8a9" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl md:text-2xl font-black mb-3">
              100% Madu Murni
            </h3>
            <p className="text-xs md:text-sm leading-relaxed text-gray-800">
              Madu berkualitas tinggi yang diproduksi tanpa campuran tambahan,
              memberikan rasa dan manfaat kesehatan yang optimal.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-white">
              <Leaf size={56} stroke="#00b8a9" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl md:text-2xl font-black mb-3">
              Sumber Terpercaya
            </h3>
            <p className="text-xs md:text-sm leading-relaxed text-gray-800">
              Diproduksi dari peternakan lebah yang dikelola dengan standar
              tertinggi untuk menjamin kualitas.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-white">
              <Heart size={56} stroke="#00b8a9" strokeWidth={2.5} fill="#00b8a9" />
            </div>
            <h3 className="text-xl md:text-2xl font-black mb-3">
              Rasa Khas dan Manfaat Kesehatan
            </h3>
            <p className="text-xs md:text-sm leading-relaxed text-gray-800">
              Rasa manis alami dengan berbagai manfaat untuk kesehatan tubuh dan
              kecantikan.
            </p>
          </div>
        </div>
      </div>
    </footer>;
}