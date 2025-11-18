import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { ArrowLeft, Save, Upload, X, Image as ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function ProductForm() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/admin/login');
      return;
    }

    if (isEdit && user?.role === 'admin') {
      fetchProduct();
    }
  }, [user, isLoading, navigate, id]);

  const fetchProduct = async () => {
    try {
      setFetching(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        const product = response.data.product;
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price?.toString() || '',
          imageUrl: product.imageUrl || ''
        });
        setImagePreview(product.imageUrl || '');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Gagal memuat produk');
    } finally {
      setFetching(false);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      setUploadingImage(true);

      const token = localStorage.getItem('token');
      // Don't set Content-Type manually - let axios set it with boundary automatically
      const response = await axios.post(`${API_URL}/products/upload-image`, formDataUpload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        const imageUrl = response.data.imageUrl;
        setFormData({ ...formData, imageUrl });
        setImagePreview(imageUrl);
        alert('Gambar berhasil diupload!');
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert(error.response?.data?.message || 'Gagal mengupload gambar');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar');
        return;
      }
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Ukuran file maksimal 10MB');
        return;
      }
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, imageUrl: '' });
    setImagePreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.price) {
      alert('Nama dan harga produk wajib diisi!');
      return;
    }

    if (!formData.imageUrl) {
      alert('Gambar produk wajib diisi!');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const data = {
        ...formData,
        price: Number(formData.price)
      };

      if (isEdit) {
        await axios.put(`${API_URL}/products/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert('Produk berhasil diupdate');
      } else {
        await axios.post(`${API_URL}/products`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert('Produk berhasil dibuat');
      }
      navigate('/admin/products');
    } catch (error: any) {
      console.error('Error saving product:', error);
      alert(error.response?.data?.message || 'Gagal menyimpan produk');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ffde7d] to-[#00b8a9] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffde7d] to-[#00b8a9] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin/products">
            <Button variant="outline" className="bg-white/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <h1 className="text-4xl font-black text-white">
            {isEdit ? 'Edit Produk' : 'Buat Produk Baru'}
          </h1>
        </div>

        <Card className="p-6 bg-white/95">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Produk <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-[#00b8a9] outline-none"
                placeholder="Contoh: Lebah Cerana Premium"
                required
              />
            </div>

            {/* Product Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deskripsi Produk
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-[#00b8a9] outline-none resize-none"
                rows={4}
                placeholder="Deskripsi singkat tentang produk..."
              />
            </div>

            {/* Product Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Harga <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-[#00b8a9] outline-none"
                placeholder="50000"
                min="0"
                required
              />
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gambar Produk <span className="text-red-500">*</span>
              </label>
              {imagePreview ? (
                <div className="relative mb-4">
                  <div className="w-full max-w-md h-64 bg-[#ffde7d] border border-gray-300 rounded-lg flex items-center justify-center p-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                      style={{ 
                        backgroundColor: 'transparent',
                        imageRendering: 'auto'
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 mb-2">Belum ada gambar</p>
                </div>
              )}
              <div className="flex items-center gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                  disabled={uploadingImage}
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploadingImage}
                  className="bg-white"
                  onClick={() => {
                    if (fileInputRef.current && !uploadingImage) {
                      fileInputRef.current.click();
                    }
                  }}
                >
                  {uploadingImage ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Gambar
                    </>
                  )}
                </Button>
                {imagePreview && (
                  <span className="text-sm text-gray-500">Gambar sudah diupload</span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#00b8a9] hover:bg-[#009c91] text-white"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {isEdit ? 'Update Produk' : 'Simpan Produk'}
                  </>
                )}
              </Button>
              <Link to="/admin/products">
                <Button type="button" variant="outline">
                  Batal
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

