import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ProductHighlight } from "@/components/ProductHighlight";
import { ProductList } from "@/components/ProductList";
import { InfoSection } from "@/components/InfoSection";
import { Documentation } from "@/components/Documentation";
import { WhyUs } from "@/components/WhyUs";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

export function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <SEO 
        title="Madu Margo Lestari - Madu Murni Berkualitas Tinggi"
        description="Madu Margo Lestari - Platform E-Commerce Modern untuk UMKM Madu dengan Produk Berkualitas Tinggi. Dapatkan madu murni 100% asli, dipanen langsung dari peternakan lebah alami tanpa campuran bahan apapun. Kaya akan manfaat kesehatan dan rasa khas yang autentik."
        keywords="madu margo lestari, madu murni, madu asli, madu berkualitas, madu kesehatan, e-commerce madu, umkm madu, produk madu, madu lampung, madu lampung selatan, madu jati agung, madu indonesia, jual madu, beli madu online, madu alami, madu organik"
        url="https://madumargolestari.vercel.app/"
      />
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

