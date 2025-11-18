import { ShoppingCart } from 'lucide-react';
import productBottleCard from "@/assets/product-bottle-card.png";
import honeyBg from "@/assets/honey-bg-6badc9.png";

const handleProductBuy = () => {
  alert('Lebah Cerana - Rp 50.000 ditambahkan ke keranjang!');
};

export function ProductHighlight() {
  const product = {
    name: 'Lebah Cerana',
    description: 'Madu yang dihasilkan oleh lebah Cerana memiliki kualitas yang sangat baik, dengan rasa yang lebih lembut dan aroma yang khas, serta kandungan nutrisi yang lebih kaya.',
    price: 50000,
    imageUrl: productBottleCard
  };

  // Split product name to get first word for underline
  const nameParts = product.name.split(' ');
  const firstWord = nameParts[0];
  const restOfName = nameParts.slice(1).join(' ');

  return (
    <section className="w-full bg-white relative overflow-hidden min-h-[786px]">
      {/* Background Rectangle - #00B8A9 */}
      <div className="absolute inset-0 bg-[#00B8A9]"></div>

      {/* Main Container - 1440px width */}
      <div className="relative max-w-[1440px] mx-auto h-[786px]">
        {/* Product Card Group - Positioned at x: 113, y: 20 */}
        <div 
          className="absolute"
          style={{
            left: 'clamp(20px, 7.85vw, 113px)',
            top: 'clamp(20px, 2.54vw, 20px)',
            width: 'clamp(300px, 26.53vw, 382px)',
            height: 'clamp(600px, 48.54vw, 699px)'
          }}
        >
          {/* Product Card - Same structure as ProductList, but keep yellow background */}
          <div
            className="relative bg-[#FFDE7D] rounded-[4px] overflow-hidden"
            style={{
              marginTop: 'clamp(50px, 7.78vw, 112px)',
              width: '100%',
              height: 'clamp(500px, 40.76vw, 587px)',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)'
            }}
          >
            {/* Product Image - Positioned exactly as ProductList */}
            <div className="absolute top-[38px] left-[109px] w-[165px] h-[380px]">
              <img
                src={product.imageUrl || productBottleCard}
                alt={product.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = productBottleCard;
                }}
              />
            </div>

            {/* Product Name - Positioned at x: 24, y: 421, with underline on first word */}
            <div className="absolute top-[421px] left-[24px] right-[24px] h-[32px] flex items-center justify-start">
              <h3 
                className="text-[24px] font-medium text-[#00B8A9] leading-[1.342] text-left whitespace-nowrap"
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
                  className="text-[24px] font-medium text-[#00B8A9] leading-[1.342] whitespace-nowrap flex items-center"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  {product.price.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Shopping Cart Icon - Symmetrically aligned */}
              <button
                onClick={handleProductBuy}
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
        </div>

        {/* Background Image - x: 495, y: 0, width: 797, height: 786 */}
        <div 
          className="absolute hidden md:block"
          style={{
            left: 'clamp(200px, 34.38vw, 495px)',
            top: 0,
            width: 'clamp(400px, 55.35vw, 797px)',
            height: 'clamp(400px, 54.58vw, 786px)'
          }}
        >
          <img
            src={honeyBg}
            alt="Honey background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content - Right Side */}
        <div 
          className="absolute text-white"
          style={{
            right: 'clamp(20px, 3.47vw, 50px)',
            top: 'clamp(100px, 9.72vw, 140px)',
            width: 'clamp(250px, 22.92vw, 330px)'
          }}
        >
          {/* Heading - "Produk Paling Banyak Terjual" */}
          <div className="mb-6">
            <h2 
              className="text-[48px] font-bold text-white leading-[1.342] mb-0"
              style={{ 
                fontFamily: 'Nort, sans-serif',
                fontWeight: 700
              }}
            >
              Produk Paling{' '}
              <br />
              Banyak{' '}
              <span className="text-[#FFDE7D] relative inline-block">
                Terjual
                <span 
                  className="absolute left-0 bg-black"
                  style={{
                    width: 'clamp(120px, 10.83vw, 156px)',
                    height: 'clamp(8px, 0.76vw, 11px)',
                    bottom: 'clamp(-8px, -0.76vw, -11px)'
                  }}
                ></span>
              </span>
            </h2>
          </div>

          {/* Description Text - align RIGHT */}
          <p 
            className="text-[14px] font-normal text-white leading-[1.342] text-right"
            style={{ 
              fontFamily: 'Nort, sans-serif',
              width: 'clamp(250px, 19.44vw, 280px)'
            }}
          >
            Madu Hutan Premium kami adalah produk best seller yang telah memikat
            hati pelanggan setia kami. Dipanen langsung dari hutan alami, madu ini
            mengandung berbagai nektar bunga pilihan yang memberikan rasa khas dan
            manfaat luar biasa. Setiap tetesnya kaya akan nutrisi dan antioksidan
            alami yang dapat mendukung daya tahan tubuh dan meningkatkan kesehatan
            secara keseluruhan.
          </p>
        </div>
      </div>
    </section>
  );
}