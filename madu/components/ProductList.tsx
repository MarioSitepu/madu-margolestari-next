import React from 'react';
import { ShoppingCart } from 'lucide-react';
const products = [{
  id: 1,
  name: 'Lebah Cerana',
  description: 'Madu asli dari lebah Cerana yang dibudidayakan dengan sangat hati-hati. Dengan rasa manis yang pas dan tekstur yang kental, madu ini adalah pilihan yang tepat untuk Anda.',
  price: 50000
}, {
  id: 2,
  name: 'Lebah Cerana',
  description: 'Madu asli dari lebah Cerana yang dibudidayakan dengan sangat hati-hati. Dengan rasa manis yang pas dan tekstur yang kental, madu ini adalah pilihan yang tepat untuk Anda.',
  price: 40000
}, {
  id: 3,
  name: 'Lebah Cerana',
  description: 'Madu asli dari lebah Cerana yang dibudidayakan dengan sangat hati-hati. Dengan rasa manis yang pas dan tekstur yang kental, madu ini adalah pilihan yang tepat untuk Anda.',
  price: 64000
}];
export function ProductList() {
  return <section className="w-full bg-[#ffde7d] py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-12">
          Produk{' '}
          <span className="text-[#00b8a9] relative">
            Kami
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#00b8a9]"></span>
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map(product => <div key={product.id} className="bg-[#00b8a9] p-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105">
              <div className="bg-[#ffde7d] rounded-xl p-8 mb-4 flex justify-center items-center min-h-[280px]">
                <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=400&fit=crop" alt={`Marles Honey - ${product.name}`} className="w-full max-w-[180px] h-auto object-contain" />
              </div>
              <h3 className="font-bold text-2xl text-white mb-3">
                {product.name}
              </h3>
              <p className="text-xs text-white mb-4 leading-relaxed">
                {product.description}
              </p>
              <div className="flex justify-between items-center pt-4">
                <span className="font-bold text-xl text-white">
                  Rp {product.price.toLocaleString()}
                </span>
                <button className="bg-white text-[#00b8a9] p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}