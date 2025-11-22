import { ShoppingCart, CheckCircle, X } from 'lucide-react';
import React, { useState } from 'react';
import productBottleCard from "@/assets/product-bottle-card.png";

interface AddToCartNotificationProps {
  isOpen: boolean;
  productName: string;
  price: number;
  onClose: () => void;
}

const AddToCartNotification = ({ isOpen, productName, price, onClose }: AddToCartNotificationProps) => {
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" style={{ opacity: 0, animationDelay: '0s', animation: 'fadeIn 0.2s ease-out forwards' }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }
      `}</style>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in" style={{ opacity: 0, animationDelay: '0s', animation: 'scaleIn 0.2s ease-out forwards' }}>
        {/* Header - Green Gradient for Success */}
        <div className="bg-gradient-to-r from-[#00b8a9] to-[#009d92] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-white flex-shrink-0" strokeWidth={2} />
            <h3 className="text-white font-bold text-lg">Berhasil!</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <div className="text-center space-y-3">
            <p className="text-gray-800 font-semibold text-lg">{productName}</p>
            <p className="text-[#00b8a9] font-bold text-2xl">
              Rp {price.toLocaleString('id-ID')}
            </p>
            <p className="text-gray-600 text-sm">Telah ditambahkan ke keranjang Anda</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-[#00b8a9] hover:bg-[#009d92] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Lanjut Berbelanja
          </button>
        </div>
      </div>
    </div>
  );
};

const products = [{
  id: 1,
  name: 'Lebah Cerana',
  description: 'Madu asli dari lebah Cerana yang dibudidayakan dengan sangat hati-hati. Dengan rasa manis yang pas dan tekstur yang kental, madu ini adalah pilihan yang tepat untuk Anda.',
  price: 50000,
  imageUrl: productBottleCard
}, {
  id: 2,
  name: 'Lebah Cerana',
  description: 'Madu asli dari lebah Cerana yang dibudidayakan dengan sangat hati-hati. Dengan rasa manis yang pas dan tekstur yang kental, madu ini adalah pilihan yang tepat untuk Anda.',
  price: 40000,
  imageUrl: productBottleCard
}, {
  id: 3,
  name: 'Lebah Cerana',
  description: 'Madu asli dari lebah Cerana yang dibudidayakan dengan sangat hati-hati. Dengan rasa manis yang pas dan tekstur yang kental, madu ini adalah pilihan yang tepat untuk Anda.',
  price: 64000,
  imageUrl: productBottleCard
}];

export function ProductList() {
  const [cartNotification, setCartNotification] = useState<{ isOpen: boolean; productName: string; price: number }>({
    isOpen: false,
    productName: '',
    price: 0
  });

  const handleProductBuy = (product: typeof products[0]) => {
    setCartNotification({
      isOpen: true,
      productName: product.name,
      price: product.price
    });
  };

  return <section className="w-full bg-[#ffde7d] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-[32px] md:text-[48px] font-extrabold text-black leading-[1.342] mb-2"
            style={{ fontFamily: 'Nort, sans-serif' }}
          >
            Produk{' '}
            <span className="text-[#00b8a9] relative inline-block">
              Kami
              <span className="absolute bottom-0 left-0 w-full h-[11px] bg-black"></span>
            </span>
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-[68px] max-w-[1291px] mx-auto">
          {products.map((product) => {
            // Split product name to get first word for underline
            const nameParts = product.name.split(' ');
            const firstWord = nameParts[0];
            const restOfName = nameParts.slice(1).join(' ');
            
            return (
            <div
              key={product.id}
              className="relative w-full max-w-[382px] h-[587px] bg-[#00b8a9] rounded-[4px] overflow-hidden mx-auto"
              style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)' }}
            >
              {/* Product Image - Positioned exactly as Figma */}
              <div className="absolute top-[38px] left-[109px] w-[165px] h-[380px]">
                <img
                  src={product.imageUrl || productBottleCard}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to default image if error
                    const target = e.target as HTMLImageElement;
                    target.src = productBottleCard;
                  }}
                />
              </div>

              {/* Product Name - Positioned at x: 24, y: 421, allow text to extend right */}
              <div className="absolute top-[421px] left-[24px] right-[24px] h-[32px] flex items-center justify-start">
                <h3 
                  className="text-[24px] font-medium text-[#ffde7d] leading-[1.342] text-left whitespace-nowrap"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  <span className="underline decoration-2 underline-offset-2">{firstWord}</span>
                  {restOfName && ` ${restOfName}`}
                </h3>
              </div>

              {/* Product Description - Positioned at x: 24, y: 457, width: 302, height: 76 */}
              <div className="absolute top-[457px] left-[24px] w-[302px] h-[76px]">
                <p 
                  className="text-[12px] font-normal text-black leading-[1.342]"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  {product.description}
                </p>
              </div>

              {/* Price and Cart Container - Aligned at y: 533 */}
              <div className="absolute top-[533px] left-[24px] right-[24px] h-[32px] flex items-center justify-between">
                {/* Price Group */}
                <div className="flex items-center gap-1 h-full">
                  {/* Rp */}
                  <span 
                    className="text-[15px] font-medium text-black leading-[1.342] whitespace-nowrap flex items-center"
                    style={{ fontFamily: 'Nort, sans-serif' }}
                  >
                    Rp
                  </span>
                  {/* Price */}
                  <span 
                    className="text-[24px] font-medium text-[#ffde7d] leading-[1.342] whitespace-nowrap flex items-center"
                    style={{ fontFamily: 'Nort, sans-serif' }}
                  >
                    {product.price.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Shopping Cart Icon - Symmetrically aligned */}
                <button
                  onClick={() => handleProductBuy(product)}
                  className="bg-white text-[#00b8a9] rounded-xl hover:bg-gray-50 hover:scale-110 active:scale-95 transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center w-12 h-12 shrink-0"
                  title="Tambah ke Keranjang"
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <ShoppingCart size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Add to Cart Notification Modal */}
      <AddToCartNotification
        isOpen={cartNotification.isOpen}
        productName={cartNotification.productName}
        price={cartNotification.price}
        onClose={() => setCartNotification({ ...cartNotification, isOpen: false })}
      />
    </section>;
}