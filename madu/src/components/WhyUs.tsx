import { CheckCircle, Leaf, Heart } from 'lucide-react';
export function WhyUs() {
  return <section className="w-full bg-[#ffde7d] py-12 sm:py-14 md:py-16 pb-0">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 md:pb-6">
        <h2 className="text-[28px] sm:text-[36px] md:text-5xl lg:text-6xl font-black text-center mb-8 sm:mb-10 md:mb-12 leading-tight">
          Kenapa Harus Madu{' '}
          <span 
            className="text-[#00b8a9] relative inline-block"
            style={{ fontFamily: 'Nort, sans-serif' }}
          >
            Margo Lestari
            <span 
              className="absolute left-0 bg-black"
              style={{ 
                width: '100%', 
                height: 'clamp(6px, 0.76vw, 11px)',
                bottom: 'clamp(-6px, -0.76vw, -11px)'
              }}
            ></span>
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-10 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center px-4 sm:px-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-xl border-4 border-white transition-transform duration-300 hover:scale-110">
              <CheckCircle size={48} stroke="#00b8a9" strokeWidth={2.5} className="sm:w-14 sm:h-14 md:w-[56px] md:h-[56px]" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-3 text-gray-900">
              100% Madu Murni
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-800 max-w-sm">
              Madu berkualitas tinggi yang diproduksi tanpa campuran tambahan,
              memberikan rasa dan manfaat kesehatan yang optimal.
            </p>
          </div>
          <div className="flex flex-col items-center text-center px-4 sm:px-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-xl border-4 border-white transition-transform duration-300 hover:scale-110">
              <Leaf size={48} stroke="#00b8a9" strokeWidth={2.5} className="sm:w-14 sm:h-14 md:w-[56px] md:h-[56px]" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-3 text-gray-900">
              Sumber Terpercaya
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-800 max-w-sm">
              Diproduksi dari peternakan lebah yang dikelola dengan standar
              tertinggi untuk menjamin kualitas.
            </p>
          </div>
          <div className="flex flex-col items-center text-center px-4 sm:px-6 sm:col-span-2 lg:col-span-1">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-xl border-4 border-white transition-transform duration-300 hover:scale-110">
              <Heart size={48} stroke="#00b8a9" strokeWidth={2.5} fill="#00b8a9" className="sm:w-14 sm:h-14 md:w-[56px] md:h-[56px]" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-3 text-gray-900">
              Rasa Khas dan Manfaat Kesehatan
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-800 max-w-sm">
              Rasa manis alami dengan berbagai manfaat untuk kesehatan tubuh dan
              kecantikan.
            </p>
          </div>
        </div>
      </div>
    </section>;
}