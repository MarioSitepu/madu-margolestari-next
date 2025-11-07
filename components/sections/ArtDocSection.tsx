import type { FC } from 'react';
import Image from 'next/image';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';

interface ArtDocSectionProps {
  title?: string;
  ctaText?: string;
  backgroundImage?: string;
}

const ArtDocSection: FC<ArtDocSectionProps> = ({ 
  title = "Lihat Dokumentasi Pengerjaan Dan Artikel Kami", 
  ctaText = "Kunjungi Sekarang", 
  backgroundImage = "/images/beekeeper-documentation.png" 
}) => {
  return (
    <section className="relative w-full h-[790px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Beekeeper documentation"
          fill
          className="object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center max-w-[600px]">
        <h2 className="heading-lg text-brand-white mb-8 max-w-[441px]">
          {title}
        </h2>
        
        <button className="flex items-center gap-3 bg-brand-white text-brand-black text-button px-8 py-3 rounded-lg hover:bg-brand-white/90 transition-colors w-fit">
          {ctaText}
          <ArrowRightIcon width={24} height={24} color="#000000" />
        </button>
      </div>
    </section>
  );
};

export default ArtDocSection;