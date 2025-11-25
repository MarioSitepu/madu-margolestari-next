import { useState, useEffect } from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO"; 
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import productBottlesHero from "@/assets/product-bottles-hero.png";
import productBottleCard from "@/assets/product-bottle-card.png";
import axios from "axios";
import { API_URL } from '@/lib/api';

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
    alert('Fitur Beli Sekarang akan segera tersedia!');
  };

  const handleProductBuy = (product: Product) => {
    alert(`${product.name} - Rp ${product.price.toLocaleString('id-ID')} ditambahkan ke keranjang!`);
  };

  const seoProducts = products.map(product => ({
    name: product.name,
    description: product.description,
    image: product.imageUrl || 'https://madumargolestari.vercel.app/product-bottle-card.png',
    price: product.price,
    url: `https://madumargolestari.vercel.app/product`
  }));

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Produk Madu Jaya Lestari - Beli Madu Murni Online | Katalog Lengkap"
        description="Katalog Lengkap Madu Murni."
        keywords="madu, beli madu"
        url="https://madumargolestari.vercel.app/product"
        image="https://madumargolestari.vercel.app/product-bottles-hero.png"
        type="website"
        breadcrumbs={[{ name: 'Beranda', url: '/' }, { name: 'Produk', url: '/product' }]}
        products={seoProducts}
      />
      
      <section className="bg-[#00b8a9] relative w-full min-h-[498px] py-8 md:py-0">
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-0">
          <div className="hidden md:block absolute right-[154px] top-[31px] w-[435px] h-[435px]">
            <img src={productBottlesHero} alt="Hero Botol" className="w-full h-full object-contain" />
          </div>
          <div className="md:hidden flex justify-center mb-6">
            <div className="w-[300px] h-[300px]">
              <img src={productBottlesHero} alt="Hero Botol" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="relative md:absolute left-0 md:left-[171px] top-0 md:top-[92px] w-full md:w-[577px] px-4 md:px-0">
            <div className="mb-4 md:mb-6">
              <h2 className="text-[28px] md:text-[48px] font-extrabold text-white leading-[1.342] mb-2" style={{ fontFamily: 'Nort, sans-serif' }}>
                Nikmati kelezatan dan manfaat dari Madu Alami{' '}
                <span className="text-[#ffde7d] relative inline-block">
                  100%
                  <span className="absolute bottom-0 left-0 w-20 md:w-[122px] h-2 md:h-2.5 bg-white"></span>
                </span>
              </h2>
            </div>
            <div className="mb-6 md:mb-8">
              <p className="text-[14px] font-normal text-white leading-[1.342]" style={{ fontFamily: 'Nort, sans-serif' }}>
                Jangan lewatkan kesempatan untuk merasakan manfaat kesehatan dari madu yang dipanen langsung dari peternakan lebah terbaik.
              </p>
            </div>
            <div className="w-full md:w-[186px] h-[47px] flex justify-center md:justify-start">
              <Button onClick={handleBuyNow} className="w-full md:w-auto bg-[#ffde7d] text-white hover:bg-[#f5c869] font-bold rounded-none flex items-center justify-center gap-2 px-8" style={{ height: '47px', fontSize: '14px' }}>
                <span>Beli Sekarang</span>
                <ArrowRight className="w-[9.92px] h-[10px]" strokeWidth={2} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#ffde7d] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[32px] md:text-[48px] font-extrabold text-black mb-2" style={{ fontFamily: 'Nort, sans-serif' }}>
              Produk <span className="text-[#00b8a9] relative inline-block">Kami<span className="absolute bottom-0 left-0 w-full h-2.5 bg-black"></span></span>
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-16"><p>Memuat produk...</p></div>
          ) : products.length === 0 ? (
            <div className="text-center py-16"><p>Belum ada produk.</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-[1291px] mx-auto">
              {products.map((product) => {
                const nameParts = product.name.split(' ');
                const firstWord = nameParts[0];
                const restOfName = nameParts.slice(1).join(' ');
                
                return (
                <div key={product._id} className="relative w-full max-w-[382px] h-[587px] bg-[#00b8a9] rounded-sm overflow-hidden mx-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer" style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)' }}>
                  
                  {/* Product Image - DIPERBESAR (Sama seperti ProductList) */}
                  <div className="absolute top-[20px] left-0 right-0 mx-auto w-[260px] h-[400px] flex justify-center items-center transition-transform duration-500 group-hover:scale-105">
                    <img
                      src={product.imageUrl || productBottleCard}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-lg"
                      onError={(e) => { const target = e.target as HTMLImageElement; target.src = productBottleCard; }}
                    />
                  </div>

                  <div className="absolute top-[421px] left-6 right-6 h-8 flex items-center justify-start z-10">
                    <h3 className="text-[24px] font-medium text-[#ffde7d] leading-[1.342] text-left whitespace-nowrap" style={{ fontFamily: 'Nort, sans-serif' }}>
                      <span className="underline decoration-2 underline-offset-2">{firstWord}</span> {restOfName}
                    </h3>
                  </div>
                  <div className="absolute top-[457px] left-6 right-6 h-[76px] z-10">
                    <p className="text-[12px] font-normal text-black leading-[1.342] line-clamp-3" style={{ fontFamily: 'Nort, sans-serif' }}>
                      {product.description}
                    </p>
                  </div>
                  <div className="absolute top-[533px] left-6 right-6 h-8 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1 h-full">
                      <span className="text-[15px] font-medium text-black">Rp</span>
                      <span className="text-[24px] font-medium text-[#ffde7d]">{product.price.toLocaleString('id-ID')}</span>
                    </div>
                    <button onClick={() => handleProductBuy(product)} className="bg-white text-[#00b8a9] rounded-xl hover:bg-gray-50 shadow-md w-12 h-12 flex items-center justify-center">
                      <ShoppingCart size={20} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default ProductPage;
