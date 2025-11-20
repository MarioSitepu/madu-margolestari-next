import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Calendar, Shield, LogOut, Package, Heart, Settings, MessageCircle, Clock, FileText, Users, Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Admin emails - bisa diubah sesuai kebutuhan
const ADMIN_EMAILS = [
  'admin@marles.com',
  'admin@example.com',
  // Tambahkan email admin lainnya di sini
  ...(import.meta.env.VITE_ADMIN_EMAILS ? import.meta.env.VITE_ADMIN_EMAILS.split(',') : [])
];

interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'local' | 'google';
  isVerified: boolean;
  createdAt?: string;
}

interface CommentHistory {
  id: string;
  content: string;
  articleTitle: string;
  articleId?: string;
  createdAt: string;
  likes: number;
}

interface LikedComment {
  id: string;
  commentId: string;
  content: string;
  author: string;
  articleTitle: string;
  articleId?: string;
  likedAt: string;
}

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  provider: string;
  avatar?: string;
  createdAt: string;
}

interface AdminComment {
  _id: string;
  content: string;
  authorName: string;
  authorAvatar?: string;
  likes: number;
  articleId: {
    _id: string;
    title: string;
  };
  createdAt: string;
}

export function Dashboard() {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentHistory, setCommentHistory] = useState<CommentHistory[]>([]);
  const [likedComments, setLikedComments] = useState<LikedComment[]>([]);
  
  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [adminComments, setAdminComments] = useState<AdminComment[]>([]);
  const [adminArticles, setAdminArticles] = useState<any[]>([]);
  const [adminStats, setAdminStats] = useState<any>(null);
  const [adminStatsCards, setAdminStatsCards] = useState({
    articles: 0,
    products: 0,
    users: 0,
    comments: 0,
    gallery: 0
  });
  const [articleLoading, setArticleLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'articles' | 'users' | 'comments'>('articles');
  

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      fetchUserProfile();
      // Check if user is admin
      const checkAdmin = user.role === 'admin' || ADMIN_EMAILS.includes(user.email.toLowerCase());
      setIsAdmin(checkAdmin);
      
      if (checkAdmin) {
        fetchAdminData();
      }
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (userProfile || user) {
      loadCommentHistory();
      loadLikedComments();
    }
  }, [userProfile, user]);

  const loadCommentHistory = () => {
    if (!user) return;
    const userId = user.id || user.email || userProfile?.id || userProfile?.email;
    if (!userId) return;
    const stored = localStorage.getItem(`commentHistory_${userId}`);
    if (stored) {
      setCommentHistory(JSON.parse(stored));
    }
  };

  const loadLikedComments = () => {
    if (!user) return;
    const userId = user.id || user.email || userProfile?.id || userProfile?.email;
    if (!userId) return;
    const stored = localStorage.getItem(`likedComments_${userId}`);
    if (stored) {
      setLikedComments(JSON.parse(stored));
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      if (response.data.success) {
        const userData = response.data.user;
        setUserProfile(userData);
        // Update admin check based on server response (server will auto-assign admin role for admin emails)
        const checkAdmin = userData.role === 'admin' || ADMIN_EMAILS.includes(userData.email.toLowerCase());
        setIsAdmin(checkAdmin);
        
        // If user is admin, fetch admin data
        if (checkAdmin) {
          fetchAdminData();
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminData = async () => {
    if (!isAdmin) return;
    
    try {
      const token = localStorage.getItem('token');
      const [usersRes, commentsRes, statsRes, articlesRes, productsRes, galleryRes] = await Promise.allSettled([
        axios.get(`${API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => ({ data: { success: false } })),
        axios.get(`${API_URL}/comments`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => ({ data: { success: false } })),
        axios.get(`${API_URL}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => ({ data: { success: false } })),
        axios.get(`${API_URL}/articles/all`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/products/all`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/gallery/all`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (usersRes.status === 'fulfilled' && usersRes.value.data.success) {
        setAdminUsers(usersRes.value.data.users);
      }
      if (commentsRes.status === 'fulfilled' && commentsRes.value.data.success) {
        setAdminComments(commentsRes.value.data.comments);
      }
      if (statsRes.status === 'fulfilled' && statsRes.value.data.success) {
        setAdminStats(statsRes.value.data.stats);
      }

      // Set stats cards
      setAdminStatsCards({
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
      console.error('Error fetching admin data:', error);
    }
  };

  const fetchArticles = async () => {
    try {
      setArticleLoading(true);
      const response = await axios.get(`${API_URL}/articles/all`);
      if (response.data.success) {
        setAdminArticles(response.data.articles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setArticleLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setUserLoading(true);
      const response = await axios.get(`${API_URL}/admin/users`);
      if (response.data.success) {
        setAdminUsers(response.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setUserLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      setCommentLoading(true);
      const response = await axios.get(`${API_URL}/comments`);
      if (response.data.success) {
        setAdminComments(response.data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setCommentLoading(false);
    }
  };


  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;

    try {
      await axios.delete(`${API_URL}/articles/${id}`);
      setAdminArticles(adminArticles.filter(a => a._id !== id));
      alert('Artikel berhasil dihapus');
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Gagal menghapus artikel');
    }
  };


  const handleDeleteComment = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus komentar ini?')) return;

    try {
      await axios.delete(`${API_URL}/comments/${id}`);
      setAdminComments(adminComments.filter(c => c._id !== id));
      alert('Komentar berhasil dihapus');
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Gagal menghapus komentar');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ffde7d] to-[#00b8a9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl font-semibold">Memuat...</div>
        </div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return null;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Tidak tersedia';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffde7d] to-[#00b8a9] py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
          </h1>
          <p className="text-white/90 text-lg">
            Selamat datang kembali, {userProfile.name}!
          </p>
        </div>

        {/* Admin Stats Cards - Only for Admin */}
        {isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 animate-fade-up">
            <Card className="p-6 bg-white/95">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Artikel</p>
                  <p className="text-3xl font-black text-[#00b8a9]">{adminStatsCards.articles}</p>
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
                  <p className="text-3xl font-black text-[#ffde7d]">{adminStatsCards.products}</p>
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
                  <p className="text-3xl font-black text-[#00b8a9]">{adminStatsCards.users}</p>
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
                  <p className="text-3xl font-black text-[#00b8a9]">{adminStatsCards.comments}</p>
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
                  <p className="text-3xl font-black text-[#00b8a9]">{adminStatsCards.gallery}</p>
                </div>
                <div className="p-3 bg-[#00b8a9]/10 rounded-lg">
                  <ImageIcon className="w-6 h-6 text-[#00b8a9]" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* User Profile Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6 animate-scale-in">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00b8a9] to-[#ffde7d] flex items-center justify-center overflow-hidden shadow-lg">
                {userProfile.avatar ? (
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-black text-3xl">
                    {userProfile.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {userProfile.isVerified && (
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1.5 border-4 border-white">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                {userProfile.name}
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span>{userProfile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>Bergabung: {formatDate(userProfile.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">
                    Login via{' '}
                    <span className="font-semibold capitalize">
                      {userProfile.provider === 'google' ? 'Google' : 'Email'}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <button
                onClick={() => navigate('/settings')}
                className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Settings className="w-5 h-5" />
                Pengaturan
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Comment History Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#00b8a9]/10 rounded-lg">
                <MessageCircle className="w-6 h-6 text-[#00b8a9]" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900">Komentar Saya</h3>
                <p className="text-gray-600 text-sm">Riwayat komentar yang Anda buat</p>
              </div>
            </div>
            <span className="text-2xl font-black text-[#00b8a9]">{commentHistory.length}</span>
          </div>

          {commentHistory.length > 0 ? (
            <div className="space-y-4">
              {commentHistory.slice(0, 5).map((comment) => (
                <Card key={comment.id} className="border border-[#00b8a9]/20 p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-gray-900">{comment.articleTitle}</h4>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {comment.createdAt}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2 line-clamp-2">{comment.content}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {comment.likes} likes
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              {commentHistory.length > 5 && (
                <Link
                  to="/article-galeri"
                  className="block text-center text-[#00b8a9] font-semibold hover:underline text-sm"
                >
                  Lihat semua komentar ({commentHistory.length})
                </Link>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">Anda belum membuat komentar</p>
              <Link
                to="/article-galeri"
                className="inline-flex items-center gap-2 bg-[#00b8a9] hover:bg-[#009c91] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Buat Komentar Pertama
              </Link>
            </div>
          )}
        </div>

        {/* Liked Comments Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6 animate-fade-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#b8860b]/10 rounded-lg">
                <Heart className="w-6 h-6 text-[#b8860b]" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900">Komentar yang Disukai</h3>
                <p className="text-gray-600 text-sm">Komentar yang Anda sukai</p>
              </div>
            </div>
            <span className="text-2xl font-black text-[#b8860b]">{likedComments.length}</span>
          </div>

          {likedComments.length > 0 ? (
            <div className="space-y-4">
              {likedComments.slice(0, 5).map((liked) => (
                <Card key={liked.id} className="border border-[#b8860b]/20 p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-gray-900">{liked.articleTitle}</h4>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {liked.likedAt}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs mb-1">Oleh: {liked.author}</p>
                      <p className="text-gray-700 text-sm mb-2 line-clamp-2">{liked.content}</p>
                    </div>
                    <Heart className="w-5 h-5 text-[#b8860b] fill-[#b8860b] shrink-0 ml-2" />
                  </div>
                </Card>
              ))}
              {likedComments.length > 5 && (
                <Link
                  to="/article-galeri"
                  className="block text-center text-[#b8860b] font-semibold hover:underline text-sm"
                >
                  Lihat semua ({likedComments.length})
                </Link>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">Anda belum menyukai komentar</p>
              <Link
                to="/article-galeri"
                className="inline-flex items-center gap-2 bg-[#b8860b] hover:bg-[#9a6f09] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                <Heart className="w-4 h-4" />
                Jelajahi Komentar
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions - Only for Admin */}
        {isAdmin && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-up" style={{ animationDelay: '400ms' }}>
            <h3 className="text-2xl font-black text-gray-900 mb-6">Aksi Cepat</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/admin/articles">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#00b8a9] to-[#00a298] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105 cursor-pointer">
                  <FileText className="w-5 h-5" />
                  Kelola Artikel
                </div>
              </Link>
              <Link to="/admin/products">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#ffde7d] to-[#f4d58d] text-gray-900 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105 cursor-pointer">
                  <Package className="w-5 h-5" />
                  Kelola Produk
                </div>
              </Link>
              <Link to="/admin/gallery">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#b8860b] to-[#9a6f09] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105 cursor-pointer">
                  <ImageIcon className="w-5 h-5" />
                  Kelola Galeri
                </div>
              </Link>
              <Link to="/admin/users">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#00b8a9] to-[#00a298] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105 cursor-pointer">
                  <Users className="w-5 h-5" />
                  Kelola Pengguna
                </div>
              </Link>
              <Link to="/admin/comments">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#00b8a9] to-[#00a298] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105 cursor-pointer">
                  <MessageCircle className="w-5 h-5" />
                  Kelola Komentar
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Admin Section */}
        {isAdmin && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-up mt-6 border-2 border-[#b8860b]" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#b8860b]/10 rounded-lg">
                  <Shield className="w-6 h-6 text-[#b8860b]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Pusat Kontrol Admin</h3>
                  <p className="text-gray-600 text-sm">Kelola artikel, user, dan komentar</p>
                </div>
              </div>
            </div>

            {/* Admin Stats */}
            {adminStats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Total Users</p>
                      <p className="text-2xl font-black text-[#00b8a9]">{adminStats.totalUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-[#00b8a9]" />
                  </div>
                </Card>
                <Card className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Total Articles</p>
                      <p className="text-2xl font-black text-[#b8860b]">{adminStats?.totalArticles || 0}</p>
                    </div>
                    <FileText className="w-8 h-8 text-[#b8860b]" />
                  </div>
                </Card>
                <Card className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Total Comments</p>
                      <p className="text-2xl font-black text-[#8b6914]">{adminComments.length}</p>
                    </div>
                    <MessageCircle className="w-8 h-8 text-[#8b6914]" />
                  </div>
                </Card>
                <Card className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Admins</p>
                      <p className="text-2xl font-black text-[#8b6914]">{adminStats.totalAdmins}</p>
                    </div>
                    <Shield className="w-8 h-8 text-[#8b6914]" />
                  </div>
                </Card>
              </div>
            )}

            {/* Admin Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setActiveAdminTab('articles');
                    fetchArticles();
                  }}
                  className={`px-4 py-2 font-semibold transition-all ${
                    activeAdminTab === 'articles'
                      ? 'text-[#00b8a9] border-b-2 border-[#00b8a9]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  Semua Artikel ({adminArticles.length})
                </button>
                <button
                  onClick={() => {
                    setActiveAdminTab('users');
                    fetchUsers();
                  }}
                  className={`px-4 py-2 font-semibold transition-all ${
                    activeAdminTab === 'users'
                      ? 'text-[#00b8a9] border-b-2 border-[#00b8a9]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Users className="w-4 h-4 inline mr-2" />
                  Semua User ({adminUsers.length})
                </button>
                <button
                  onClick={() => {
                    setActiveAdminTab('comments');
                    fetchComments();
                  }}
                  className={`px-4 py-2 font-semibold transition-all ${
                    activeAdminTab === 'comments'
                      ? 'text-[#00b8a9] border-b-2 border-[#00b8a9]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Semua Comment ({adminComments.length})
                </button>
              </div>
            </div>

            {/* Admin Tab Content */}
            <div className="mt-6">
              {/* Articles Tab */}
              {activeAdminTab === 'articles' && (
                <div>
                  {articleLoading ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500">Loading...</p>
                    </div>
                  ) : adminArticles.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">Belum ada artikel</p>
                      <Link to="/admin/articles/new">
                        <Button className="bg-[#00b8a9] hover:bg-[#009c91] text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Buat Artikel Pertama
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {adminArticles.map((article) => (
                        <div key={article._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{article.title}</h3>
                              {!article.published && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Draft</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{article.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Oleh: {article.authorName}</span>
                              <span>•</span>
                              <span>{article.views} views</span>
                              <span>•</span>
                              <span>{new Date(article.createdAt).toLocaleDateString('id-ID')}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link to={`/admin/articles/${article._id}/edit`}>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteArticle(article._id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Users List */}
              {activeAdminTab === 'users' && (
                <div>
                  {userLoading ? (
                    <p className="text-gray-500 text-center py-4">Loading...</p>
                  ) : adminUsers.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Belum ada user</p>
                  ) : (
                    <div className="space-y-4">
                      {adminUsers.map((userItem) => (
                        <div key={userItem._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-4">
                            {userItem.avatar ? (
                              <img
                                src={userItem.avatar}
                                alt={userItem.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-[#00b8a9] flex items-center justify-center text-white font-bold text-lg">
                                {userItem.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-gray-900">{userItem.name}</h3>
                                {userItem.role === 'admin' ? (
                                  <Shield className="w-4 h-4 text-[#b8860b]" />
                                ) : (
                                  <Users className="w-4 h-4 text-gray-400" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{userItem.email}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-1 text-xs rounded ${
                                  userItem.role === 'admin'
                                    ? 'bg-[#b8860b]/20 text-[#b8860b]'
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {userItem.role}
                                </span>
                                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                                  {userItem.provider}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Bergabung: {new Date(userItem.createdAt).toLocaleDateString('id-ID')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Comments List */}
              {activeAdminTab === 'comments' && (
                <div>
                  {commentLoading ? (
                    <p className="text-gray-500 text-center py-4">Loading...</p>
                  ) : adminComments.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Belum ada komentar</p>
                  ) : (
                    <div className="space-y-4">
                      {adminComments.map((comment) => (
                        <div key={comment._id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {comment.authorAvatar ? (
                                <img
                                  src={comment.authorAvatar}
                                  alt={comment.authorName}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-[#00b8a9] flex items-center justify-center text-white font-bold text-sm">
                                  {comment.authorName.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span className="font-semibold text-gray-900">{comment.authorName}</span>
                              <span className="text-xs text-gray-500">
                                • {new Date(comment.createdAt).toLocaleString('id-ID')}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-2">{comment.content}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Artikel: {comment.articleId?.title || 'N/A'}</span>
                              <span>•</span>
                              <span>{comment.likes} likes</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-red-600 hover:text-red-700 ml-4"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

