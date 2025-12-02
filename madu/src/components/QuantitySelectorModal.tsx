import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

interface QuantitySelectorModalProps {
  isOpen: boolean;
  productName: string;
  price: number;
  onConfirm: (quantity: number) => void;
  onClose: () => void;
}

export function QuantitySelectorModal({
  isOpen,
  productName,
  price,
  onConfirm,
  onClose,
}: QuantitySelectorModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(quantity);
    setQuantity(1);
    onClose();
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00b8a9] to-[#009d92] px-6 py-4 flex items-center justify-between">
          <h3 className="text-white font-bold text-lg">Pilih Jumlah</h3>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-8">
          {/* Product Info */}
          <div className="mb-8">
            <h4 className="text-gray-800 font-semibold text-lg mb-2">{productName}</h4>
            <p className="text-[#00b8a9] font-bold text-2xl">
              Rp {price.toLocaleString('id-ID')}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="p-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-800 rounded-lg transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>

            <div className="flex-1 text-center">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  if (value > 0) setQuantity(value);
                }}
                className="w-full text-center text-3xl font-bold text-[#00b8a9] bg-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8a9]"
              />
            </div>

            <button
              onClick={handleIncrement}
              className="p-2 bg-[#00b8a9] hover:bg-[#009d92] text-white rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Total */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-gray-600 text-sm mb-1">Total Harga:</p>
            <p className="text-[#00b8a9] font-bold text-2xl">
              Rp {(price * quantity).toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-[#00b8a9] hover:bg-[#009d92] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
