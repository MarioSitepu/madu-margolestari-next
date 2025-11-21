import { ShoppingCart } from 'lucide-react';
import productBottleCard from "@/assets/product-bottle-card.png";

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

const handleProductBuy = (product: typeof products[0]) => {
  // Handle product buy logic here
  alert(`${product.name} - Rp ${product.price.toLocaleString('id-ID')} ditambahkan ke keranjang!`);
};

export function ProductList() {
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
                  alt={`Botol Madu Murni ${product.name} Asli Lampung dari Madu Margo Lestari - Produk Madu Berkualitas Tinggi`}
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
    </section>;
}