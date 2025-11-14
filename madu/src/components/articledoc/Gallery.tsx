import React from 'react';
export function Gallery() {
  const images = ["/f83eb87d5d615ec04e9f61005aa33cf944a9d860.png", "/64534f79fafb236e67a4f26c646b02bf5e0d3d0a.png", "/224c0e110065ad2452bea8a0e43c4172e6fe6999.png", "/f83eb87d5d615ec04e9f61005aa33cf944a9d860.png", "/64534f79fafb236e67a4f26c646b02bf5e0d3d0a.png", "/224c0e110065ad2452bea8a0e43c4172e6fe6999.png"];
  return <div className="w-full bg-[#00b8a9] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16 leading-tight">
          Jangan Lewatkan Dokumentasi Kegiatan{' '}
          <span className="text-[#ffde7d]">Kami</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {images.map((image, index) => <div key={index} className="group relative transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-[#ffde7d] p-3 rounded-xl shadow-2xl">
                <div className="bg-white p-3 rounded-lg">
                  <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-[380px] object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" />
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
}