import type { FC } from 'react';
import Image from 'next/image';
import ShoppingCartIcon from '@/components/icons/ShoppingCartIcon';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductCard: FC<ProductCardProps> = ({ name, description, price, image }) => {
  return (
    <div className="bg-brand-teal rounded-[4px] shadow-[0px_4px_4px_rgba(0,0,0,1)] p-6 relative flex flex-col">
      <div className="relative w-full aspect-[165/380] mb-4">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain"
        />
      </div>
      
      <h3 className="text-product-title text-brand-yellow text-right mb-2">
        {name}
      </h3>
      
      <p className="text-body text-brand-black mb-4 flex-grow">
        {description}
      </p>
      
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-price text-brand-black">Rp</span>
          <span className="text-product-title text-brand-yellow">
            {price.toLocaleString('id-ID')}
          </span>
        </div>
        
        <ShoppingCartIcon width={24} height={24} color="#FFDE7D" />
      </div>
    </div>
  );
};

export default ProductCard;