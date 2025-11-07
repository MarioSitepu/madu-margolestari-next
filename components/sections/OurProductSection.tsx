import type { FC } from 'react';
import ProductCard from '@/components/ui/ProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface OurProductSectionProps {
  products?: Product[];
}

const OurProductSection: FC<OurProductSectionProps> = ({ products = [] }) => {
  return (
    <section className="bg-brand-yellow py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="heading-xl text-brand-black inline">
            Produk <span className="text-brand-teal">Kami</span>
          </h2>
          <div className="w-[116px] h-[11px] bg-brand-black mx-auto mt-2"></div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProductSection;