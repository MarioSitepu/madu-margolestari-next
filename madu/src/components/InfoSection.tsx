import apakahKamuTahuImage from "@/assets/logo-tanya.webp";

export function InfoSection() {
  return (
    <section className="w-full bg-[#FFDE7D] relative overflow-hidden py-12 md:py-16">
      {/* Background Decoration Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFDE7D]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* 1. Bagian Kiri: Judul & Teks */}
          <div className="w-full lg:w-1/2 text-gray-900 space-y-8 text-center lg:text-left order-2 lg:order-1">
            
            {/* Header Title */}
            <div>
              <h2 
                className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900"
                style={{ fontFamily: 'Nort, sans-serif' }}
              >
                Apakah Kamu <br />
                <span className="text-[#00B8A9] relative inline-block mt-2">
                  Tahu?
                  <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-gray-900 rounded-full"></span>
                </span>
              </h2>
            </div>

            {/* Description Text */}
            <div className="space-y-6 text-lg leading-relaxed text-gray-800">
              <p style={{ fontFamily: 'Nort, sans-serif' }}>
                Madu telah dikenal dan digunakan oleh manusia sejak zaman purba. Bukti penggunaan madu ditemukan dalam lukisan gua di Spanyol yang diperkirakan berusia lebih dari 8.000 tahun. Di banyak budaya kuno, madu bukan hanya dianggap sebagai pemanis alami, tetapi juga sebagai obat dan simbol keabadian.
              </p>
              
              <p style={{ fontFamily: 'Nort, sans-serif' }}>
                Seiring waktu, madu semakin dihargai karena <strong className="text-[#00B8A9]">kandungan nutrisinya yang kaya dan manfaat kesehatannya</strong> yang luar biasa. Hingga kini, madu terus menjadi bagian penting dari diet sehat, tidak hanya karena rasanya yang lezat tetapi juga karena sifat penyembuhannya yang telah terbukti.
              </p>
            </div>

          </div>

          {/* 2. Bagian Kanan: Gambar Ilustrasi */}
          <div className="w-full lg:w-1/2 flex justify-center items-center relative order-1 lg:order-2">
            {/* Container Gambar */}
            <div className="relative w-[260px] sm:w-[360px] md:w-[460px] h-[260px] sm:h-[360px] md:h-[460px] flex items-center justify-center group">
              
              {/* Circle background centered */}
              <div className="relative w-[88%] h-[88%] rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden">
                
                {/* Image with popout hover effect */}
                <img
                  src={apakahKamuTahuImage}
                  alt="Tanda tanya"
                  className="w-[90%] h-[90%] object-contain drop-shadow-2xl transition-all duration-300 ease-out transform group-hover:scale-110 group-hover:-rotate-3"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
