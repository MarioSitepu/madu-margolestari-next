import apakahKamuTahuImage1 from "@/assets/apakah-kamu-tahu-image-1-57d8f7.png";
import apakahKamuTahuImage2 from "@/assets/apakah-kamu-tahu-image-2-2d9ce4.png";

export function InfoSection() {
  return (
    <section className="w-full bg-[#00B8A9] relative overflow-hidden py-12 sm:py-16 md:py-0" style={{ minHeight: 'clamp(500px, 40.42vw, 582px)' }}>
      {/* Main Container - 1440px width */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-0 h-auto md:h-[582px] flex flex-col md:block">
        {/* Mobile Layout - Stacked */}
        <div className="flex flex-col md:hidden w-full gap-6 sm:gap-8">
          {/* Heading Group */}
          <div className="w-full text-center md:text-left">
            <h2
              className="text-white leading-[1.342]"
              style={{
                fontFamily: 'Nort, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(28px, 8vw, 48px)',
                lineHeight: '1.342'
              }}
            >
              Apakah Kamu{' '}
              <span
                className="text-[#FFDE7D] relative inline-block"
                style={{
                  fontFamily: 'Nort, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 8vw, 48px)',
                  lineHeight: '1.342'
                }}
              >
                Tahu?
                {/* Underline */}
                <span
                  className="absolute left-0 bg-white"
                  style={{
                    width: 'clamp(80px, 22vw, 136px)',
                    height: 'clamp(6px, 1.5vw, 11px)',
                    bottom: 'clamp(-6px, -1.5vw, -11px)'
                  }}
                ></span>
              </span>
            </h2>
          </div>

          {/* Images Group - Mobile: Show below heading */}
          <div className="relative w-full flex justify-center items-center gap-4 sm:gap-6" style={{ minHeight: '200px' }}>
            {/* Image 1 */}
            <div
              className="relative"
              style={{
                width: 'clamp(100px, 25vw, 150px)',
                height: 'clamp(150px, 40vw, 250px)'
              }}
            >
              <img
                src={apakahKamuTahuImage1}
                alt="Honey illustration"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Image 2 */}
            <div
              className="relative"
              style={{
                width: 'clamp(120px, 30vw, 180px)',
                height: 'clamp(180px, 45vw, 280px)'
              }}
            >
              <img
                src={apakahKamuTahuImage2}
                alt="Honey illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Description Text - Mobile */}
          <div className="w-full text-white">
            <p
              className="leading-[1.6] md:leading-[1.342] text-center md:text-left"
              style={{
                fontFamily: 'Nort, sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(14px, 4vw, 18px)',
                lineHeight: '1.6'
              }}
            >
              Madu telah dikenal dan digunakan oleh manusia sejak zaman purba. Bukti penggunaan madu ditemukan dalam lukisan gua di Spanyol yang diperkirakan berusia lebih dari 8.000 tahun. Di banyak budaya kuno, madu bukan hanya dianggap sebagai pemanis alami, tetapi juga sebagai obat dan simbol keabadian. Masyarakat Mesir kuno, misalnya, menggunakan madu untuk pengobatan luka dan sebagai bahan dalam proses pembalseman.
              <br /><br />
              Seiring waktu, madu semakin dihargai karena <span className="text-[#FFDE7D]">kandungan nutrisinya yang kaya dan manfaat kesehatannya</span> yang luar biasa. Hingga kini, madu terus menjadi bagian penting dari diet sehat, tidak hanya karena rasanya yang lezat tetapi juga karena sifat penyembuhannya yang telah terbukti.
            </p>
          </div>
        </div>

        {/* Desktop Layout - Absolute Positioning */}
        {/* Heading Group - Positioned at x: 479, y: 41 */}
        <div
          className="hidden md:block absolute"
          style={{
            left: 'clamp(20px, 33.26vw, 479px)',
            top: 'clamp(20px, 7.04vw, 41px)',
            width: 'clamp(300px, 33.54vw, 483px)',
            height: 'clamp(50px, 9.62vw, 69px)'
          }}
        >
          <h2
            className="text-white leading-[1.342]"
            style={{
              fontFamily: 'Nort, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 3.33vw, 48px)',
              lineHeight: '1.342'
            }}
          >
            Apakah Kamu{' '}
            <span
              className="text-[#FFDE7D] relative inline-block"
              style={{
                fontFamily: 'Nort, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(32px, 3.33vw, 48px)',
                lineHeight: '1.342'
              }}
            >
              Tahu?
              {/* Underline - Rectangle 3: width: 136, height: 11, color: #FFFFFF */}
              <span
                className="absolute left-0 bg-white"
                style={{
                  width: 'clamp(100px, 9.44vw, 136px)',
                  height: 'clamp(8px, 0.76vw, 11px)',
                  bottom: 'clamp(-8px, -0.76vw, -11px)'
                }}
              ></span>
            </span>
          </h2>
        </div>

        {/* Description Text - Positioned at x: 37, y: 162, width: 924 */}
        <div
          className="hidden md:block absolute text-white"
          style={{
            left: 'clamp(20px, 2.57vw, 37px)',
            top: 'clamp(120px, 27.84vw, 162px)',
            width: 'clamp(300px, 64.17vw, 924px)',
            maxWidth: '924px'
          }}
        >
          <p
            className="leading-[1.342]"
            style={{
              fontFamily: 'Nort, sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(14px, 1.67vw, 24px)',
              lineHeight: '1.342'
            }}
          >
            Madu telah dikenal dan digunakan oleh manusia sejak zaman purba. Bukti penggunaan madu ditemukan dalam lukisan gua di Spanyol yang diperkirakan berusia lebih dari 8.000 tahun. Di banyak budaya kuno, madu bukan hanya dianggap sebagai pemanis alami, tetapi juga sebagai obat dan simbol keabadian. Masyarakat Mesir kuno, misalnya, menggunakan madu untuk pengobatan luka dan sebagai bahan dalam proses pembalseman.
            <br /><br />
            Seiring waktu, madu semakin dihargai karena <span className="text-[#FFDE7D]">kandungan nutrisinya yang kaya dan manfaat kesehatannya</span> yang luar biasa. Hingga kini, madu terus menjadi bagian penting dari diet sehat, tidak hanya karena rasanya yang lezat tetapi juga karena sifat penyembuhannya yang telah terbukti.
          </p>
        </div>

        {/* Images Group - Positioned at x: 938, y: 62.48, width: 502, height: 503.11 */}
        <div
          className="hidden md:block absolute"
          style={{
            left: 'clamp(600px, 65.14vw, 938px)',
            top: 'clamp(30px, 10.74vw, 62.48px)',
            width: 'clamp(300px, 34.86vw, 502px)',
            height: 'clamp(300px, 34.93vw, 503.11px)'
          }}
        >
          {/* Image 1 - Positioned at x: 0, y: 51.09, width: 266.26, height: 417.33 */}
          <div
            className="absolute"
            style={{
              left: 0,
              top: 'clamp(25px, 8.78vw, 51.09px)',
              width: 'clamp(150px, 18.49vw, 266.26px)',
              height: 'clamp(250px, 28.98vw, 417.33px)'
            }}
          >
            <img
              src={apakahKamuTahuImage1}
              alt="Honey illustration"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Image 2 - Positioned at x: 114.95, y: 0, width: 387.05, height: 503.11 */}
          <div
            className="absolute"
            style={{
              left: 'clamp(60px, 7.98vw, 114.95px)',
              top: 0,
              width: 'clamp(200px, 26.88vw, 387.05px)',
              height: 'clamp(300px, 34.93vw, 503.11px)'
            }}
          >
            <img
              src={apakahKamuTahuImage2}
              alt="Honey illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
