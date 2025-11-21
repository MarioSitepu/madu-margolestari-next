import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { ArrowLeft, Save, Upload, X, Image as ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import honeyBg from "@/assets/honey-bg-6badc9.png";
import { API_URL } from '@/lib/api';

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
    setFormData({ ...formData, image: '', backgroundImage: '' });
    setImagePreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.image) {
      alert('Gambar artikel wajib diisi!');
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
        alert('Artikel berhasil diupdate');
      } else {
        await axios.post(`${API_URL}/articles`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert('Artikel berhasil dibuat');
      }
      navigate('/admin/articles');
    } catch (error: any) {
      console.error('Error saving article:', error);
      alert(error.response?.data?.message || 'Gagal menyimpan artikel');
    } finally {
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

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin/articles">
            <Button variant="outline" className="bg-white/90 hover:bg-white shadow-md backdrop-blur-sm border-2 border-white/50" style={{ fontFamily: 'Nort, sans-serif' }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <h1 className="text-4xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Nort, sans-serif' }}>
            {isEdit ? 'Edit Artikel' : 'Buat Artikel Baru'}
          </h1>
        </div>

        <Card className="p-8 bg-white/95 backdrop-blur-sm border-2 border-white/50 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Judul Artikel *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deskripsi *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Konten
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none"
                rows={10}
              />
            </div>

            {/* Image for Article (Thumbnail otomatis dari gambar ini) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gambar Artikel * (Thumbnail otomatis dari gambar ini)
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Gambar ini akan digunakan untuk thumbnail card dan gambar dalam artikel
              </p>
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Belum ada gambar</p>
                  </div>
                )}
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-center">
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
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none"
                    placeholder="Atau masukkan URL gambar"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags (pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none"
                placeholder="madu, kesehatan, lebah"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 text-[#00b8a9] border-gray-300 rounded focus:ring-[#00b8a9]"
              />
              <label htmlFor="published" className="text-sm font-semibold text-gray-700">
                Publikasikan artikel
              </label>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#00b8a9] hover:bg-[#009c91] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Menyimpan...' : isEdit ? 'Update Artikel' : 'Buat Artikel'}
              </Button>
              <Link to="/admin/articles">
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


