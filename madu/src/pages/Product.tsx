import { useState, useEffect } from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
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
    // Handle buy now logic here
    alert('Fitur Beli Sekarang akan segera tersedia!');
  };

  const handleProductBuy = (product: Product) => {
    // Handle product buy logic here
    alert(`${product.name} - Rp ${product.price.toLocaleString('id-ID')} ditambahkan ke keranjang!`);
  };

  // Prepare products for SEO structured data
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
        title="Produk Madu Margo Lestari - Beli Madu Murni Online | Katalog Lengkap"
        description="Jelajahi koleksi produk madu murni berkualitas tinggi dari Madu Margo Lestari. Dapatkan madu asli 100% tanpa campuran, dipanen langsung dari peternakan lebah terbaik. Pesan sekarang dan nikmati manfaat kesehatan yang luar biasa. Harga terjangkau dengan kualitas premium. Pengiriman cepat ke seluruh Indonesia."
        keywords="produk madu, beli madu online, madu murni lampung, madu asli lampung selatan, harga madu, jual madu murni, madu kesehatan, madu organik indonesia, madu margo lestari produk, madu jati agung, katalog madu, daftar produk madu, beli madu murni, toko madu online"
        url="https://madumargolestari.vercel.app/product"
        image="https://madumargolestari.vercel.app/product-bottles-hero.png"
        type="website"
        breadcrumbs={[
          { name: 'Beranda', url: 'https://madumargolestari.vercel.app/' },
          { name: 'Produk', url: 'https://madumargolestari.vercel.app/product' }
        ]}
        products={seoProducts}
      />
      {/* Bottom CTA Section - Teal Background */}
      <section className="bg-[#00b8a9] relative w-full min-h-[498px] py-8 md:py-0">
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-0">
          {/* Hero Image - Positioned Right */}
          <div className="hidden md:block absolute right-[154px] top-[31px] w-[435px] h-[435px]">
            <img
              src={productBottlesHero}
              alt="Koleksi botol madu murni berkualitas tinggi dari Madu Margo Lestari Lampung - Produk madu asli 100% tanpa campuran"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Mobile Image */}
          <div className="md:hidden flex justify-center mb-6">
            <div className="w-[300px] h-[300px]">
              <img
                src={productBottlesHero}
                alt="Koleksi botol madu murni berkualitas tinggi dari Madu Margo Lestari Lampung - Produk madu asli 100% tanpa campuran"
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
                      alt={`Botol Madu Murni ${product.name} Asli Lampung dari Madu Margo Lestari - ${product.description.substring(0, 50)}`}
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
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ProductPage;
