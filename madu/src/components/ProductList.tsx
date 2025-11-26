import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import productBottleCard from "@/assets/product-bottle-card.png";
import axios from "axios";
import { API_URL } from '@/lib/api';

export interface ProductItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export function ProductList() {
  const [products, setProducts] = useState<ProductItem[]>([]);
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

  const handleProductBuy = (product: ProductItem) => {
    alert(`${product.name} - Rp ${product.price.toLocaleString('id-ID')} ditambahkan ke keranjang!`);
  };

  return (
    <section className="w-full bg-[#ffde7d] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-[32px] md:text-[48px] font-extrabold text-black leading-[1.342] mb-2"
            style={{ fontFamily: 'Nort, sans-serif' }}
          >
            Produk{" "}
            <span className="text-[#00b8a9] relative inline-block">
              Kami
              <span className="absolute bottom-0 left-0 w-full h-2.5 bg-black"></span>
            </span>
          </h2>
        </div>

        {loading ?
        (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b8a9]"></div>
            <p className="mt-4 text-gray-700">Memuat produk...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-700 text-lg">Belum ada produk tersedia</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-[1291px] mx-auto">
            {products.map((product) => {
              const nameParts = product.name.split(' ');
              const firstWord = nameParts[0];
              const restOfName = nameParts.slice(1).join(' ');
              
              return (
              <div
                key={product._id}
                className="relative w-full max-w-[382px] h-[587px] bg-[#00b8a9] rounded-sm overflow-hidden mx-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer"
                style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)' }}
              >
                {/* Product Image - DIPERBESAR */}
                {/* Lebar ditambah jadi w-[260px] dan posisi dinaikkan sedikit */}
                <div className="absolute top-[20px] left-0 right-0 mx-auto w-[260px] h-[400px] flex justify-center items-center transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={product.imageUrl || productBottleCard}
                    alt={`Botol Madu ${product.name}`}
                    className="w-full h-full object-contain drop-shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = productBottleCard;
                    }}
                  />
                </div>

                <div className="absolute top-[421px] left-6 right-6 h-8 flex items-center justify-start z-10">
                  <h3 className="text-[24px] font-medium text-[#ffde7d] leading-[1.342] text-left whitespace-nowrap" style={{ fontFamily: 'Nort, sans-serif' }}>
                    <span className="underline decoration-2 underline-offset-2">{firstWord}</span>
                    {restOfName && ` ${restOfName}`}
                  </h3>
                </div>

                <div className="absolute top-[457px] left-6 right-6 h-[76px] z-10">
                  <p className="text-[12px] font-normal text-black leading-[1.342] line-clamp-3" style={{ fontFamily: 'Nort, sans-serif' }}>
                    {product.description}
                  </p>
                </div>

                {/* Price and Cart */}
                <div className="absolute top-[533px] left-6 right-6 h-8 flex items-center justify-between z-10">
                  <div className="flex items-center gap-1 h-full">
                    <span className="text-[15px] font-medium text-black leading-[1.342] flex items-center" style={{ fontFamily: 'Nort, sans-serif' }}>Rp</span>
                    <span className="text-[24px] font-medium text-[#ffde7d] leading-[1.342] flex items-center" style={{ fontFamily: 'Nort, sans-serif' }}>
                      {product.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductBuy(product);
                    }}
                    className="bg-white text-[#00b8a9] rounded-xl hover:bg-gray-50 hover:scale-110 active:scale-95 transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center w-12 h-12 shrink-0"
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
  );
}
