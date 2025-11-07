import type { FC } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  title?: string;
  highlightedWord?: string;
  description?: string;
  ctaText?: string;
  backgroundImage?: string;
}

const HeroSection: FC<HeroSectionProps> = ({
  title = "Rasakan Madu Asli Dari",
  highlightedWord = "Sumbernya",
  description = "",
  ctaText = "Beli Sekarang",
  backgroundImage = "/images/hero-honey-jar.png"
}) => {
  return (
    <section className="relative w-full h-[888px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Honey jar with dipper"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center max-w-[600px]">
        <h1 className="heading-lg text-brand-black mb-4">
          {title} <span className="text-brand-teal">{highlightedWord}</span>
        </h1>
        
        <p className="text-body text-brand-black mb-8 max-w-[500px]">
          {description}
        </p>
        
        <button className="bg-brand-black text-brand-white text-button px-8 py-3 rounded-lg hover:bg-brand-black/90 transition-colors w-fit">
          {ctaText}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;