import honeyBg from "@/assets/honey-bg-6badc9.png";

export const AboutSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#00b8a9] py-16 md:py-24">
      {/* Background image overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img 
          src={honeyBg} 
          alt="Tekstur madu alami" 
          className="w-full h-full object-cover opacity-20 md:opacity-30 mix-blend-overlay" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00b8a9]/80 to-[#00b8a9]/95"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Title Section - Sticky on desktop for better reading flow */}
          <div className="w-full md:w-1/3 md:sticky md:top-24">
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: 'Nort, sans-serif' }}
            >
              Tentang <br />
              <span className="text-[#ffde7d] relative inline-block mt-2">
                Kami
                {/* Decorative Underline */}
                <span className="absolute bottom-1 left-0 w-full h-3 bg-black/20 -z-10 rounded-full transform -rotate-1"></span>
              </span>
            </h2>
            <div className="w-20 h-1 bg-[#ffde7d] mt-6 rounded-full"></div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-2/3 space-y-6 text-white/90 text-lg leading-relaxed">
            <p>
              Selamat datang di <strong className="text-[#ffde7d] font-semibold">Madu Jaya Lestari</strong>, 
              jantung dari produksi madu alami berkualitas di Lampung Selatan. Kami bukan sekadar penjual madu; 
              kami adalah mitra alam yang berdedikasi untuk menghadirkan kemurnian hutan tropis langsung ke meja makan Anda.
            </p>
            <p>
              Berkomitmen pada keberlanjutan, setiap tetes madu kami dipanen dengan metode etis yang memprioritaskan 
              kesejahteraan koloni lebah. Kami percaya bahwa madu terbaik hanya bisa dihasilkan dari lingkungan yang 
              sehat dan lebah yang bahagia.
            </p>
            <div className="bg-white/10 p-6 rounded-xl border-l-4 border-[#ffde7d] mt-8 backdrop-blur-sm">
              <p className="italic">
                "Kami menjamin 100% kemurnian tanpa proses pasteurisasi berlebih, menjaga enzim dan nutrisi 
                alami tetap utuh demi kesehatan keluarga Anda."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};