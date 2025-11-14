import React from 'react';
export function Header() {
  const backgroundImage = "/f83eb87d5d615ec04e9f61005aa33cf944a9d860.png";
  return <div className="relative w-full h-[500px] md:h-[545px]">
      <div className="absolute inset-0">
        <img src={backgroundImage} alt="Bee Farmer's Delight" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
      </div>
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="text-[#ffde7d]">Artikel</span>{' '}
          <span className="text-white">Dan</span>{' '}
          <span className="text-[#00b8a9]">Dokumentasi</span>
        </h1>
        <p className="text-white text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed">
          Ingin tahu lebih banyak tentang keajaiban madu dan bagaimana ia bisa
          mendukung gaya hidup sehat Anda? Baca artikel lengkapnya{' '}
          <span className="text-[#ffde7d] font-semibold">di sini!</span>
        </p>
      </div>
    </div>;
}