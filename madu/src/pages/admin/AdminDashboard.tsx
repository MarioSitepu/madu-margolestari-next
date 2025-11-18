import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { FileText, Users, MessageCircle, Image as ImageIcon, Package, ArrowRight, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    articles: 0,
    products: 0,
    users: 0,
    comments: 0,
    gallery: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/admin/login');
      return;
    }

    if (user?.role === 'admin') {
      fetchStats();
    }
  }, [user, isLoading, navigate]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch all stats in parallel
      const [articlesRes, productsRes, usersRes, commentsRes, galleryRes] = await Promise.allSettled([
        axios.get(`${API_URL}/articles/all`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/products/all`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/comments/all`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/gallery/all`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setStats({
        articles: articlesRes.status === 'fulfilled' && articlesRes.value.data.success 
          ? articlesRes.value.data.articles.length : 0,
        products: productsRes.status === 'fulfilled' && productsRes.value.data.success 
          ? productsRes.value.data.products.length : 0,
        users: usersRes.status === 'fulfilled' && usersRes.value.data.success 
          ? usersRes.value.data.users.length : 0,
        comments: commentsRes.status === 'fulfilled' && commentsRes.value.data.success 
          ? commentsRes.value.data.comments.length : 0,
        gallery: galleryRes.status === 'fulfilled' && galleryRes.value.data.success 
          ? galleryRes.value.data.galleries.length : 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ffde7d] to-[#00b8a9] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffde7d] to-[#00b8a9] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/90">Selamat datang, {user?.name || 'Admin'}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="p-6 bg-white/95">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Artikel</p>
                <p className="text-3xl font-black text-[#00b8a9]">{stats.articles}</p>
              </div>
              <div className="p-3 bg-[#00b8a9]/10 rounded-lg">
                <FileText className="w-6 h-6 text-[#00b8a9]" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/95">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Produk</p>
                <p className="text-3xl font-black text-[#ffde7d]">{stats.products}</p>
              </div>
              <div className="p-3 bg-[#ffde7d]/20 rounded-lg">
                <Package className="w-6 h-6 text-[#b8860b]" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/95">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pengguna</p>
                <p className="text-3xl font-black text-[#00b8a9]">{stats.users}</p>
              </div>
              <div className="p-3 bg-[#00b8a9]/10 rounded-lg">
                <Users className="w-6 h-6 text-[#00b8a9]" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/95">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Komentar</p>
                <p className="text-3xl font-black text-[#00b8a9]">{stats.comments}</p>
              </div>
              <div className="p-3 bg-[#00b8a9]/10 rounded-lg">
                <MessageCircle className="w-6 h-6 text-[#00b8a9]" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/95">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Galeri</p>
                <p className="text-3xl font-black text-[#00b8a9]">{stats.gallery}</p>
              </div>
              <div className="p-3 bg-[#00b8a9]/10 rounded-lg">
                <ImageIcon className="w-6 h-6 text-[#00b8a9]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-white/95 mb-8">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/admin/articles">
              <Card className="p-6 bg-gradient-to-r from-[#00b8a9] to-[#00a298] text-white hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <FileText className="w-8 h-8 mb-2" />
                    <h3 className="text-xl font-bold mb-1">Kelola Artikel</h3>
                    <p className="text-sm text-white/90">Buat dan edit artikel</p>
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Card>
            </Link>

            <Link to="/admin/products">
              <Card className="p-6 bg-gradient-to-r from-[#ffde7d] to-[#f4d58d] text-gray-900 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <Package className="w-8 h-8 mb-2" />
                    <h3 className="text-xl font-bold mb-1">Kelola Produk</h3>
                    <p className="text-sm text-gray-700">Buat dan edit produk</p>
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Card>
            </Link>

            <Link to="/admin/gallery">
              <Card className="p-6 bg-gradient-to-r from-[#b8860b] to-[#9a6f09] text-white hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <h3 className="text-xl font-bold mb-1">Kelola Galeri</h3>
                    <p className="text-sm text-white/90">Kelola gambar galeri</p>
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Card>
            </Link>

            <Link to="/admin/users">
              <Card className="p-6 bg-gradient-to-r from-[#00b8a9] to-[#00a298] text-white hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <Users className="w-8 h-8 mb-2" />
                    <h3 className="text-xl font-bold mb-1">Kelola Pengguna</h3>
                    <p className="text-sm text-white/90">Lihat dan kelola pengguna</p>
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Card>
            </Link>

            <Link to="/admin/comments">
              <Card className="p-6 bg-gradient-to-r from-[#00b8a9] to-[#00a298] text-white hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <MessageCircle className="w-8 h-8 mb-2" />
                    <h3 className="text-xl font-bold mb-1">Kelola Komentar</h3>
                    <p className="text-sm text-white/90">Moderasi komentar</p>
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Card>
            </Link>

            <Link to="/dashboard">
              <Card className="p-6 bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <BarChart3 className="w-8 h-8 mb-2" />
                    <h3 className="text-xl font-bold mb-1">Dashboard User</h3>
                    <p className="text-sm text-white/90">Lihat dashboard pengguna</p>
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Card>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
