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
      <section className="w-full bg-white relative overflow-hidden min-h-[600px] sm:min-h-[700px] md:min-h-[786px]">
        {/* Background Rectangle - #00B8A9 */}
        <div className="absolute inset-0 bg-[#00B8A9]"></div>

      {/* Main Container - 1440px width */}
      <div className="relative max-w-[1440px] mx-auto h-auto md:h-[786px] overflow-visible py-8 sm:py-10 md:py-0 px-4 sm:px-6 md:px-0 flex flex-col md:block">
        {/* Mobile Layout - Stacked vertically */}
        <div className="flex flex-col md:hidden w-full gap-6 sm:gap-8">
          {/* Text Content - Top on Mobile */}
          <div className="relative text-white mx-auto px-0 text-center w-full max-w-full sm:max-w-lg z-10 animate-fade-in-right">
            {/* Heading - "Produk Paling Banyak Terjual" */}
            <div className="mb-4 sm:mb-5">
              <h2 
                className="text-[28px] sm:text-[36px] font-bold text-white leading-[1.2] sm:leading-[1.3] mb-0 drop-shadow-lg"
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
                      width: 'clamp(80px, 20vw, 156px)',
                      height: 'clamp(5px, 1.2vw, 11px)',
                      bottom: 'clamp(-5px, -1.2vw, -11px)'
                    }}
                  ></span>
                </span>
              </h2>
            </div>

            {/* Description Text - Center on Mobile */}
            <p 
              className="text-[13px] sm:text-[14px] font-normal text-white leading-[1.6] text-center mx-auto drop-shadow-md px-2"
              style={{ 
                fontFamily: 'Nort, sans-serif',
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

          {/* Product Card - Bottom on Mobile */}
          <div className="relative w-full max-w-[320px] sm:max-w-[350px] mx-auto animate-fade-in-up z-10">
            {/* Product Card */}
            <div
              className="product-card relative bg-[#FFDE7D] rounded-[4px] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group flex flex-col pb-6 sm:pb-8"
              style={{
                width: '100%',
                minHeight: '400px',
                height: 'auto',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)'
              }}
            >
              {/* Product Image */}
              <div 
                className="product-image relative z-10 transition-transform duration-500 group-hover:scale-110 mx-auto shrink-0 flex items-center justify-center order-first"
                style={{
                  width: 'clamp(140px, 35vw, 200px)',
                  height: 'clamp(220px, 50vw, 320px)',
                  marginTop: '24px',
                  marginBottom: '20px'
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

              {/* Product Info Container - Bottom Section */}
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 sm:space-y-4 flex-1 flex flex-col justify-end">
                {/* Product Name */}
                <div className="h-auto flex items-center justify-start">
                  <h3 
                    className="text-[20px] sm:text-[22px] font-medium text-[#00B8A9] leading-[1.342] text-left"
                    style={{ fontFamily: 'Nort, sans-serif' }}
                  >
                    <span className="underline decoration-2 underline-offset-2">{firstWord}</span>
                    {restOfName && ` ${restOfName}`}
                  </h3>
                </div>

                {/* Product Description */}
                <div className="w-full h-auto">
                  <p 
                    className="text-[12px] sm:text-[13px] font-normal text-black leading-relaxed"
                    style={{ fontFamily: 'Nort, sans-serif' }}
                  >
                    {product.description}
                  </p>
                </div>

                {/* Price and Cart Container */}
                <div className="h-auto flex items-center justify-between pt-2">
                  {/* Price Group */}
                  <div className="flex items-center gap-1">
                    <span 
                      className="text-[14px] sm:text-[15px] font-medium text-black leading-[1.342] whitespace-nowrap flex items-center"
                      style={{ fontFamily: 'Nort, sans-serif' }}
                    >
                      Rp
                    </span>
                    <span 
                      className="text-[22px] sm:text-[24px] font-medium text-[#00B8A9] leading-[1.342] whitespace-nowrap flex items-center"
                      style={{ fontFamily: 'Nort, sans-serif' }}
                    >
                      {product.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {/* Shopping Cart Icon */}
                  <button
                    onClick={handleProductBuy}
                    className="relative bg-white text-[#00b8a9] rounded-xl hover:bg-[#00b8a9] hover:text-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00b8a9] focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 shrink-0 group/btn overflow-hidden"
                    title="Tambah ke Keranjang"
                    aria-label="Tambah produk ke keranjang"
                    style={{
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    <span className="absolute inset-0 bg-[#00b8a9] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></span>
                    <ShoppingCart 
                      size={20} 
                      strokeWidth={2.5} 
                      className="relative z-10 transition-transform duration-300 group-hover/btn:scale-110" 
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Absolute Positioning */}
        {/* Text Content - Right Side */}
        <div 
          className="hidden md:block absolute text-white text-left animate-fade-in-right z-10"
          style={{
            right: 'clamp(20px, 3.47vw, 50px)',
            top: 'clamp(100px, 9.72vw, 140px)',
            width: 'clamp(250px, 22.92vw, 330px)',
            maxWidth: '330px'
          }}
        >
          {/* Heading - "Produk Paling Banyak Terjual" */}
          <div className="mb-6">
            <h2 
              className="text-[48px] font-bold text-white leading-[1.342] mb-0 drop-shadow-lg"
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
            className="text-[14px] font-normal text-white leading-[1.342] text-right mx-0 drop-shadow-md"
            style={{ 
              fontFamily: 'Nort, sans-serif',
              width: 'clamp(250px, 19.44vw, 280px)',
              maxWidth: '280px'
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

        {/* Product Card Group - Desktop: Positioned at x: 113, y: 20 */}
        <div 
          className="hidden md:block absolute overflow-visible animate-fade-in-up z-10"
          style={{
            left: 'clamp(20px, 7.85vw, 113px)',
            top: 'clamp(20px, 2.54vw, 20px)',
            width: 'clamp(280px, 26.53vw, 382px)',
            height: 'auto'
          }}
        >
          {/* Product Card - Desktop */}
          <div
            className="product-card relative bg-[#FFDE7D] rounded-[4px] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group"
            style={{
              marginTop: 'clamp(0px, 7.78vw, 112px)',
              width: '100%',
              minHeight: 'clamp(400px, 40.76vw, 587px)',
              height: 'auto',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)'
            }}
          >
            {/* Product Image - Desktop */}
            <div 
              className="product-image absolute z-10 transition-transform duration-500 group-hover:scale-110"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: 'clamp(100px, 13.06vw, 150px)',
                width: 'clamp(120px, 15.56vw, 224px)',
                height: 'clamp(200px, 37.5vw, 540px)',
                marginTop: 0,
                marginBottom: 0
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

            {/* Product Info Container - Desktop */}
            <div className="absolute left-[24px] right-[24px]">
              {/* Product Name */}
              <div 
                className="product-name absolute h-[32px] flex items-center justify-start"
                style={{
                  top: 'clamp(280px, 403px, 403px)'
                }}
              >
                <h3 
                  className="text-[24px] font-medium text-[#00B8A9] leading-[1.342] text-left whitespace-nowrap"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  <span className="underline decoration-2 underline-offset-2">{firstWord}</span>
                  {restOfName && ` ${restOfName}`}
                </h3>
              </div>

              {/* Product Description */}
              <div 
                className="product-description absolute w-[302px] h-[76px]"
                style={{
                  top: 'clamp(320px, 439px, 439px)'
                }}
              >
                <p 
                  className="text-[12px] font-normal text-black leading-[1.342]"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  {product.description}
                </p>
              </div>

              {/* Price and Cart Container */}
              <div 
                className="product-price absolute h-[32px] flex items-center justify-between"
                style={{
                  top: 'clamp(380px, 515px, 515px)'
                }}
              >
                {/* Price Group */}
                <div className="flex items-center gap-1">
                  <span 
                    className="text-[15px] font-medium text-black leading-[1.342] whitespace-nowrap flex items-center"
                    style={{ fontFamily: 'Nort, sans-serif' }}
                  >
                    Rp
                  </span>
                  <span 
                    className="text-[24px] font-medium text-[#00B8A9] leading-[1.342] whitespace-nowrap flex items-center"
                    style={{ fontFamily: 'Nort, sans-serif' }}
                  >
                    {product.price.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Shopping Cart Icon */}
                <button
                  onClick={handleProductBuy}
                  className="relative bg-white text-[#00b8a9] rounded-xl hover:bg-[#00b8a9] hover:text-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00b8a9] focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center w-12 h-12 shrink-0 group/btn overflow-hidden"
                  title="Tambah ke Keranjang"
                  aria-label="Tambah produk ke keranjang"
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <span className="absolute inset-0 bg-[#00b8a9] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></span>
                  <ShoppingCart 
                    size={20} 
                    strokeWidth={2.5} 
                    className="relative z-10 transition-transform duration-300 group-hover/btn:scale-110" 
                    aria-hidden="true"
                  />
                </button>
              </div>
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