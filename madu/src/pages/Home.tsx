import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ProductHighlight } from "@/components/ProductHighlight";
import { ProductList } from "@/components/ProductList";
import { InfoSection } from "@/components/InfoSection";
import { Documentation } from "@/components/Documentation";
import { WhyUs } from "@/components/WhyUs";
import { Footer } from "@/components/Footer";

export function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000'}>
        <Header />
      </div>
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 delay-200'}>
        <ProductHighlight />
      </div>
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 delay-300'}>
        <ProductList />
      </div>
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 delay-400'}>
        <InfoSection />
      </div>
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 delay-500'}>
        <Documentation />
      </div>
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 delay-600'}>
        <WhyUs />
      </div>
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 delay-700'}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;

