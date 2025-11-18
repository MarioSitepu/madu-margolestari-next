import { useState, useEffect } from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import productBottlesHero from "@/assets/product-bottles-hero.png";
import productBottleCard from "@/assets/product-bottle-card.png";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    // Handle buy now logic here
    alert('Fitur Beli Sekarang akan segera tersedia!');
  };

  const handleProductBuy = (product: Product) => {
    // Handle product buy logic here
    alert(`${product.name} - Rp ${product.price.toLocaleString('id-ID')} ditambahkan ke keranjang!`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Bottom CTA Section - Teal Background */}
      <section className="bg-[#00b8a9] relative w-full min-h-[498px] py-8 md:py-0">
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-0">
          {/* Hero Image - Positioned Right */}
          <div className="hidden md:block absolute right-[154px] top-[31px] w-[435px] h-[435px]">
            <img
              src={productBottlesHero}
              alt="Madu Marles Bottles"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Mobile Image */}
          <div className="md:hidden flex justify-center mb-6">
            <div className="w-[300px] h-[300px]">
              <img
                src={productBottlesHero}
                alt="Madu Marles Bottles"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Content - Positioned Left */}
          <div className="relative md:absolute left-0 md:left-[171px] top-0 md:top-[92px] w-full md:w-[577px] px-4 md:px-0">
            {/* Title */}
            <div className="mb-4 md:mb-6">
              <h2 
                className="text-[28px] md:text-[48px] font-extrabold text-white leading-[1.342] mb-2"
                style={{ fontFamily: 'Nort, sans-serif' }}
              >
                Nikmati kelezatan dan manfaat dari Madu Alami{' '}
                <span className="text-[#ffde7d] relative inline-block">
                  100%
                  <span className="absolute bottom-0 left-0 w-[80px] md:w-[122px] h-[8px] md:h-[11px] bg-white"></span>
                </span>
              </h2>
            </div>

            {/* Description */}
            <div className="mb-6 md:mb-8">
              <p 
                className="text-[14px] font-normal text-white leading-[1.342]"
                style={{ fontFamily: 'Nort, sans-serif' }}
              >
                Jangan lewatkan kesempatan untuk merasakan manfaat kesehatan dari madu yang dipanen langsung dari peternakan lebah terbaik. Pesan sekarang dan rasakan sendiri perbedaannya!
              </p>
            </div>

            {/* Buy Now Button */}
            <div className="w-full md:w-[186px] h-[47px]">
              <Button
                onClick={handleBuyNow}
                className="w-full h-full bg-[#ffde7d] text-white hover:bg-[#f5c869] font-bold rounded-none flex items-center justify-center gap-2 px-8"
                style={{ 
                  fontFamily: 'Nort, sans-serif', 
                  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)',
                  fontSize: '14px',
                  lineHeight: '1.342'
                }}
              >
                <span>Beli Sekarang</span>
                <ArrowRight className="w-[9.92px] h-[10px]" strokeWidth={2} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Produk Kami Section - Yellow Background */}
      <section className="bg-[#ffde7d] py-16 md:py-20">
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
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b8a9]"></div>
              <p className="mt-4 text-gray-700">Memuat produk...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-700 text-lg">Belum ada produk tersedia</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-[68px] max-w-[1291px] mx-auto">
              {products.map((product) => {
                // Split product name to get first word for underline
                const nameParts = product.name.split(' ');
                const firstWord = nameParts[0];
                const restOfName = nameParts.slice(1).join(' ');
                
                return (
                <div
                  key={product._id}
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
                    className="text-[14px] font-normal text-black leading-[1.342]"
                    style={{ fontFamily: 'Nort, sans-serif' }}
                  >
                    {product.description}
                  </p>
                </div>

                {/* Price Group - Positioned at x: 24, y: 533, allow price to extend right */}
                <div className="absolute top-[533px] left-[24px] right-[80px] h-[32px] flex items-center gap-1">
                  {/* Rp */}
                  <span 
                    className="text-[15px] font-medium text-black leading-[1.342] whitespace-nowrap"
                    style={{ fontFamily: 'Nort, sans-serif' }}
                  >
                    Rp
                  </span>
                  {/* Price - Allow to extend right */}
                  <span 
                    className="text-[24px] font-medium text-[#ffde7d] leading-[1.342] whitespace-nowrap"
                    style={{ fontFamily: 'Nort, sans-serif' }}
                  >
                    {product.price.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Shopping Cart Icon - Positioned at x: 326, y: 537, width: 24, height: 24 */}
                <div className="absolute top-[537px] left-[300px] w-[24px] h-[24px]">
                  <button
                    onClick={() => handleProductBuy(product)}
                    className="w-full h-full flex items-center justify-center hover:opacity-80 transition-opacity"
                    title="Tambah ke Keranjang"
                  >
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
              );
            })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ProductPage;
