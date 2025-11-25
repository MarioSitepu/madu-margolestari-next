import { useState, useEffect } from "react";
import { ShoppingCart, CheckCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { useCart } from "@/context/CartContext";
import { QuantitySelectorModal } from "@/components/QuantitySelectorModal";
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

interface AddToCartNotificationProps {
  isOpen: boolean;
  productName: string;
  price: number;
  onClose: () => void;
  onContinueShopping: () => void;
  onViewCart: () => void;
}

const AddToCartNotification = ({ isOpen, productName, price, onClose, onContinueShopping, onViewCart }: AddToCartNotificationProps) => {
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
            onClick={onContinueShopping}
            className="flex-1 bg-white hover:bg-gray-100 text-[#00b8a9] border-2 border-[#00b8a9] font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Lanjut Berbelanja
          </button>
          <button
            onClick={onViewCart}
            className="flex-1 bg-[#00b8a9] hover:bg-[#009d92] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Lihat Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export function ProductPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantityModalOpen, setQuantityModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cartNotification, setCartNotification] = useState<{ isOpen: boolean; productName: string; price: number }>({
    isOpen: false,
    productName: '',
    price: 0
  });

  useEffect(() => {
    setIsVisible(true);
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

  const handleProductBuy = (product: Product) => {
    setSelectedProduct(product);
    setQuantityModalOpen(true);
  };

  const handleQuantityConfirm = (quantity: number) => {
    if (selectedProduct) {
      addToCart({
        _id: selectedProduct._id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        imageUrl: selectedProduct.imageUrl,
        quantity,
      });

      // Show notification
      setCartNotification({
        isOpen: true,
        productName: selectedProduct.name,
        price: selectedProduct.price,
      });

      setQuantityModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const seoProducts = products.map(product => ({
    name: product.name,
    description: product.description,
    image: product.imageUrl || 'https://madumargolestari.vercel.app/product-bottle-card.png',
    price: product.price,
    url: `https://madumargolestari.vercel.app/product`
  }));

  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-500">
      <SEO
        title="Produk Madu Jaya Lestari - Beli Madu Murni Online | Katalog Lengkap"
        description="Jelajahi koleksi produk madu murni berkualitas tinggi dari Madu Jaya Lestari. Dapatkan madu asli 100% tanpa campuran, dipanen langsung dari peternakan lebah terbaik. Pesan sekarang dan nikmati manfaat kesehatan yang luar biasa. Harga terjangkau dengan kualitas premium. Pengiriman cepat ke seluruh Indonesia."
        keywords="produk madu, beli madu online, madu murni lampung, madu asli lampung selatan, harga madu, jual madu murni, madu kesehatan, madu organik indonesia, madu jaya lestari produk, madu margo lestari, maps madu jaya lestari, madu di margo lestari, madu jati agung, katalog madu, daftar produk madu, beli madu murni, toko madu online, lokasi madu jaya lestari"
        url="https://madumargolestari.vercel.app/product"
        image="https://madumargolestari.vercel.app/product-bottles-hero.png"
        type="website"
        breadcrumbs={[
          { name: 'Beranda', url: 'https://madumargolestari.vercel.app/' },
          { name: 'Produk', url: 'https://madumargolestari.vercel.app/product' }
        ]}
        products={seoProducts}
      />

      <section className="bg-[#00b8a9] relative w-full min-h-[498px] py-8 md:py-0 animate-in fade-in slide-in-from-top-2 duration-700">
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-0">
          <div className="hidden md:block absolute right-[154px] top-[31px] w-[435px] h-[435px]">
            <img
              src={productBottlesHero}
              alt="Koleksi botol madu murni berkualitas tinggi dari Madu Jaya Lestari Lampung - Produk madu asli 100% tanpa campuran"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="md:hidden flex justify-center mb-6">
            <div className="w-[300px] h-[300px]">
              <img
                src={productBottlesHero}
                alt="Koleksi botol madu murni berkualitas tinggi dari Madu Jaya Lestari Lampung - Produk madu asli 100% tanpa campuran"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="relative md:absolute left-0 md:left-[171px] top-0 md:top-[92px] w-full md:w-[577px] px-4 md:px-0 transition-all duration-1000"
            style={{
              transform: isVisible ? 'translateX(0)' : '-translateX(20px)',
              opacity: isVisible ? 1 : 0,
            }}
          >
            <div className="mb-4 md:mb-6">
              <h2
                className="text-[28px] md:text-[48px] font-extrabold text-white leading-[1.342] mb-2"
                style={{ fontFamily: 'Nort, sans-serif' }}
              >
                Nikmati kelezatan dan manfaat dari Madu Alami{' '}
                <span className="text-[#ffde7d] relative inline-block">
                  100%
                  <span className="absolute bottom-0 left-0 w-20 md:w-[122px] h-2 md:h-2.5 bg-white"></span>
                </span>
              </h2>
            </div>

            <div className="mb-6 md:mb-8">
              <p
                className="text-[14px] font-normal text-white leading-[1.342]"
                style={{ fontFamily: 'Nort, sans-serif' }}
              >
                Jangan lewatkan kesempatan untuk merasakan manfaat kesehatan dari madu yang dipanen langsung dari peternakan lebah terbaik. Pesan sekarang dan rasakan sendiri perbedaannya!
              </p>
            </div>


          </div>
        </div>
      </section>

      <section className="bg-[#ffde7d] py-16 md:py-20">
        <div className="container relative mx-auto h-full px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-200"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
          }}
        >
          <div className="text-center mb-12 md:mb-16">
            <h2
              className="text-[32px] md:text-[48px] font-extrabold text-black leading-[1.342] mb-2"
              style={{ fontFamily: 'Nort, sans-serif' }}
            >
              Produk{' '}
              <span className="text-[#00b8a9] relative inline-block">
                Kami
              </span>
            </h2>
          </div>

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
              {products.map((product, index) => {
                const nameParts = product.name.split(' ');
                const firstWord = nameParts[0];
                const restOfName = nameParts.slice(1).join(' ');

                return (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="relative w-full max-w-[382px] h-[500px] bg-[#00b8a9] rounded-sm overflow-hidden mx-auto group hover:shadow-xl transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ 
                      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)',
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="absolute top-0 bottom-[135px] left-0 right-0 flex items-start justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                      <div className="inline-block border-4 border-white rounded-lg overflow-hidden mt-0">
                        <img
                          src={product.imageUrl || productBottleCard}
                          alt={`Botol Madu Murni ${product.name} Asli Lampung dari Madu Jaya Lestari - ${product.description.substring(0, 50)}`}
                          className="block w-auto max-h-[365px] object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = productBottleCard;
                          }}
                        />
                      </div>
                    </div>

                    <div className="absolute top-[383px] left-6 right-6 h-6 flex items-center justify-start">
                      <h3
                        className="text-[18px] font-medium text-[#ffde7d] leading-[1.2] text-left whitespace-nowrap cursor-pointer group-hover:opacity-80 transition-opacity"
                        style={{ fontFamily: 'Nort, sans-serif' }}
                      >
                        <span>{firstWord}</span>
                        {restOfName && ` ${restOfName}`}
                      </h3>
                    </div>

                    <div className="absolute top-[411px] left-6 right-6 h-[32px] overflow-hidden">
                      <p
                        className="text-[11px] font-normal text-black leading-[1.3]"
                        style={{ fontFamily: 'Nort, sans-serif' }}
                      >
                        {product.description}
                      </p>
                    </div>

                    <div className="absolute top-[448px] left-6 right-6 h-8 flex items-center justify-between">
                      <div className="flex items-center gap-1 h-full">
                        <span
                          className="text-[13px] font-medium text-black leading-[1.2] whitespace-nowrap flex items-center"
                          style={{ fontFamily: 'Nort, sans-serif' }}
                        >
                          Rp
                        </span>
                        <span
                          className="text-[18px] font-medium text-[#ffde7d] leading-[1.2] whitespace-nowrap flex items-center"
                          style={{ fontFamily: 'Nort, sans-serif' }}
                        >
                          {product.price.toLocaleString('id-ID')}
                        </span>
                      </div>

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
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <ScrollToTopButton />

      {/* Add to Cart Notification Modal */}
      <AddToCartNotification
        isOpen={cartNotification.isOpen}
        productName={cartNotification.productName}
        price={cartNotification.price}
        onClose={() => setCartNotification({ ...cartNotification, isOpen: false })}
        onContinueShopping={() => {
          setCartNotification({ ...cartNotification, isOpen: false });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onViewCart={() => {
          setCartNotification({ ...cartNotification, isOpen: false });
        }}
      />

      {/* Quantity Selector Modal */}
      <QuantitySelectorModal
        isOpen={quantityModalOpen}
        productName={selectedProduct?.name || ''}
        price={selectedProduct?.price || 0}
        onConfirm={handleQuantityConfirm}
        onClose={() => {
          setQuantityModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
}

export default ProductPage;
