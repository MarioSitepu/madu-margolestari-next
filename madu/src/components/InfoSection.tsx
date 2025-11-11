export function InfoSection() {
  return <section className="w-full bg-[#00b8a9] py-16 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-center text-white mb-10">
          Apakah Kamu{' '}
          <span className="text-[#ffde7d] relative">
            Tahu?
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#ffde7d]"></span>
          </span>
        </h2>
        <div className="text-white mb-10 max-w-4xl mx-auto relative">
          <p className="mb-4 text-sm md:text-base leading-relaxed">
            Madu telah dikenal dan digunakan oleh manusia sejak zaman purba.
            Bukti penggunaan madu ditemukan dalam lukisan gua di Spanyol yang
            diperkirakan berusia lebih dari 8.000 tahun. Di Yunani kuno, madu
            bukan hanya dianggap sebagai pemanis alami, tetapi juga sebagai obat
            dan simbol keabadian. Masyarakat Mesir kuno, misalnya, menggunakan
            madu untuk pengobatan luka dan sebagai bahan dalam proses
            pembalsaman.
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            Seiring waktu, madu semakin dihargai karena kandungan nutrisinya
            yang kaya dan manfaat kesehatannya yang luar biasa. Hingga kini,
            madu terus menjadi bagian penting dari diet sehat, tidak hanya
            karena rasanya yang lezat tetapi juga karena sifat penyembuhannya
            yang telah terbukti.
          </p>
          <div className="absolute -right-20 top-0 opacity-30 hidden lg:block">
            <img src="https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=400&fit=crop" alt="Orange slices" className="w-64 h-64 object-contain" />
          </div>
        </div>
      </div>
    </section>;
}