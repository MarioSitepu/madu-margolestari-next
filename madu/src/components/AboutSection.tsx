import honeyBg from "@/assets/honey-bg-6badc9.png";

export const AboutSection = () => {
  return <section className="relative w-full overflow-hidden bg-[#00b8a9] py-16 md:py-24">
      {/* Background image */}
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
        <img src={honeyBg} alt="Background tetesan madu alami dari peternakan lebah Madu Margo Lestari - Visualisasi madu murni berkualitas" className="object-cover w-full h-full opacity-40" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-16">
          {/* Title */}
          <div className="mb-8 md:mb-0">
            <div className="flex flex-col md:flex-row items-start">
              <h2 
                className="text-4xl md:text-5xl font-bold text-white"
                style={{ fontFamily: 'Nort, sans-serif' }}
              >
                Tentang
              </h2>
              <div className="flex flex-col ml-2">
                <h2 
                  className="text-4xl md:text-5xl font-bold text-[#ffde7d] relative inline-block"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  Kami
                  {/* Underline matching home page style */}
                  <span 
                    className="absolute left-0 bg-black"
                    style={{ 
                      width: 'clamp(100px, 15vw, 200px)', 
                      height: 'clamp(8px, 0.77vw, 11.02px)',
                      bottom: 'clamp(-8px, -0.77vw, -11.02px)'
                    }}
                  ></span>
                </h2>
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