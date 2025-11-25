import { useEffect, useState } from 'react';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '@/lib/api';

interface ShippingConfig {
  _id?: string;
  cost: number;
  description: string;
  updatedAt?: string;
}

export function ShippingSettings() {
  const [shippingConfig, setShippingConfig] = useState<ShippingConfig>({
    cost: 0,
    description: 'Gratis'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch current settings
  useEffect(() => {
    fetchShippingConfig();
  }, []);

  const fetchShippingConfig = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/shipping-settings`);
      if (response.data) {
        setShippingConfig(response.data);
      }
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching shipping settings:', error);
      // Default values if not found
      setShippingConfig({
        cost: 0,
        description: 'Gratis'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingConfig(prev => ({
      ...prev,
      [name]: name === 'cost' || name === 'freeShippingMinimum' ? parseInt(value) || 0 : value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setErrorMessage('');
      setSuccessMessage('');

      const response = await axios.post(
        `${API_URL}/admin/shipping-settings`,
        {
          cost: shippingConfig.cost,
          description: shippingConfig.description
        }
      );

      if (response.data.data) {
        setShippingConfig(response.data.data);
      } else if (response.data._id) {
        setShippingConfig(response.data);
      }
      setSuccessMessage('Pengaturan pengiriman berhasil disimpan!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving shipping settings:', error);
      setErrorMessage('Gagal menyimpan pengaturan pengiriman');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b8a9]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pengaturan Pengiriman</h2>
        <p className="text-gray-600">Kelola biaya dan pengaturan pengiriman untuk pelanggan</p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-semibold">Kesalahan</p>
            <p className="text-red-700 text-sm">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-green-800 font-semibold">{successMessage}</p>
        </div>
      )}

      {/* Settings Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        
        {/* Biaya Pengiriman */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Biaya Pengiriman (Rp)
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="cost"
            value={shippingConfig.cost}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none transition"
            placeholder="Contoh: 25000"
            min="0"
            step="1000"
          />
          <p className="text-sm text-gray-500 mt-1">
            Masukkan 0 untuk pengiriman gratis
          </p>
          {shippingConfig.cost > 0 && (
            <p className="text-sm text-[#00b8a9] font-semibold">
              Biaya: Rp {shippingConfig.cost.toLocaleString('id-ID')}
            </p>
          )}
        </div>

        {/* Deskripsi */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Deskripsi Pengiriman
          </label>
          <textarea
            name="description"
            value={shippingConfig.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none transition resize-none"
            placeholder="Contoh: Gratis ongkir, Pengiriman 2-3 hari (opsional)"
            rows={3}
          />
          <p className="text-sm text-gray-500 mt-1">
            Teks ini akan ditampilkan di halaman checkout (bisa dikosongkan)
          </p>
        </div>

        {/* Preview */}
        <div className="mt-8 p-4 bg-[#ffde7d]/20 border border-[#ffde7d] rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Preview Checkout</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Pengiriman</span>
              <span className="font-semibold">
                {shippingConfig.cost === 0 ? 'Gratis' : `Rp ${shippingConfig.cost.toLocaleString('id-ID')}`}
              </span>
            </div>
            {shippingConfig.description && (
              <p className="text-xs text-gray-600 mt-2">
                {shippingConfig.description}
              </p>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#00b8a9] hover:bg-[#009d92] disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
          </button>
        </div>

        {/* Last Updated */}
        {shippingConfig.updatedAt && (
          <p className="text-xs text-gray-500 pt-2">
            Terakhir diperbarui: {new Date(shippingConfig.updatedAt).toLocaleString('id-ID')}
          </p>
        )}
      </div>
    </div>
  );
}

export default ShippingSettings;
