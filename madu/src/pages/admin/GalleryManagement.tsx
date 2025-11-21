import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { Trash2, Upload, X, Image as ImageIcon, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { API_URL } from '@/lib/api';

interface Gallery {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  published: boolean;
  createdAt: string;
}

export function GalleryManagement() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; galleryId: string | null; galleryTitle: string }>({
    isOpen: false,
    galleryId: null,
    galleryTitle: ''
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/admin/login');
      return;
    }

    if (user?.role === 'admin') {
      fetchGalleries();
    }
  }, [user, isLoading, navigate]);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/gallery/all`);
      if (response.data.success) {
        setGalleries(response.data.galleries);
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      setUploadingImage(true);

      const token = localStorage.getItem('token');
      
      // Upload image first
      const uploadResponse = await axios.post(`${API_URL}/gallery/upload-image`, formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (uploadResponse.data.success) {
        const imageUrl = uploadResponse.data.imageUrl;
        
        // Auto-generate title based on number of existing galleries
        const nextOrder = galleries.length;
        const title = `Gambar ${nextOrder + 1}`;
        
        // Create gallery entry with auto-generated title
        const createResponse = await axios.post(
          `${API_URL}/gallery`,
          {
            title: title,
            description: '',
            imageUrl: imageUrl,
            order: nextOrder,
            published: true
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (createResponse.data.success) {
          alert('Gambar berhasil ditambahkan!');
          setImagePreview('');
          fetchGalleries();
        }
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
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('Ukuran file maksimal 10MB');
        return;
      }
      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      // Upload immediately
      handleImageUpload(file);
    }
  };

  const openDeleteModal = (galleryId: string, galleryTitle: string) => {
    setDeleteModal({
      isOpen: true,
      galleryId,
      galleryTitle
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      galleryId: null,
      galleryTitle: ''
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.galleryId) return;

    try {
      setDeleting(true);
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/gallery/${deleteModal.galleryId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGalleries(galleries.filter(g => g._id !== deleteModal.galleryId));
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting gallery:', error);
      alert('Gagal menghapus gambar galeri');
    } finally {
      setDeleting(false);
    }
  };


  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_URL}/gallery/${id}`,
        { published: !currentStatus },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setGalleries(
        galleries.map(g => (g._id === id ? { ...g, published: !currentStatus } : g))
      );
    } catch (error) {
      console.error('Error toggling published status:', error);
      alert('Gagal mengubah status publikasi');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#b8860b] to-[#9a6f09] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl font-semibold" style={{ fontFamily: 'Nort, sans-serif' }}>Loading...</div>
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
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#b8860b] via-[#a0761d] to-[#9a6f09] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8 animate-slide-in-left" style={{ opacity: 0 }}>
          <Link to="/dashboard">
            <Button variant="outline" className="bg-white/90 hover:bg-white shadow-md backdrop-blur-sm border-2 border-white/50 h-10 sm:h-11 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ fontFamily: 'Nort, sans-serif' }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Kembali</span>
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Nort, sans-serif' }}>Kelola Galeri</h1>
        </div>

        {/* Upload Section */}
        <Card className="p-4 sm:p-6 md:p-8 bg-white/98 backdrop-blur-md rounded-2xl border border-white/40 shadow-[0_20px_60px_rgba(184,134,11,0.15)] hover:shadow-[0_25px_70px_rgba(184,134,11,0.2)] transition-all duration-500 relative overflow-hidden group mb-6 sm:mb-8 animate-fade-up" style={{ opacity: 0, animationDelay: '0.3s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#b8860b]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 relative z-10" style={{ fontFamily: 'Nort, sans-serif' }}>
            Upload Gambar Galeri
          </h2>
          <div className="space-y-4 relative z-10">
            {imagePreview && !uploadingImage && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 sm:h-64 object-cover rounded-lg border-2 border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setImagePreview('')}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {uploadingImage && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8860b] mb-4"></div>
                <p className="text-gray-600">Mengupload gambar...</p>
              </div>
            )}
            {!imagePreview && !uploadingImage && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Pilih gambar untuk diupload</p>
              </div>
            )}
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
                disabled={uploadingImage}
              />
              <div className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-opacity-90 transition text-center bg-[#b8860b] text-white hover:bg-[#9a6f09] font-semibold">
                <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Upload className="w-4 h-4" />
                  {uploadingImage ? 'Mengupload...' : 'Unggah Gambar'}
                </span>
              </div>
            </label>
            <p className="text-xs sm:text-sm text-gray-500 text-center">
              Nama gambar akan otomatis dibuat sesuai urutan (Gambar 1, Gambar 2, dst.)
            </p>
          </div>
        </Card>

        {/* Gallery List */}
        <Card className="p-4 sm:p-6 md:p-8 bg-white/98 backdrop-blur-md rounded-2xl border border-white/40 shadow-[0_20px_60px_rgba(184,134,11,0.15)] hover:shadow-[0_25px_70px_rgba(184,134,11,0.2)] transition-all duration-500 relative overflow-hidden group animate-fade-up" style={{ opacity: 0, animationDelay: '0.4s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#b8860b]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          {galleries.length === 0 ? (
            <div className="text-center py-12 relative z-10">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Belum ada gambar galeri</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10">
              {galleries.map((gallery, index) => (
                <div
                  key={gallery._id}
                  className="border border-gray-200/50 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105 relative overflow-hidden group animate-fade-up"
                  style={{ opacity: 0, animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#b8860b]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="relative">
                    <img
                      src={gallery.imageUrl}
                      alt={gallery.title}
                      className="w-full h-48 object-cover"
                    />
                    {!gallery.published && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Draft
                      </div>
                    )}
                  </div>
                  <div className="p-4 relative z-10">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-1 truncate" style={{ fontFamily: 'Nort, sans-serif' }}>
                      {gallery.title}
                    </h3>
                    {gallery.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {gallery.description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 mb-4 gap-2">
                      <span>Urutan: {gallery.order}</span>
                      <span className="whitespace-nowrap">
                        {new Date(gallery.createdAt).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePublished(gallery._id, gallery.published)}
                        className={`flex-1 ${gallery.published ? 'text-green-600' : 'text-gray-600'}`}
                      >
                        {gallery.published ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDeleteModal(gallery._id, gallery.title)}
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Hapus</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" style={{ opacity: 0, animationDelay: '0s' }}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in" style={{ opacity: 0, animationDelay: '0.1s' }}>
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-700/50 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Nort, sans-serif' }}>Hapus Galeri</h3>
              </div>
              <button
                onClick={closeDeleteModal}
                disabled={deleting}
                className="text-white hover:bg-red-700/50 p-1 rounded transition-all duration-200 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              <p className="text-gray-700 mb-4" style={{ fontFamily: 'Nort, sans-serif' }}>
                Apakah Anda yakin ingin menghapus gambar galeri berikut?
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-6 border-l-4 border-red-500">
                <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Nort, sans-serif' }}>Judul Gambar:</p>
                <p className="font-semibold text-gray-900 break-words line-clamp-2" style={{ fontFamily: 'Nort, sans-serif' }}>
                  {deleteModal.galleryTitle}
                </p>
              </div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Nort, sans-serif' }}>
                ⚠️ Tindakan ini tidak dapat dibatalkan. Gambar akan dihapus secara permanen.
              </p>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-200">
              <Button
                onClick={closeDeleteModal}
                disabled={deleting}
                variant="outline"
                className="transition-all duration-300 disabled:opacity-50"
              >
                Batal
              </Button>
              <Button
                onClick={confirmDelete}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Menghapus...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Hapus
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

