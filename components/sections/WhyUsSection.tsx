import type { FC } from 'react';
import Image from 'next/image';
import BenefitCard from '@/components/ui/BenefitCard';
import NewsletterForm from '@/components/ui/NewsletterForm';
import DropletIcon from '@/components/icons/DropletIcon';
import LeafIcon from '@/components/icons/LeafIcon';
import HeartPulseIcon from '@/components/icons/HeartPulseIcon';

interface Benefit {
  id: number;
  title: string;
  description: string;
}

interface NewsletterSection {
  title: string;
  subtitle: string;
  placeholder: string;
  ctaText: string;
  disclaimer: string;
  honeycombImage: string;
}

interface WhyUsSectionProps {
  title?: string;
  highlightedWord?: string;
  benefits?: Benefit[];
  newsletterSection?: NewsletterSection;
}

const WhyUsSection: FC<WhyUsSectionProps> = ({
  title = "Kenapa Harus Madu",
  highlightedWord = "Marles",
  benefits = [],
  newsletterSection
}) => {
  const benefitIcons = [
    <DropletIcon key="droplet" width={180} height={180} color="#00B8A9" />,
    <LeafIcon key="leaf" width={180} height={180} color="#00B8A9" />,
    <HeartPulseIcon key="heart" width={180} height={180} color="#00B8A9" />
  ];

  return (
    <section className="bg-brand-yellow py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-brand-black inline">
            {title} <span className="heading-xl text-brand-teal">{highlightedWord}</span>
          </h2>
          <div className="w-[155px] h-[11px] bg-brand-black mx-auto mt-2"></div>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 max-w-[1400px] mx-auto">
          {benefits?.map((benefit, index) => (
            <BenefitCard
              key={benefit.id}
              icon={benefitIcons[index]}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
        
        {/* Newsletter Section */}
        {newsletterSection && (
          <div className="max-w-[1045px] mx-auto bg-white rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,1)] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Honeycomb Image */}
              <div className="relative h-[436px]">
                <Image
                  src={newsletterSection.honeycombImage}
                  alt="Honeycomb dripping with honey"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Right: Newsletter Form */}
              <div className="p-8 flex flex-col justify-center">
                <h3 className="heading-sm text-brand-teal mb-4">
                  {newsletterSection.title}
                </h3>
                
                <p className="text-caption text-brand-teal mb-6">
                  {newsletterSection.subtitle}
                </p>
                
                <NewsletterForm
                  placeholder={newsletterSection.placeholder}
                  ctaText={newsletterSection.ctaText}
                  disclaimer={newsletterSection.disclaimer}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyUsSection;