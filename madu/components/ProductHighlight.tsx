import React from 'react';
import { ShoppingCart } from 'lucide-react';
export function ProductHighlight() {
  return <section className="w-full bg-[#00b8a9] py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div className="md:w-2/5 flex justify-center">
          <div className="bg-[#ffde7d] p-6 rounded-2xl max-w-sm w-full shadow-2xl">
            <div className="bg-[#00b8a9] rounded-xl p-8 mb-4 flex justify-center items-center min-h-[280px]">
              <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=400&fit=crop" alt="Marles Honey bottle" className="w-full max-w-[180px] h-auto object-contain" />
            </div>
            <div className="pt-2">
              <h3 className="font-bold text-2xl mb-3 text-black">
                Lebah Cerana
              </h3>
              <p className="text-xs mb-4 text-gray-800 leading-relaxed">
                Madu asli dari lebah Cerana yang dibudidayakan dengan sangat
                hati-hati. Dengan rasa manis yang pas dan tekstur yang kental,
                madu ini adalah pilihan yang tepat untuk Anda.
              </p>
              <div className="flex justify-between items-center pt-4">
                <span className="font-bold text-xl text-black">Rp 50.000</span>
                <button className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-3/5 text-white">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Produk Paling
            <br />
            Banyak Terjual
          </h2>
          <p className="mb-8 text-sm md:text-base leading-relaxed max-w-xl">
            Madu Marles Premium telah menjadi pilihan favorit para pelanggan
            kami. Madu mentah asli yang dapat dikonsumsi langsung atau sebagai
            tambahan untuk minuman dan makanan. Madu ini telah diproses dengan
            hati-hati untuk memastikan keaslian dan kemurniannya tetap terjaga.
            Rasakan manisnya yang alami dan nikmati manfaat kesehatannya.
          </p>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=700&h=500&fit=crop" alt="Madu dengan sarang lebah" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>;
}