import React from 'react';
export const AboutSection = () => {
  return <section className="relative w-full overflow-hidden bg-[#00b8a9] py-16 md:py-24">
      {/* Background image */}
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
        <img src="/33a48424309f25d4655f436f9680723a63d5bbc4.png" alt="Honey drip background" className="object-cover w-full h-full" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-16">
          {/* Title */}
          <div className="mb-8 md:mb-0">
            <div className="flex flex-col md:flex-row items-start">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Tentang
              </h2>
              <div className="flex flex-col">
                <h2 className="text-4xl md:text-5xl font-bold text-[#ffde7d] ml-2">
                  Kami
                </h2>
                <div className="h-1 bg-white w-full mt-2"></div>
              </div>
            </div>
          </div>
          {/* About text */}
          <div className="max-w-2xl">
            <p className="text-white text-lg leading-relaxed">
              Selamat datang di{' '}
              <span className="text-[#ffde7d]">[Nama UMKM Lebah Madu]</span>,
              penyedia madu alami terbaik yang berasal dari lebah pilihan. Kami
              berkomitmen untuk menyediakan produk madu berkualitas tinggi,
              murni, dan kaya akan manfaat kesehatan. Di{' '}
              <span className="text-[#ffde7d]">[Nama UMKM Lebah Madu]</span>,
              kami mengutamakan keberlanjutan dan kesejahteraan lebah,
              memastikan bahwa setiap tetes madu yang kami hasilkan berasal dari
              proses yang alami dan ramah lingkungan.
            </p>
            <p className="text-white text-lg leading-relaxed mt-4">
              Sebagai UMKM yang berbasis di{' '}
              <span className="text-[#ffde7d]">[Lokasi]</span>, kami bekerja
              sama dengan peternak lebah lokal yang memiliki keahlian dan
              pengalaman dalam memproduksi madu yang murni dan tidak tercampur
              dengan bahan kimia apapun. Setiap produk kami dipanen dengan
              hati-hati dan dikelola dengan{' '}
              <span className="text-[#ffde7d]">
                standar kebersihan yang ketat untuk menjaga kualitas dan
                keaslian rasa.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>;
};