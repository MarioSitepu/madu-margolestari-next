import { HelpCircle } from "lucide-react";
import apakahKamuTahuImage1 from "@/assets/apakah-kamu-tahu-image-1-57d8f7.png";
import apakahKamuTahuImage2 from "@/assets/apakah-kamu-tahu-image-2-2d9ce4.png";

export function InfoSection() {
  return (
    <section className="w-full bg-[#FFDE7D] relative overflow-hidden py-16 md:py-24">
      
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
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <HelpCircle className="w-8 h-8 text-[#00B8A9]" />
                <span className="text-[#00B8A9] font-bold tracking-wider uppercase text-sm">Edukasi Madu</span>
              </div>
              
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
            {/* Container Gambar dengan komposisi tumpuk */}
            <div className="relative w-[300px] sm:w-[400px] h-[300px] sm:h-[400px]">
              
              {/* Gambar Belakang (Image 2) */}
              <div className="absolute top-0 right-0 w-2/3 h-full transform translate-x-4 -translate-y-4 transition-transform hover:scale-105 duration-500">
                <img
                  src={apakahKamuTahuImage2}
                  alt="Ilustrasi manfaat madu"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>

              {/* Gambar Depan (Image 1) */}
              <div className="absolute bottom-0 left-0 w-2/3 h-3/4 transform -translate-x-4 translate-y-4 transition-transform hover:scale-105 duration-500 delay-100">
                <img
                  src={apakahKamuTahuImage1}
                  alt="Ilustrasi madu murni"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>

              {/* Lingkaran Dekorasi di tengah */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-2 border-[#FFDE7D]/30 rounded-full -z-10 animate-pulse"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
