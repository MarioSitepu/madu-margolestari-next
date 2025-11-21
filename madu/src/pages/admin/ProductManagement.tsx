import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { Plus, Edit, Trash2, ArrowLeft, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { API_URL } from '@/lib/api';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
}

export function ProductManagement() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; productId: string | null; productName: string }>({
    isOpen: false,
    productId: null,
    productName: ''
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/admin/login');
      return;
    }

    if (user?.role === 'admin') {
      fetchProducts();
    }
  }, [user, isLoading, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/products/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (productId: string, productName: string) => {
    setDeleteModal({
      isOpen: true,
      productId,
      productName
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      productId: null,
      productName: ''
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.productId) return;

    try {
      setDeleting(true);
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/products/${deleteModal.productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(products.filter(p => p._id !== deleteModal.productId));
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Gagal menghapus produk');
    } finally {
      setDeleting(false);
    }
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Nort, sans-serif' }}>Kelola Produk</h1>
          </div>
          <Link to="/admin/products/new" className="w-full sm:w-auto animate-fade-up" style={{ opacity: 0, animationDelay: '0.2s' }}>
            <Button className="w-full sm:w-auto bg-[#ffde7d] hover:bg-[#f4d58d] text-gray-900 shadow-md hover:shadow-lg transition-all duration-300 font-semibold h-10 sm:h-11 hover:-translate-y-1" style={{ fontFamily: 'Nort, sans-serif' }}>
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Buat Produk Baru</span>
              <span className="sm:hidden">Produk Baru</span>
            </Button>
          </Link>
        </div>

        <Card className="p-4 sm:p-6 md:p-8 bg-white/98 backdrop-blur-md rounded-2xl border border-white/40 shadow-[0_20px_60px_rgba(255,222,125,0.15)] hover:shadow-[0_25px_70px_rgba(255,222,125,0.2)] transition-all duration-500 relative overflow-hidden group animate-fade-up" style={{ opacity: 0, animationDelay: '0.3s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#ffde7d]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          {products.length === 0 ? (
            <div className="text-center py-12 relative z-10">
              <p className="text-gray-500 mb-4 text-lg">Belum ada produk</p>
              <Link to="/admin/products/new">
                <Button className="bg-[#ffde7d] hover:bg-[#f4d58d] text-gray-900 font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Produk Pertama
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10">
              {products.map((product, index) => (
                <Card key={product._id} className="p-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg hover:border-[#ffde7d]/30 transition-all duration-300 hover:scale-105 relative overflow-hidden group animate-fade-up" style={{ opacity: 0, animationDelay: `${0.4 + index * 0.1}s` }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffde7d]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="mb-4 relative z-10">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 truncate relative z-10" style={{ fontFamily: 'Nort, sans-serif' }}>{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 relative z-10" style={{ fontFamily: 'Nort, sans-serif' }}>{product.description}</p>
                  <p className="text-lg font-bold text-[#ffde7d] mb-4 relative z-10" style={{ fontFamily: 'Nort, sans-serif' }}>
                    Rp {product.price.toLocaleString('id-ID')}
                  </p>
                  <div className="flex gap-2 relative z-10">
                    <Link to={`/admin/products/${product._id}/edit`} className="flex-1">
                      <Button variant="outline" className="w-full text-sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 text-sm"
                      onClick={() => openDeleteModal(product._id, product.name)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Hapus
                    </Button>
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
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Nort, sans-serif' }}>Hapus Produk</h3>
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
                Apakah Anda yakin ingin menghapus produk berikut?
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-6 border-l-4 border-red-500">
                <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Nort, sans-serif' }}>Nama Produk:</p>
                <p className="font-semibold text-gray-900 break-words line-clamp-2" style={{ fontFamily: 'Nort, sans-serif' }}>
                  {deleteModal.productName}
                </p>
              </div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Nort, sans-serif' }}>
                ⚠️ Tindakan ini tidak dapat dibatalkan. Produk akan dihapus secara permanen.
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

