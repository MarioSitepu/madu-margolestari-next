import { useEffect, useState } from 'react';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '@/lib/api';

interface GeneralConfig {
  _id?: string;
  operatingYears: number;
  whatsappNumber?: string;
  updatedAt?: string;
}

export function GeneralSettings() {
  const [generalConfig, setGeneralConfig] = useState<GeneralConfig>({
    operatingYears: 10
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch current settings
  useEffect(() => {
    fetchGeneralConfig();
  }, []);

  const fetchGeneralConfig = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/general-settings`);
      if (response.data) {
        setGeneralConfig(response.data);
      }
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching general settings:', error);
      // Default values if not found
      setGeneralConfig({
        operatingYears: 10
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralConfig(prev => ({
      ...prev,
      [name]: name === 'operatingYears' ? parseInt(value) || 0 : value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setErrorMessage('');
      setSuccessMessage('');

      const token = localStorage.getItem('token');
      
      if (!token) {
        setErrorMessage('Anda harus login terlebih dahulu');
        setSaving(false);
        return;
      }

      // Build the correct endpoint URL
      const endpoint = `${API_URL}/admin/general-settings`;
      console.log('Saving to endpoint:', endpoint);

      const response = await axios.post(
        endpoint,
        {
          operatingYears: generalConfig.operatingYears,
          whatsappNumber: generalConfig.whatsappNumber
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success && response.data.data) {
        setGeneralConfig(response.data.data);
        setSuccessMessage('Pengaturan umum berhasil disimpan!');
      } else if (response.data._id) {
        setGeneralConfig(response.data);
        setSuccessMessage('Pengaturan umum berhasil disimpan!');
      } else {
        setSuccessMessage('Pengaturan umum berhasil disimpan!');
      }
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      console.error('Error saving general settings:', error);
      console.error('Error response:', error.response);
      console.error('Error config:', error.config);
      
      let errorMsg = 'Gagal menyimpan pengaturan umum';
      
      if (error.response) {
        // Server responded with error
        if (error.response.status === 404) {
          errorMsg = `Endpoint tidak ditemukan. Pastikan server berjalan dan VITE_API_URL di-set dengan benar.\n\nURL yang digunakan: ${error.config?.url || 'unknown'}\n\nPastikan endpoint: ${API_URL}/admin/general-settings`;
        } else if (error.response.status === 401) {
          errorMsg = 'Sesi Anda telah berakhir. Silakan login kembali.';
        } else if (error.response.status === 403) {
          errorMsg = 'Akses ditolak. Hanya admin yang dapat mengakses fitur ini.';
        } else {
          errorMsg = error.response.data?.message || error.response.data?.error || `Error ${error.response.status}: ${error.response.statusText}`;
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMsg = `Tidak dapat terhubung ke server. Pastikan backend berjalan dan VITE_API_URL di-set dengan benar.\n\nURL yang digunakan: ${error.config?.url || 'unknown'}\n\nVITE_API_URL seharusnya: ${API_URL}`;
      } else {
        // Error setting up the request
        errorMsg = error.message || 'Terjadi kesalahan saat menyimpan pengaturan';
      }
      
      setErrorMessage(errorMsg);
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pengaturan Umum</h2>
        <p className="text-gray-600">Kelola pengaturan umum website dan statistik perusahaan</p>
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
        
        {/* Tahun Beroperasi */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Tahun Beroperasi
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="operatingYears"
            value={generalConfig.operatingYears}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none transition"
            placeholder="Contoh: 10"
            min="0"
            step="1"
          />
          <p className="text-sm text-gray-500 mt-1">
            Jumlah tahun yang ditampilkan di halaman About (akan ditampilkan sebagai "{generalConfig.operatingYears}+" di statistik)
          </p>
        </div>

        {/* Nomor WhatsApp */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Nomor WhatsApp Penjualan
          </label>
          <input
            type="text"
            name="whatsappNumber"
            value={generalConfig.whatsappNumber || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none transition"
            placeholder="Contoh: 628123456789"
          />
          <p className="text-sm text-gray-500 mt-1">
            Nomor WhatsApp yang akan digunakan untuk checkout (format: kode negara + nomor, contoh: 62 untuk Indonesia)
          </p>
        </div>

        {/* Preview */}
        <div className="mt-8 p-4 bg-[#ffde7d]/20 border border-[#ffde7d] rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Preview Pengaturan</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Tahun Beroperasi</span>
              <span className="font-semibold">{generalConfig.operatingYears}+</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Nomor WhatsApp</span>
              <span className="font-semibold">{generalConfig.whatsappNumber || 'Belum diatur'}</span>
            </div>
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
        {generalConfig.updatedAt && (
          <p className="text-xs text-gray-500 pt-2">
            Terakhir diperbarui: {new Date(generalConfig.updatedAt).toLocaleString('id-ID')}
          </p>
        )}
      </div>
    </div>
  );
}

export default GeneralSettings;
