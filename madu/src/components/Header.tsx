import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import headerImage from "@/assets/header-image-1a216d.png";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="w-full bg-[#FFDE7D] relative overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[854px] flex items-start">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={headerImage} 
          alt="Madu Margo Lestari" 
          className="w-full h-full object-cover object-center" 
        />
      </div>

      {/* Content Container - Positioned exactly like Figma */}
      {/* Group 98: x: 77, y: 316.5, width: 654, height: 292.89 */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-0">
        <div 
          className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{
            marginLeft: 'clamp(16px, 5.35vw, 77px)',
            marginTop: 'clamp(60px, 37vw, 316.5px)',
            width: 'calc(100% - clamp(32px, 10.7vw, 154px))',
            maxWidth: '654px'
          }}
        >
          {/* Group 23: Heading Group - x: 0, y: 0, width: 452, height: 133.89 */}
          <div 
            className="mb-4 sm:mb-5 md:mb-[18px]"
            style={{
              width: '100%',
              maxWidth: '452px'
            }}
          >
            <h1 
              className="text-black leading-[1.2] sm:leading-[1.342] mb-0"
              style={{
                fontFamily: 'Nort, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(28px, 3.33vw, 48px)',
                lineHeight: '1.342'
              }}
            >
              Rasakan Madu Asli{' '}
              <br className="hidden sm:block" />
              Dari{' '}
              {/* Sumbernya dengan underline - positioned inline */}
              <span 
                className="text-[#00B8A9] relative inline-block"
                style={{
                  fontFamily: 'Nort, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 3.33vw, 48px)',
                  lineHeight: '1.342'
                }}
              >
                Sumbernya
                {/* Rectangle 3: underline - width: 264.38, height: 11.02 */}
                <span 
                  className="absolute left-0 bg-black"
                  style={{ 
                    width: 'clamp(180px, 18.4vw, 264.38px)', 
                    height: 'clamp(6px, 0.77vw, 11.02px)',
                    bottom: 'clamp(-6px, -0.77vw, -11.02px)'
                  }}
                ></span>
              </span>
            </h1>
          </div>

          {/* Description Text - x: 0, y: 151.89, width: 654, height: 76 */}
          <p 
            className="text-[12px] sm:text-[13px] md:text-[14px] font-normal text-black leading-relaxed sm:leading-[1.342] mb-4 sm:mb-5 md:mb-[18px] bg-[#FFF8E7] md:bg-transparent px-4 py-3 md:px-0 md:py-0 rounded-lg md:rounded-none backdrop-blur-sm md:backdrop-blur-none"
            style={{ 
              fontFamily: 'Nort, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(12px, 0.97vw, 14px)',
              lineHeight: '1.342',
              width: '100%',
              maxWidth: '654px'
            }}
          >
            Selamat datang di Madu Margo Lestari, tempat di mana keaslian dan kualitas
            bertemu. Kami bangga mempersembahkan madu 100% asli,
            dipanen langsung dari peternakan lebah alami tanpa campuran
            bahan apapun. Setiap tetes madu kami adalah hasil dari alam
            yang murni, yang diproses dengan hati-hati untuk menjaga
            manfaat dan kualitasnya.
          </p>

          {/* Group 86: Button - x: 0, y: 245.89, width: 186, height: 47 */}
          <div className="w-full sm:w-[186px] h-[44px] sm:h-[47px]">
            <Button
              className="w-full h-full bg-[#00B8A9] text-white hover:bg-[#009a8d] font-bold rounded-none flex items-center justify-center gap-2 px-6 sm:px-8 transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ 
                fontFamily: 'Nort, sans-serif', 
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)',
                fontSize: 'clamp(13px, 0.97vw, 14px)',
                lineHeight: '1.342'
              }}
            >
              <span>Beli Sekarang</span>
              <ArrowRight className="w-[9.92px] h-[10px]" strokeWidth={2} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}