'use client';

import HeroSection from '@/components/sections/HeroSection';
import { BestsellerSection } from '@/components/sections';
import OurProductSection from '@/components/sections/OurProductSection';
import FunfactSection from '@/components/sections/FunfactSection';
import ArtDocSection from '@/components/sections/ArtDocSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import { mockRootProps } from '@/lib/produkMockData';

const Produk = () => {
  return (
    <div>
      <HeroSection
        title={mockRootProps.heroSection.title}
        highlightedWord={mockRootProps.heroSection.highlightedWord}
        description={mockRootProps.heroSection.description}
        ctaText={mockRootProps.heroSection.ctaText}
        backgroundImage={mockRootProps.heroSection.backgroundImage}
      />
      <BestsellerSection />
      <OurProductSection products={mockRootProps.products} />
      <FunfactSection
        title={mockRootProps.funfactSection.title}
        highlightedWord={mockRootProps.funfactSection.highlightedWord}
        facts={mockRootProps.funfactSection.facts}
      />
      <ArtDocSection
        title={mockRootProps.documentationSection.title}
        ctaText={mockRootProps.documentationSection.ctaText}
        backgroundImage={mockRootProps.documentationSection.backgroundImage}
      />
      <WhyUsSection
        title={mockRootProps.whyUsSection.title}
        highlightedWord={mockRootProps.whyUsSection.highlightedWord}
        benefits={mockRootProps.whyUsSection.benefits}
        newsletterSection={mockRootProps.newsletterSection}
      />
    </div>
  );
};

export default Produk;