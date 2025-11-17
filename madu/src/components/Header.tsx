import { useEffect, useState } from "react";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="w-full bg-gradient-to-br from-[#f4d58d] to-[#ffde7d] relative overflow-hidden min-h-[600px] flex items-center">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className={`md:w-1/2 z-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-6 leading-tight">
            Rasakan Madu Asli
            <br />
            Dari{' '}
            <span className="text-[#00b8a9] relative">
              Sumbernya
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#00b8a9]"></span>
            </span>
          </h1>
          <p className="text-sm md:text-base mb-8 max-w-lg leading-relaxed text-gray-900">
            Selamat datang di Madu Marles, tempat di mana keaslian dan kualitas
            bertemu. Kami dengan bangga mempersembahkan madu murni yang langsung
            dari peternakan lebah asli kami. Setiap tetes madu kami adalah hasil
            dari dedikasi yang tinggi untuk memberikan produk terbaik kepada
            Anda.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-bold text-sm shadow-xl hover:scale-105">
            Beli Sekarang
          </button>
        </div>
        <div className={`md:w-1/2 relative flex justify-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="relative animate-float">
            <img 
              src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&h=600&fit=crop" 
              alt="Madu dengan sendok madu menetes" 
              className="w-full max-w-md h-auto object-contain drop-shadow-2xl" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}