import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { Trash2, Upload, X, Image as ImageIcon, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import honeyBg from "@/assets/honey-bg-6badc9.png";
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

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus gambar galeri ini?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGalleries(galleries.filter(g => g._id !== id));
      alert('Gambar galeri berhasil dihapus');
    } catch (error) {
      console.error('Error deleting gallery:', error);
      alert('Gagal menghapus gambar galeri');
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
      <div className="min-h-screen bg-gradient-to-br from-[#ffde7d] to-[#00b8a9] flex items-center justify-center">
        <div className="text-white text-xl" style={{ fontFamily: 'Nort, sans-serif' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#ffde7d] to-[#00b8a9] py-8 px-4">
      {/* Background Honey Image */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <img 
          src={honeyBg} 
          alt="Honey background" 
          className="w-full h-full object-cover"
          style={{ transform: 'scale(1.1)' }}
        />
      </div>
      
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" className="bg-white/90 hover:bg-white shadow-md backdrop-blur-sm border-2 border-white/50" style={{ fontFamily: 'Nort, sans-serif' }}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <h1 className="text-4xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Nort, sans-serif' }}>Kelola Galeri</h1>
          </div>
        </div>

        {/* Upload Section */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-white/50 shadow-2xl mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Nort, sans-serif' }}>
            Upload Gambar Galeri
          </h2>
          <div className="space-y-4">
            {imagePreview && !uploadingImage && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
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
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b8a9] mb-4"></div>
                <p className="text-gray-600">Mengupload gambar...</p>
              </div>
            )}
            {!imagePreview && !uploadingImage && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
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
              <div className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-center bg-[#00b8a9] text-white hover:bg-[#009c91]">
                <span className="font-semibold flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  {uploadingImage ? 'Mengupload...' : 'Unggah Gambar'}
                </span>
              </div>
            </label>
            <p className="text-sm text-gray-500 text-center">
              Nama gambar akan otomatis dibuat sesuai urutan (Gambar 1, Gambar 2, dst.)
            </p>
          </div>
        </Card>

        {/* Gallery List */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-white/50 shadow-2xl">
          {galleries.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Belum ada gambar galeri</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((gallery) => (
                <div
                  key={gallery._id}
                  className="border-2 border-gray-200/50 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105"
                >
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
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1" style={{ fontFamily: 'Nort, sans-serif' }}>
                      {gallery.title}
                    </h3>
                    {gallery.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {gallery.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Urutan: {gallery.order}</span>
                      <span>
                        {new Date(gallery.createdAt).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePublished(gallery._id, gallery.published)}
                        className={gallery.published ? 'text-green-600' : 'text-gray-600'}
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
                        onClick={() => handleDelete(gallery._id)}
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Hapus
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
  );
}

