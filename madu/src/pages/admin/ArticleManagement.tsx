import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { Plus, Edit, Trash2, ArrowLeft, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/lib/api';

interface Article {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  backgroundImage: string;
  published: boolean;
  views: number;
  createdAt: string;
  authorName: string;
}

export function ArticleManagement() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; articleId: string | null; articleTitle: string }>({
    isOpen: false,
    articleId: null,
    articleTitle: ''
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/admin/login');
      return;
    }

    if (user?.role === 'admin') {
      fetchArticles();
    }
  }, [user, isLoading, navigate]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/articles/all`);
      if (response.data.success) {
        setArticles(response.data.articles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (articleId: string, articleTitle: string) => {
    setDeleteModal({
      isOpen: true,
      articleId,
      articleTitle
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      articleId: null,
      articleTitle: ''
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.articleId) return;

    try {
      setDeleting(true);
      await axios.delete(`${API_URL}/articles/${deleteModal.articleId}`);
      setArticles(articles.filter(a => a._id !== deleteModal.articleId));
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Gagal menghapus artikel');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00b8a9] via-[#00a298] to-[#009c91] flex items-center justify-center">
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
        .animate-fade-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slideInFromLeft 0.5s ease-out forwards;
        }
      `}</style>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#00b8a9] via-[#00a298] to-[#009c91] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8 animate-slide-in-left" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <Link to="/dashboard">
              <Button variant="outline" className="bg-white/90 hover:bg-white shadow-md backdrop-blur-sm border-2 border-white/50 h-10 sm:h-11 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ fontFamily: 'Nort, sans-serif' }}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Kembali</span>
              </Button>
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Nort, sans-serif' }}>Kelola Artikel</h1>
          </div>
          <Link to="/admin/articles/new" className="w-full sm:w-auto animate-fade-up" style={{ opacity: 0, animationDelay: '0.2s' }}>
            <Button className="w-full sm:w-auto bg-[#ffde7d] hover:bg-[#f4d58d] text-gray-900 shadow-md hover:shadow-lg transition-all duration-300 font-semibold h-10 sm:h-11 hover:-translate-y-1" style={{ fontFamily: 'Nort, sans-serif' }}>
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Buat Artikel Baru</span>
              <span className="sm:hidden">Artikel Baru</span>
            </Button>
          </Link>
        </div>

        <Card className="p-4 sm:p-6 md:p-8 bg-white/98 backdrop-blur-md rounded-2xl border border-white/40 shadow-[0_20px_60px_rgba(0,184,169,0.15)] hover:shadow-[0_25px_70px_rgba(0,184,169,0.2)] transition-all duration-500 relative overflow-hidden group animate-fade-up" style={{ opacity: 0, animationDelay: '0.3s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#00b8a9]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          {articles.length === 0 ? (
            <div className="text-center py-12 relative z-10">
              <p className="text-gray-500 mb-4 text-lg">Belum ada artikel</p>
              <Link to="/admin/articles/new">
                <Button className="bg-[#00b8a9] hover:bg-[#009c91] text-white font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Artikel Pertama
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4 relative z-10">
              {articles.map((article, index) => (
                <div key={article._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200/50 rounded-lg hover:bg-white/80 hover:shadow-md transition-all duration-300 bg-white/60 backdrop-blur-sm animate-fade-up" style={{ opacity: 0, animationDelay: `${0.4 + index * 0.1}s` }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 break-words" style={{ fontFamily: 'Nort, sans-serif' }}>{article.title}</h3>
                      {!article.published && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded whitespace-nowrap">Draft</span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">{article.description}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500">
                      <span>Oleh: {article.authorName}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{article.views} views</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{new Date(article.createdAt).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Link to={`/admin/articles/${article._id}/edit`} className="flex-1 sm:flex-none">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                        <Edit className="w-4 h-4" />
                        <span className="sm:hidden ml-2">Edit</span>
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openDeleteModal(article._id, article.title)}
                      className="text-red-600 hover:text-red-700 flex-1 sm:flex-none w-full sm:w-auto transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sm:hidden ml-2">Hapus</span>
                    </Button>
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
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Nort, sans-serif' }}>Hapus Artikel</h3>
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
                Apakah Anda yakin ingin menghapus artikel berikut?
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-6 border-l-4 border-red-500">
                <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Nort, sans-serif' }}>Judul Artikel:</p>
                <p className="font-semibold text-gray-900 break-words line-clamp-2" style={{ fontFamily: 'Nort, sans-serif' }}>
                  {deleteModal.articleTitle}
                </p>
              </div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Nort, sans-serif' }}>
                ⚠️ Tindakan ini tidak dapat dibatalkan. Artikel akan dihapus secara permanen.
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
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Menghapus...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Hapus Sekarang
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <style>{`
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
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}





