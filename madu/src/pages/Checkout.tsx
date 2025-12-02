import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import axios from 'axios';
import { API_URL } from '@/lib/api';

interface ShippingConfig {
  _id?: string;
  cost: number;
  description: string;
  updatedAt?: string;
}

interface GeneralSettings {
  whatsappNumber: string;
}

export function Checkout() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [shippingConfig, setShippingConfig] = useState<ShippingConfig>({
    cost: 0,
    description: ''
  });
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    whatsappNumber: '6287888888888'
  });
  const [loadingShipping, setLoadingShipping] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Fetch shipping settings from API
  useEffect(() => {
    const fetchShippingConfig = async () => {
      try {
        setLoadingShipping(true);
        const response = await axios.get(`${API_URL}/admin/shipping-settings`);
        if (response.data) {
          setShippingConfig(response.data);
          // Save to localStorage as backup
          localStorage.setItem('shippingConfig', JSON.stringify(response.data));
        }
      } catch (error) {
        console.error('Error fetching shipping settings:', error);
        // Try to load from localStorage fallback
        const cachedConfig = localStorage.getItem('shippingConfig');
        if (cachedConfig) {
          try {
            setShippingConfig(JSON.parse(cachedConfig));
          } catch (e) {
            console.error('Failed to parse cached shipping config');
          }
        }
      } finally {
        setLoadingShipping(false);
      }
    };

    const fetchGeneralSettings = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/general-settings`);
        if (response.data) {
          setGeneralSettings(response.data);
          // Save to localStorage as backup
          localStorage.setItem('generalSettings', JSON.stringify(response.data));
        }
      } catch (error) {
        console.error('Error fetching general settings:', error);
        // Try to load from localStorage fallback
        const cachedSettings = localStorage.getItem('generalSettings');
        if (cachedSettings) {
          try {
            setGeneralSettings(JSON.parse(cachedSettings));
          } catch (e) {
            console.error('Failed to parse cached general settings');
          }
        }
      }
    };

    fetchShippingConfig();
    fetchGeneralSettings();
  }, []);

  const handleIncrement = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  // Helper function to detect if user is on mobile device
  const isMobileDevice = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // Helper function to detect desktop OS
  const isDesktopOS = (): string => {
    const ua = navigator.userAgent;
    if (ua.indexOf('Win') > -1) return 'windows';
    if (ua.indexOf('Mac') > -1) return 'mac';
    if (ua.indexOf('Linux') > -1) return 'linux';
    return 'other';
  };

  // Handle WhatsApp checkout
  const handleWhatsAppCheckout = async () => {
    try {
      setCheckoutLoading(true);

      // Check if items exist
      if (!items || items.length === 0) {
        alert('Keranjang Anda kosong. Silakan tambahkan produk terlebih dahulu.');
        setCheckoutLoading(false);
        return;
      }
      
      let whatsappNumber = generalSettings.whatsappNumber || '6287888888888';
      
      if (!whatsappNumber) {
        alert('Nomor WhatsApp belum dikonfigurasi. Hubungi admin.');
        return;
      }

      // Remove all non-digit characters
      let phoneNumber = whatsappNumber.replace(/\D/g, '');

      // If phone number starts with 0 (Indonesia format), replace with 62
      if (phoneNumber.startsWith('0')) {
        phoneNumber = '62' + phoneNumber.slice(1);
      }

      // Validate phone number format (should have at least 10 digits after country code)
      if (phoneNumber.length < 10 || !phoneNumber.startsWith('62')) {
        alert('Nomor WhatsApp tidak valid. Gunakan format: 628123456789 atau 0812-3456789');
        return;
      }

      // Build detailed message with product list
      const productList = items.map(item => 
        `• ${item.name} - Rp ${item.price.toLocaleString('id-ID')} x${item.quantity}`
      ).join('\n');
      
      const subtotalAmount = getTotalPrice();
      const shippingAmount = shippingConfig.cost || 0;
      const totalAmount = subtotalAmount + shippingAmount;

      const message = `Halo, saya ingin melakukan pemesanan madu:

PRODUK YANG DIPESAN:
${productList}

RINGKASAN PESANAN:
Subtotal: Rp ${subtotalAmount.toLocaleString('id-ID')}
Pengiriman: Rp ${shippingAmount.toLocaleString('id-ID')}
Total: Rp ${totalAmount.toLocaleString('id-ID')}

Terima kasih!`;
      
      const encodedMessage = encodeURIComponent(message);

      console.log('WhatsApp Debug:', {
        phoneNumber,
        message,
        isMobile: isMobileDevice(),
      });

      // Use wa.me for all platforms - most reliable
      // Opens WhatsApp App on mobile, WhatsApp Web or prompts install on desktop
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      console.log('Final WhatsApp URL:', whatsappUrl);
      console.log('Device:', { isMobile: isMobileDevice(), os: isDesktopOS() });
      
      // Test if URL is valid
      if (!whatsappUrl || whatsappUrl.length === 0) {
        alert('Gagal membuat URL WhatsApp');
        return;
      }

      window.open(whatsappUrl, '_blank');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const subtotal = getTotalPrice();
  const shippingCost: number = shippingConfig.cost || 0;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-gray-200 animate-fade-in">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        .animate-slide-in-up {
          animation: slideInUp 0.3s ease-in-out;
        }
      `}</style>
      <SEO 
        title="Checkout - Madu Margo Lestari"
        description="Lanjutkan pembelian madu alami berkualitas dari Madu Margo Lestari"
        keywords="checkout, beli madu, keranjang belanja"
        url="https://madumargolestari.vercel.app/checkout"
      />

      {/* Header */}
      <div className="bg-[#00b8a9] py-6 md:py-8">
        <div className="w-full px-2 md:px-4">
          <Link to="/product" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity mb-4">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Produk</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white" style={{ fontFamily: 'Nort, sans-serif' }}>
            Keranjang Belanja
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-2 md:px-4 py-12 md:py-16">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg mb-4">Keranjang Anda kosong</p>
            <Link
              to="/product"
              className="inline-block bg-[#00b8a9] hover:bg-[#009d92] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Lanjut Berbelanja
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-in-up">
            {/* Products List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl overflow-hidden border-2 border-gray-300 shadow-md">
                <div className="bg-gray-200 p-6 grid grid-cols-12 gap-4 font-semibold text-gray-700">
                  <div className="col-span-5">Produk</div>
                  <div className="col-span-2">Harga</div>
                  <div className="col-span-3">Jumlah</div>
                  <div className="col-span-2"></div>
                </div>

                {items.map((item) => (
                  <div key={item._id} className="p-6 border-b border-gray-200 grid grid-cols-12 gap-4 items-center hover:bg-gray-100 transition-all duration-200 hover:shadow-sm hover:border-gray-300">
                    {/* Product Name */}
                    <div className="col-span-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg bg-white p-2"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">Stok: Tersedia</p>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2">
                      <p className="font-semibold text-[#00b8a9]">
                        Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg w-fit hover:border-gray-400 transition-all duration-200">
                        <button
                          onClick={() => handleDecrement(item._id, item.quantity)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-gray-100 disabled:text-gray-300 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 font-semibold text-gray-800 min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item._id, item.quantity)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <div className="col-span-2 flex justify-end">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200 transform hover:scale-110"
                        title="Hapus dari keranjang"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-12 text-right font-semibold text-gray-800 pt-4 border-t border-gray-200">
                      Subtotal: Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white rounded-xl p-6 sticky top-8 border-2 border-gray-300 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Nort, sans-serif' }}>
                  Ringkasan Pesanan
                </h3>

                <div className="space-y-4 mb-6 pb-6 border-b-2 border-gray-300">
                  {/* Subtotal */}
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between text-gray-700">
                    <span>Pengiriman</span>
                    {loadingShipping ? (
                      <span className="font-semibold text-gray-400">Loading...</span>
                    ) : (
                      <span className="font-semibold">{shippingCost === 0 ? 'Gratis' : `Rp ${shippingCost.toLocaleString('id-ID')}`}</span>
                    )}
                  </div>
                  {!loadingShipping && shippingConfig.description && (
                    <p className="text-xs text-gray-600 mt-2">{shippingConfig.description}</p>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-[#00b8a9]">
                    Rp {total.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Jangan lupa untuk bagikan lokasi anda:</strong> Setelah membuka WhatsApp, klik tombol attachment (📎) → pilih Lokasi → pilih "Bagikan Lokasi Real-time" atau pin lokasi Anda secara manual.
                  </p>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={handleWhatsAppCheckout}
                  disabled={checkoutLoading}
                  className="w-full bg-[#00b8a9] hover:bg-[#009d92] disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:scale-100 mb-4 disabled:cursor-not-allowed"
                >
                  {checkoutLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Memproses...
                    </span>
                  ) : (
                    'Lanjut ke Pembayaran via WhatsApp'
                  )}
                </button>

                {/* Continue Shopping Button */}
                <Link
                  to="/product"
                  className="block w-full bg-white hover:bg-gray-50 text-[#00b8a9] font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-center border-2 border-[#00b8a9] hover:shadow-lg"
                >
                  Lanjut Berbelanja
                </Link>


              </div>
            </div>
          </div>
        )}
      </div>

      {/* Blank Section for Spacing */}
      <section className="bg-gray-200 py-16 md:py-24">
        <div className="w-full px-2 md:px-4 h-32"></div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Checkout;
