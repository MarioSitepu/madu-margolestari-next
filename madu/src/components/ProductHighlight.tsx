import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import productBottleCard from "@/assets/product-bottle-card.png";
import honeyBg from "@/assets/honey-bg-6badc9.png";

const handleProductBuy = () => {
  alert('Lebah Cerana - Rp 50.000 ditambahkan ke keranjang!');
};

export function ProductHighlight() {
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
        @media (min-width: 768px) {
          .product-card-container {
            height: clamp(600px, 48.54vw, 699px);
          }
          .product-card {
            height: clamp(400px, 40.76vw, 587px);
          }
          .product-image {
            bottom: clamp(100px, 13.06vw, 150px) !important;
            marginTop: 0 !important;
            marginBottom: 0 !important;
          }
          .product-name {
            top: clamp(280px, 403px, 403px) !important;
          }
          .product-description {
            top: clamp(320px, 439px, 439px) !important;
          }
          .product-price {
            top: clamp(380px, 515px, 515px) !important;
          }
        }
      `}</style>
      <section className="w-full bg-white relative overflow-hidden min-h-screen md:min-h-[786px]">
        {/* Background Rectangle - #00B8A9 */}
        <div className="absolute inset-0 bg-[#00B8A9]"></div>

      {/* Main Container - 1440px width */}
      <div className="relative max-w-[1440px] mx-auto h-auto md:h-[786px] overflow-visible py-6 md:py-0 px-4 md:px-0 flex flex-col md:block">
        {/* Text Content - Right Side / Top on Mobile */}
        <div 
          className="relative md:absolute text-white mx-auto md:mx-0 px-0 md:px-0 mb-6 md:mb-0 md:mt-0 text-center md:text-left animate-fade-in-right order-1 md:order-0 w-full md:w-auto"
          style={{
            right: 'clamp(20px, 3.47vw, 50px)',
            top: 'clamp(100px, 9.72vw, 140px)',
            width: 'clamp(250px, 22.92vw, 330px)',
            maxWidth: '100%'
          }}
        >
          {/* Heading - "Produk Paling Banyak Terjual" */}
          <div className="mb-3 md:mb-6">
            <h2 
              className="text-[26px] md:text-[48px] font-bold text-white leading-[1.15] md:leading-[1.342] mb-0 drop-shadow-lg"
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
                  className="absolute left-0 bg-black transition-all duration-300"
                  style={{
                    width: 'clamp(65px, 10.83vw, 156px)',
                    height: 'clamp(4px, 0.76vw, 11px)',
                    bottom: 'clamp(-4px, -0.76vw, -11px)'
                  }}
                ></span>
              </span>
            </h2>
          </div>

          {/* Description Text - align RIGHT */}
          <p 
            className="text-[11px] md:text-[14px] font-normal text-white leading-[1.6] md:leading-[1.342] text-center md:text-right mx-auto md:mx-0 drop-shadow-md"
            style={{ 
              fontFamily: 'Nort, sans-serif',
              width: 'clamp(250px, 19.44vw, 280px)',
              maxWidth: '100%'
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

        {/* Product Card Group - Positioned at x: 113, y: 20 / Bottom on Mobile */}
        <div 
          className="product-card-container relative md:absolute overflow-visible mx-auto md:mx-0 w-full max-w-[300px] md:max-w-[382px] md:w-auto animate-fade-in-up order-2 md:order-0"
          style={{
            left: 'clamp(20px, 7.85vw, 113px)',
            top: 'clamp(20px, 2.54vw, 20px)',
            width: 'clamp(280px, 26.53vw, 382px)',
            height: 'auto'
          }}
        >
          {/* Product Card - Same structure as ProductList, but keep yellow background */}
          <div
            className="product-card relative bg-[#FFDE7D] rounded-[4px] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group flex flex-col md:block pb-4 md:pb-0"
            style={{
              marginTop: 'clamp(0px, 7.78vw, 112px)',
              width: '100%',
              minHeight: 'clamp(320px, 40.76vw, 587px)',
              height: 'auto',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)'
            }}
          >
            {/* Product Image - Enlarged, anchored at bottom, extending upward */}
            <div 
              className="product-image relative md:absolute z-10 transition-transform duration-500 group-hover:scale-110 mx-auto md:mx-0 shrink-0 flex items-center justify-center order-first md:order-0"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: 'auto',
                width: 'clamp(110px, 15.56vw, 224px)',
                height: 'clamp(180px, 37.5vw, 540px)',
                marginTop: '16px',
                marginBottom: '12px'
              }}
            >
              {!imageLoaded && (
                <div className="absolute inset-0 bg-[#FFDE7D] animate-pulse rounded-lg"></div>
              )}
              <img
                src={product.imageUrl || productBottleCard}
                alt={`Botol Madu Murni ${product.name} Asli Lampung dari Madu Margo Lestari - Produk Best Seller Madu Berkualitas Tinggi`}
                className={`w-full h-full object-contain transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = productBottleCard;
                  setImageLoaded(true);
                }}
              />
            </div>

            {/* Product Name - Positioned at x: 24, y: 421, with underline on first word */}
            <div 
              className="product-name relative md:absolute left-[16px] md:left-[24px] right-[16px] md:right-[24px] h-auto md:h-[32px] flex items-center justify-start px-4 md:px-0 mt-0 mb-2 md:my-0"
            >
              <h3 
                className="text-[17px] md:text-[24px] font-medium text-[#00B8A9] leading-[1.342] text-left md:whitespace-nowrap"
                style={{ fontFamily: 'Nort, sans-serif' }}
              >
                <span className="underline decoration-2 underline-offset-2">{firstWord}</span>
                {restOfName && ` ${restOfName}`}
              </h3>
            </div>

            {/* Product Description - Positioned at x: 24, y: 457, width: 302, height: 76 */}
            <div 
              className="product-description relative md:absolute left-[16px] md:left-[24px] right-[16px] md:right-[24px] md:w-[302px] md:h-[76px] px-4 md:px-0 mb-3 md:my-0"
            >
              <p 
                className="text-[10px] md:text-[12px] font-normal text-black leading-normal md:leading-[1.342]"
                style={{ fontFamily: 'Nort, sans-serif' }}
              >
                {product.description}
              </p>
            </div>

            {/* Price and Cart Container - Aligned at y: 533 */}
            <div 
              className="product-price relative md:absolute left-[16px] md:left-[24px] right-[16px] md:right-[24px] h-[32px] flex items-center justify-between px-4 md:px-0 mb-4 md:my-0"
            >
              {/* Price Group */}
              <div className="flex items-center gap-1 h-full">
                {/* Rp */}
                <span 
                  className="text-[12px] md:text-[15px] font-medium text-black leading-[1.342] whitespace-nowrap flex items-center"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  Rp
                </span>
                {/* Price */}
                <span 
                  className="text-[17px] md:text-[24px] font-medium text-[#00B8A9] leading-[1.342] whitespace-nowrap flex items-center"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  {product.price.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Shopping Cart Icon - Symmetrically aligned */}
              <button
                onClick={handleProductBuy}
                className="relative bg-white text-[#00b8a9] rounded-xl hover:bg-[#00b8a9] hover:text-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00b8a9] focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center w-8 h-8 md:w-12 md:h-12 shrink-0 group/btn overflow-hidden"
                title="Tambah ke Keranjang"
                aria-label="Tambah produk ke keranjang"
                style={{
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                <span className="absolute inset-0 bg-[#00b8a9] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></span>
                <ShoppingCart 
                  size={15} 
                  strokeWidth={2.5} 
                  className="md:w-5 md:h-5 relative z-10 transition-transform duration-300 group-hover/btn:scale-110" 
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Background Image - x: 495, y: 0, width: 797, height: 786 */}
        <div 
          className="absolute hidden md:block overflow-hidden"
          style={{
            left: 'clamp(200px, 34.38vw, 495px)',
            top: 0,
            width: 'clamp(400px, 55.35vw, 797px)',
            height: 'clamp(400px, 54.58vw, 786px)'
          }}
        >
          <div className="relative w-full h-full">
            <img
              src={honeyBg}
              alt="Background tetesan madu alami dari peternakan lebah Madu Margo Lestari Lampung"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#00B8A9]/20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}