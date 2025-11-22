import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { ArrowLeft, Save, Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/lib/api';

// Success Modal Component
interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

// Validation Error Modal Component
interface ValidationErrorModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const ValidationErrorModal = ({ isOpen, title, message, onClose }: ValidationErrorModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" style={{ opacity: 0, animationDelay: '0s', animation: 'fadeIn 0.2s ease-out forwards' }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in" style={{ opacity: 0, animationDelay: '0s', animation: 'scaleIn 0.2s ease-out forwards' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-700/50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Nort, sans-serif' }}>{title}</h3>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-gray-700 text-center" style={{ fontFamily: 'Nort, sans-serif' }}>
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
          <Button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300"
            style={{ fontFamily: 'Nort, sans-serif' }}
          >
            Mengerti
          </Button>
        </div>
      </div>
    </div>
  );
};

const SuccessModal = ({ message, onClose }: SuccessModalProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 1500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" style={{ opacity: 0, animationDelay: '0s', animation: 'fadeIn 0.2s ease-out forwards' }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in" style={{ opacity: 0, animationDelay: '0s', animation: 'scaleIn 0.2s ease-out forwards' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-700/50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Nort, sans-serif' }}>Berhasil!</h3>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-gray-700 text-center" style={{ fontFamily: 'Nort, sans-serif' }}>
            {message}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-600 animate-shrink"
            style={{
              animation: 'shrink 1.5s linear forwards'
            }}
          ></div>
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

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
  const [isDragging, setIsDragging] = useState(false);
  const [successModal, setSuccessModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ''
  });
  const [submitSuccessModal, setSubmitSuccessModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ''
  });
  const [validationError, setValidationError] = useState<{ isOpen: boolean; title: string; message: string }>({
    isOpen: false,
    title: '',
    message: ''
  });

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
        setSuccessModal({ isOpen: true, message: 'Gambar berhasil diupload!' });
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

  const closeSuccessModal = () => {
    setSuccessModal({ isOpen: false, message: '' });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('Ukuran file maksimal 10MB');
        return;
      }
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.price) {
      setValidationError({
        isOpen: true,
        title: 'Data Tidak Lengkap',
        message: 'Nama dan harga produk wajib diisi untuk melanjutkan. Silakan lengkapi kedua field terlebih dahulu.'
      });
      return;
    }

    if (!formData.imageUrl) {
      setValidationError({
        isOpen: true,
        title: 'Gambar Produk Wajib Diisi',
        message: 'Upload gambar produk Anda untuk memastikan produk terlihat menarik di katalog. Gunakan format JPG, PNG, atau GIF dengan ukuran maksimal 10MB.'
      });
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
        setSubmitSuccessModal({ 
          isOpen: true, 
          message: 'Produk berhasil diupdate!' 
        });
      } else {
        await axios.post(`${API_URL}/products`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSubmitSuccessModal({ 
          isOpen: true, 
          message: 'Produk berhasil dibuat!' 
        });
      }

      // Navigate after modal closes
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
    } catch (error: any) {
      console.error('Error saving product:', error);
      alert(error.response?.data?.message || 'Gagal menyimpan produk');
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ffde7d] to-[#00b8a9] flex items-center justify-center">
        <div className="text-white text-xl" style={{ fontFamily: 'Nort, sans-serif' }}>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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
        .animate-fade-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slideInFromLeft 0.5s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#ffde7d] via-[#f9e4a3] to-[#f4d58d] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-8 animate-slide-in-left" style={{ opacity: 0 }}>
          <Link to="/admin/products">
            <Button variant="outline" className="bg-white/90 hover:bg-white shadow-md backdrop-blur-sm border-2 border-white/50" style={{ fontFamily: 'Nort, sans-serif' }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <h1 className="text-4xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Nort, sans-serif' }}>
            {isEdit ? 'Edit Produk' : 'Buat Produk Baru'}
          </h1>
        </div>

        <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-white/50 shadow-2xl animate-fade-up" style={{ opacity: 0, animationDelay: '0.2s' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div className="animate-fade-up" style={{ opacity: 0, animationDelay: '0.3s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Produk <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-[#00b8a9] outline-none transition-all duration-300 hover:border-[#00b8a9]/50"
                placeholder="Contoh: Lebah Cerana Premium"
                required
              />
            </div>

            {/* Product Description */}
            <div className="animate-fade-up" style={{ opacity: 0, animationDelay: '0.4s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deskripsi Produk
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-[#00b8a9] outline-none resize-none transition-all duration-300 hover:border-[#00b8a9]/50"
                rows={4}
                placeholder="Deskripsi singkat tentang produk..."
              />
            </div>

            {/* Product Price */}
            <div className="animate-fade-up" style={{ opacity: 0, animationDelay: '0.5s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Harga <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-[#00b8a9] outline-none transition-all duration-300 hover:border-[#00b8a9]/50"
                placeholder="50000"
                min="0"
                required
              />
            </div>

            {/* Product Image */}
            <div className="animate-fade-up" style={{ opacity: 0, animationDelay: '0.6s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gambar Produk <span className="text-red-500">*</span>
              </label>
              {imagePreview ? (
                <div className="relative mb-4 inline-block">
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
                    className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 transition-all duration-300 ${
                    isDragging
                      ? 'border-[#ffde7d] bg-[#ffde7d]/10 scale-105'
                      : 'border-gray-300 hover:border-[#ffde7d] hover:bg-[#ffde7d]/5'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 mb-2">Drag and drop gambar di sini</p>
                  <p className="text-xs text-gray-400">atau klik tombol di bawah</p>
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
            <div className="flex gap-4 animate-fade-up" style={{ opacity: 0, animationDelay: '0.7s' }}>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#00b8a9] hover:bg-[#009c91] text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:opacity-70"
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
                <Button type="button" variant="outline" className="transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  Batal
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
      </div>

      {/* Success Modal */}
      {successModal.isOpen && (
        <SuccessModal
          message={successModal.message}
          onClose={closeSuccessModal}
        />
      )}

      {/* Submit Success Modal */}
      {submitSuccessModal.isOpen && (
        <SuccessModal
          message={submitSuccessModal.message}
          onClose={() => setSubmitSuccessModal({ isOpen: false, message: '' })}
        />
      )}

      {/* Validation Error Modal */}
      <ValidationErrorModal
        isOpen={validationError.isOpen}
        title={validationError.title}
        message={validationError.message}
        onClose={() => setValidationError({ isOpen: false, title: '', message: '' })}
      />
    </>
  );
}

