import React, { useState, useEffect, useRef } from 'react';
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
              <CheckCircle className="w-5 h-5 text-white" />
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

export function ArticleForm() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
    backgroundImage: '',
    published: true,
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [successModal, setSuccessModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ''
  });
  const [submitSuccessModal, setSubmitSuccessModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ''
  });
  const [isDragging, setIsDragging] = useState(false);
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
      fetchArticle();
    }
  }, [user, isLoading, navigate, id]);

  const fetchArticle = async () => {
    try {
      setFetching(true);
      const response = await axios.get(`${API_URL}/articles/${id}`);
      if (response.data.success) {
        const article = response.data.article;
        setFormData({
          title: article.title || '',
          description: article.description || '',
          content: article.content || '',
          image: article.image || article.backgroundImage || '',
          backgroundImage: article.backgroundImage || article.image || '',
          published: article.published !== undefined ? article.published : true,
          tags: article.tags ? article.tags.join(', ') : ''
        });
        setImagePreview(article.image || article.backgroundImage || '');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      alert('Gagal memuat artikel');
    } finally {
      setFetching(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      setUploadingImage(true);

      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/articles/upload-image`, formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        const imageUrl = response.data.imageUrl;
        // Set both image and backgroundImage to the same URL (thumbnail otomatis dari gambar artikel)
        setFormData({ ...formData, image: imageUrl, backgroundImage: imageUrl });
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
    setFormData({ ...formData, image: '', backgroundImage: '' });
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
    if (!formData.image) {
      setValidationError({
        isOpen: true,
        title: 'Gambar Artikel Wajib Diisi',
        message: 'Upload gambar artikel Anda untuk memastikan artikel terlihat menarik di halaman depan. Gunakan format JPG, PNG, atau GIF dengan ukuran maksimal 10MB.'
      });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const data = {
        ...formData,
        // Ensure backgroundImage is same as image (thumbnail otomatis)
        backgroundImage: formData.image,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (isEdit) {
        await axios.put(`${API_URL}/articles/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSubmitSuccessModal({ 
          isOpen: true, 
          message: 'Artikel berhasil diupdate!' 
        });
      } else {
        await axios.post(`${API_URL}/articles`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSubmitSuccessModal({ 
          isOpen: true, 
          message: 'Artikel berhasil dibuat!' 
        });
      }

      // Navigate after modal closes
      setTimeout(() => {
        navigate('/admin/articles');
      }, 1500);
    } catch (error: any) {
      console.error('Error saving article:', error);
      alert(error.response?.data?.message || 'Gagal menyimpan artikel');
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00b8a9] via-[#00a298] to-[#009c91] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl" style={{ fontFamily: 'Nort, sans-serif' }}>Loading...</div>
        </div>
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
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#00b8a9] via-[#00a298] to-[#009c91] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-8 animate-slide-in-left" style={{ opacity: 0 }}>
            <Link to="/admin/articles">
              <Button variant="outline" className="bg-white/90 hover:bg-white shadow-md backdrop-blur-sm border-2 border-white/50 h-10 sm:h-11 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ fontFamily: 'Nort, sans-serif' }}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Nort, sans-serif' }}>
              {isEdit ? 'Edit Artikel' : 'Buat Artikel Baru'}
            </h1>
          </div>

          <Card className="p-4 sm:p-6 md:p-8 bg-white/98 backdrop-blur-md rounded-2xl border border-white/40 shadow-[0_20px_60px_rgba(0,184,169,0.15)] hover:shadow-[0_25px_70px_rgba(0,184,169,0.2)] transition-all duration-500 relative overflow-hidden group animate-fade-up" style={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#00b8a9]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="animate-fade-up" style={{ opacity: 0, animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Judul Artikel *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none transition-all duration-300 hover:border-[#00b8a9]/50"
                required
              />
            </div>

            <div className="animate-fade-up" style={{ opacity: 0, animationDelay: '0.2s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deskripsi *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none transition-all duration-300 hover:border-[#00b8a9]/50"
                rows={3}
                required
              />
            </div>

            <div className="animate-fade-up" style={{ opacity: 0, animationDelay: '0.3s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Konten
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none transition-all duration-300 hover:border-[#00b8a9]/50"
                rows={10}
              />
            </div>

            {/* Image for Article (Thumbnail otomatis dari gambar ini) */}
            <div className="animate-fade-up" style={{ opacity: 0, animationDelay: '0.4s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gambar Artikel * (Thumbnail otomatis dari gambar ini)
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Gambar ini akan digunakan untuk thumbnail card dan gambar dalam artikel
              </p>
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative group inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg border-2 border-gray-300 transition-all duration-300 group-hover:border-[#00b8a9] group-hover:shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                      isDragging
                        ? 'border-[#00b8a9] bg-[#00b8a9]/10 scale-105'
                        : 'border-gray-300 hover:border-[#00b8a9] hover:bg-[#00b8a9]/5'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drag and drop gambar di sini</p>
                    <p className="text-xs text-gray-500">atau gunakan tombol di bawah</p>
                  </div>
                )}
                <div className="flex gap-4 flex-col sm:flex-row">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-[#00b8a9]/5 transition-all duration-300 text-center hover:border-[#00b8a9]">
                      {uploadingImage ? (
                        <span className="text-gray-600">Mengupload...</span>
                      ) : (
                        <span className="text-[#00b8a9] font-semibold flex items-center justify-center gap-2">
                          <Upload className="w-4 h-4" />
                          Unggah Gambar
                        </span>
                      )}
                    </div>
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => {
                      const url = e.target.value;
                      setFormData({ ...formData, image: url, backgroundImage: url });
                      setImagePreview(url);
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none transition-all duration-300 hover:border-[#00b8a9]/50"
                    placeholder="Atau masukkan URL gambar"
                  />
                </div>
              </div>
            </div>

            <div className="animate-fade-up" style={{ opacity: 0, animationDelay: '0.5s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags (pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none transition-all duration-300 hover:border-[#00b8a9]/50"
                placeholder="madu, kesehatan, lebah"
              />
            </div>

            <div className="flex items-center gap-2 animate-fade-up" style={{ opacity: 0, animationDelay: '0.6s' }}>
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 text-[#00b8a9] border-gray-300 rounded focus:ring-[#00b8a9] cursor-pointer transition-all duration-300"
              />
              <label htmlFor="published" className="text-sm font-semibold text-gray-700 cursor-pointer">
                Publikasikan artikel
              </label>
            </div>

            <div className="flex gap-4 pt-4 animate-fade-up" style={{ opacity: 0, animationDelay: '0.7s' }}>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#00b8a9] hover:bg-[#009c91] text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Menyimpan...' : isEdit ? 'Update Artikel' : 'Buat Artikel'}
              </Button>
              <Link to="/admin/articles" className="flex-1 sm:flex-none">
                <Button type="button" variant="outline" className="w-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
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


