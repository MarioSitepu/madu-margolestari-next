import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { ArrowLeft, Trash2, X, Star, Eye, EyeOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/lib/api';

interface Review {
  _id: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  userName: string;
  rating: number;
  comment: string;
  isFeatured: boolean;
  createdAt: string;
}

export function ReviewManagement() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; reviewId: string | null; productName: string }>({
    isOpen: false,
    reviewId: null,
    productName: ''
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/login');
      return;
    }

    if (user?.role === 'admin') {
      fetchReviews();
    }
  }, [user, isLoading, navigate]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/products/reviews/all/list`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (reviewId: string, productName: string) => {
    setDeleteModal({
      isOpen: true,
      reviewId,
      productName
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      reviewId: null,
      productName: ''
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.reviewId) return;

    try {
      setDeleting(true);
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/products/admin/reviews/${deleteModal.reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReviews(reviews.filter(r => r._id !== deleteModal.reviewId));
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Gagal menghapus ulasan');
    } finally {
      setDeleting(false);
    }
  };

  const toggleFeatured = async (reviewId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      const review = reviews.find(r => r._id === reviewId);
      
      // Check if trying to feature and already have 3 featured
      if (!review?.isFeatured) {
        const featuredCount = reviews.filter(r => r.isFeatured).length;
        if (featuredCount >= 3) {
          alert('Maksimal 3 ulasan yang dapat ditampilkan. Silakan hapus ulasan yang sudah ditampilkan terlebih dahulu.');
          return;
        }
      }
      
      const response = await axios.patch(
        `${API_URL}/products/admin/reviews/${reviewId}/featured`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setReviews(reviews.map(r =>
          r._id === reviewId ? { ...r, isFeatured: response.data.review.isFeatured } : r
        ));
      } else {
        alert('Gagal: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error: any) {
      console.error('Error:', error);
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
        navigate('/login');
      } else if (error.response?.status === 403) {
        alert('Unauthorized. Admin access required.');
      } else {
        alert('Network error: ' + (error.response?.data?.message || error.message || 'Failed to update'));
      }
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={18}
            fill={i < Math.floor(rating) ? '#ffde7d' : i === Math.floor(rating) && rating % 1 !== 0 ? '#ffde7d' : 'none'}
            stroke={i < rating ? '#ffde7d' : '#d1d5db'}
            className={i < rating ? '' : 'opacity-40'}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ffde7d] to-[#f4d58d] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-gray-900 text-xl font-semibold" style={{ fontFamily: 'Nort, sans-serif' }}>Loading...</div>
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
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#ffde7d] via-[#f9e4a3] to-[#f4d58d] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Nort, sans-serif' }}>Kelola Ulasan</h1>
            </div>
          </div>

          <Card className="p-4 sm:p-6 md:p-8 bg-white/98 backdrop-blur-md rounded-2xl border border-white/40 shadow-[0_20px_60px_rgba(255,222,125,0.15)] hover:shadow-[0_25px_70px_rgba(255,222,125,0.2)] transition-all duration-500 relative overflow-hidden group animate-fade-up" style={{ opacity: 0, animationDelay: '0.3s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffde7d]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            {reviews.length === 0 ? (
              <div className="text-center py-12 relative z-10">
                <p className="text-gray-500 mb-4 text-lg">Belum ada ulasan</p>
              </div>
            ) : (
              <div className="relative z-10 space-y-4">
                <p className="text-gray-600 font-medium mb-6" style={{ fontFamily: 'Nort, sans-serif' }}>
                  Total Ulasan: <strong>{reviews.length}</strong>
                </p>
                
                {reviews.map((review, index) => (
                  <Card
                    key={review._id}
                    className="p-4 md:p-6 bg-white border border-gray-200 hover:border-[#ffde7d]/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden animate-fade-up"
                    style={{ opacity: 0, animationDelay: `${0.4 + index * 0.05}s` }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                      {/* Product Image */}
                      <div className="md:col-span-2">
                        {review.productId?.imageUrl ? (
                          <img
                            src={review.productId.imageUrl}
                            alt={review.productId?.name}
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                        ) : (
                          <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Image</span>
                          </div>
                        )}
                      </div>

                      {/* Review Content */}
                      <div className="md:col-span-8 space-y-2">
                        <div>
                          <p className="text-sm text-gray-600" style={{ fontFamily: 'Nort, sans-serif' }}>
                            Produk:
                          </p>
                          <p className="font-bold text-gray-900" style={{ fontFamily: 'Nort, sans-serif' }}>
                            {review.productId?.name || 'Produk tidak tersedia'}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Nort, sans-serif' }}>
                            Rating:
                          </p>
                          <div className="flex items-center gap-2">
                            {renderStars(review.rating)}
                            <span className="text-sm font-semibold text-gray-700">
                              {review.rating.toFixed(1)}/5
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Nort, sans-serif' }}>
                            Reviewer:
                          </p>
                          <p className="text-gray-800">{review.userName}</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Nort, sans-serif' }}>
                            Komentar:
                          </p>
                          <p className="text-gray-700 italic line-clamp-2">"{review.comment}"</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Featured & Delete Buttons */}
                      <div className="md:col-span-2 flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          className={`${review.isFeatured ? 'text-[#ffde7d] bg-[#ffde7d]/10 hover:bg-[#ffde7d]/20' : 'text-gray-600 hover:text-[#ffde7d] hover:bg-[#ffde7d]/10'} transition-colors`}
                          onClick={() => toggleFeatured(review._id)}
                          title={review.isFeatured ? 'Sembunyikan dari halaman About' : 'Tampilkan di halaman About'}
                        >
                          {review.isFeatured ? (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              Featured
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-4 h-4 mr-2" />
                              Featured
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => openDeleteModal(review._id, review.productId?.name || 'Produk')}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </Card>
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
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Nort, sans-serif' }}>Hapus Ulasan</h3>
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
                Apakah Anda yakin ingin menghapus ulasan ini?
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-6 border-l-4 border-red-500">
                <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Nort, sans-serif' }}>Produk:</p>
                <p className="font-semibold text-gray-900 break-words line-clamp-2" style={{ fontFamily: 'Nort, sans-serif' }}>
                  {deleteModal.productName}
                </p>
              </div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Nort, sans-serif' }}>
                ⚠️ Tindakan ini tidak dapat dibatalkan. Ulasan akan dihapus secara permanen.
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

export default ReviewManagement;
