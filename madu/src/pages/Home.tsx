import { Header } from "@/components/Header";
import { ProductHighlight } from "@/components/ProductHighlight";
import { ProductList } from "@/components/ProductList";
import { InfoSection } from "@/components/InfoSection";
import { Documentation } from "@/components/Documentation";
import { WhyUs } from "@/components/WhyUs";
import { Footer } from "@/components/Footer";

export function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <ProductHighlight />
      <ProductList />
      <InfoSection />
      <Documentation />
      <WhyUs />
      <Footer />
    </div>
  );
}

export default Home;

