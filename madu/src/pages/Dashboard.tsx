import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Calendar, Shield, LogOut, Package, Heart, Settings, MessageCircle, Clock, FileText, Users, Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/lib/api';

// Admin emails - bisa diubah sesuai kebutuhan
const ADMIN_EMAILS = [
  'admin@madumargolestari.com',
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
      <div className="min-h-screen bg-gradient-to-br from-[#00b8a9] to-[#009c91] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl font-semibold" style={{ fontFamily: 'Nort, sans-serif' }}>Memuat...</div>
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
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-fade-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
      `}</style>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#00b8a9] via-[#00a298] to-[#009c91] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Header */}
          <div className="mb-6 sm:mb-8 md:mb-10 animate-fade-in">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 sm:mb-2 drop-shadow-lg" style={{ fontFamily: 'Nort, sans-serif' }}>
                  {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
                </h1>
                <p className="text-white/95 text-sm sm:text-base md:text-lg drop-shadow-md font-medium" style={{ fontFamily: 'Nort, sans-serif' }}>
                  Selamat datang kembali, <span className="block sm:inline font-bold">{userProfile.name}</span>!
                </p>
              </div>
            </div>
          </div>

        {/* Admin Stats Cards - Only for Admin */}
        {isAdmin && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
            <Card className="group p-4 sm:p-5 md:p-6 bg-white/98 backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_8px_30px_rgba(0,184,169,0.12)] hover:shadow-[0_12px_40px_rgba(0,184,169,0.2)] hover:border-[#00b8a9]/50 transition-all duration-500 hover:-translate-y-2 animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#00b8a9]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 relative z-10">
                <div className="flex-1">
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold" style={{ fontFamily: 'Nort, sans-serif' }}>Artikel</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#00b8a9] leading-tight" style={{ fontFamily: 'Nort, sans-serif' }}>{adminStatsCards.articles}</p>
                </div>
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-[#00b8a9]/15 to-[#00b8a9]/5 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#00b8a9]" />
                </div>
              </div>
            </Card>

            <Card className="group p-4 sm:p-5 md:p-6 bg-white/98 backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_8px_30px_rgba(255,222,125,0.12)] hover:shadow-[0_12px_40px_rgba(255,222,125,0.2)] hover:border-[#ffde7d]/50 transition-all duration-500 hover:-translate-y-2 animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#ffde7d]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 relative z-10">
                <div className="flex-1">
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold" style={{ fontFamily: 'Nort, sans-serif' }}>Produk</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#ffde7d] leading-tight" style={{ fontFamily: 'Nort, sans-serif' }}>{adminStatsCards.products}</p>
                </div>
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-[#ffde7d]/20 to-[#ffde7d]/10 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Package className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#ffde7d]" />
                </div>
              </div>
            </Card>

            <Card className="group p-4 sm:p-5 md:p-6 bg-white/98 backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_8px_30px_rgba(0,184,169,0.12)] hover:shadow-[0_12px_40px_rgba(0,184,169,0.2)] hover:border-[#00b8a9]/50 transition-all duration-500 hover:-translate-y-2 animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#00b8a9]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 relative z-10">
                <div className="flex-1">
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold" style={{ fontFamily: 'Nort, sans-serif' }}>Pengguna</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#00b8a9] leading-tight" style={{ fontFamily: 'Nort, sans-serif' }}>{adminStatsCards.users}</p>
                </div>
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-[#00b8a9]/15 to-[#00b8a9]/5 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#00b8a9]" />
                </div>
              </div>
            </Card>

            <Card className="group p-4 sm:p-5 md:p-6 bg-white/98 backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_8px_30px_rgba(0,184,169,0.12)] hover:shadow-[0_12px_40px_rgba(0,184,169,0.2)] hover:border-[#00b8a9]/50 transition-all duration-500 hover:-translate-y-2 animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#00b8a9]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 relative z-10">
                <div className="flex-1">
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold" style={{ fontFamily: 'Nort, sans-serif' }}>Komentar</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#00b8a9] leading-tight" style={{ fontFamily: 'Nort, sans-serif' }}>{adminStatsCards.comments}</p>
                </div>
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-[#00b8a9]/15 to-[#00b8a9]/5 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#00b8a9]" />
                </div>
              </div>
            </Card>

            <Card className="group p-4 sm:p-5 md:p-6 bg-white/98 backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_8px_30px_rgba(0,184,169,0.12)] hover:shadow-[0_12px_40px_rgba(0,184,169,0.2)] hover:border-[#00b8a9]/50 transition-all duration-500 hover:-translate-y-2 animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.5s', opacity: 0 }}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#00b8a9]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 relative z-10">
                <div className="flex-1">
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold" style={{ fontFamily: 'Nort, sans-serif' }}>Galeri</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#00b8a9] leading-tight" style={{ fontFamily: 'Nort, sans-serif' }}>{adminStatsCards.gallery}</p>
                </div>
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-[#00b8a9]/15 to-[#00b8a9]/5 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#00b8a9]" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* User Profile Card */}
        <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-[0_20px_60px_rgba(0,184,169,0.15)] border border-white/40 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 animate-scale-in hover:shadow-[0_25px_70px_rgba(0,184,169,0.2)] hover:border-[#00b8a9]/30 transition-all duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00b8a9]/5 via-transparent to-[#ffde7d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 relative z-10">
            {/* Avatar */}
            <div className="relative mx-auto md:mx-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#00b8a9] to-[#ffde7d] flex items-center justify-center overflow-hidden shadow-[0_8px_25px_rgba(0,184,169,0.3)] ring-2 sm:ring-4 ring-white group-hover:ring-[#00b8a9]/50 transition-all duration-500 group-hover:scale-105">
                {userProfile.avatar ? (
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-black text-2xl sm:text-3xl">
                    {userProfile.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {userProfile.isVerified && (
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 sm:p-1.5 border-2 sm:border-4 border-white">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 w-full text-center md:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: 'Nort, sans-serif' }}>
                {userProfile.name}
              </h2>
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm sm:text-base text-gray-600">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="break-all">{userProfile.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm sm:text-base text-gray-600">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span>Bergabung: {formatDate(userProfile.createdAt)}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm sm:text-base">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 shrink-0" />
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
            <div className="flex flex-row sm:flex-col gap-2 sm:gap-3 w-full md:w-auto relative z-10">
              <button
                onClick={() => navigate('/settings')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-[#ffde7d] to-[#f4d58d] hover:from-[#f4d58d] hover:to-[#ffde7d] text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm sm:text-base relative z-10"
                style={{ fontFamily: 'Nort, sans-serif' }}
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Pengaturan</span>
                <span className="sm:hidden">Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm sm:text-base relative z-10"
                style={{ fontFamily: 'Nort, sans-serif' }}
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Comment History Section */}
        <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-[0_20px_60px_rgba(0,184,169,0.15)] border border-white/40 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 animate-fade-up hover:shadow-[0_25px_70px_rgba(0,184,169,0.2)] hover:border-[#00b8a9]/30 transition-all duration-500 relative overflow-hidden group" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#00b8a9]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6 relative z-10">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-[#00b8a9]/15 to-[#00b8a9]/5 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#00b8a9]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900" style={{ fontFamily: 'Nort, sans-serif' }}>Komentar Saya</h3>
                <p className="text-gray-600 text-xs sm:text-sm hidden sm:block" style={{ fontFamily: 'Nort, sans-serif' }}>Riwayat komentar yang Anda buat</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-gradient-to-br from-[#00b8a9]/10 to-[#00b8a9]/5 rounded-xl border border-[#00b8a9]/20">
              <span className="text-xl sm:text-2xl font-black text-[#00b8a9]">{commentHistory.length}</span>
            </div>
          </div>

          {commentHistory.length > 0 ? (
            <div className="space-y-4">
              {commentHistory.slice(0, 5).map((comment) => (
                <Card key={comment.id} className="border border-[#00b8a9]/20 p-4 hover:shadow-[0_8px_20px_rgba(0,184,169,0.15)] hover:border-[#00b8a9]/40 transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-xl group/item">
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
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00b8a9] to-[#00a298] hover:from-[#00a298] hover:to-[#00b8a9] text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                Buat Komentar Pertama
              </Link>
            </div>
          )}
        </div>

        {/* Liked Comments Section */}
        <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-[0_20px_60px_rgba(255,222,125,0.15)] border border-white/40 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 animate-fade-up hover:shadow-[0_25px_70px_rgba(255,222,125,0.2)] hover:border-[#ffde7d]/30 transition-all duration-500 relative overflow-hidden group" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#ffde7d]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6 relative z-10">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-[#ffde7d]/15 to-[#ffde7d]/5 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffde7d]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900" style={{ fontFamily: 'Nort, sans-serif' }}>Komentar yang Disukai</h3>
                <p className="text-gray-600 text-xs sm:text-sm hidden sm:block" style={{ fontFamily: 'Nort, sans-serif' }}>Komentar yang Anda sukai</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-gradient-to-br from-[#ffde7d]/10 to-[#ffde7d]/5 rounded-xl border border-[#ffde7d]/20">
              <span className="text-xl sm:text-2xl font-black text-[#ffde7d]">{likedComments.length}</span>
            </div>
          </div>

          {likedComments.length > 0 ? (
            <div className="space-y-4">
              {likedComments.slice(0, 5).map((liked) => (
                <Card key={liked.id} className="border border-[#ffde7d]/20 p-4 hover:shadow-[0_8px_20px_rgba(255,222,125,0.15)] hover:border-[#ffde7d]/40 transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-xl group/item">
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
                    <Heart className="w-5 h-5 text-[#ffde7d] fill-[#ffde7d] shrink-0 ml-2 group-hover/item:scale-110 transition-transform duration-300" />
                  </div>
                </Card>
              ))}
              {likedComments.length > 5 && (
                <Link
                  to="/article-galeri"
                  className="block text-center text-[#ffde7d] font-semibold hover:underline text-sm hover:text-[#f4d58d] transition-colors"
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
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffde7d] to-[#f4d58d] hover:from-[#f4d58d] hover:to-[#ffde7d] text-gray-900 px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Heart className="w-4 h-4" />
                Jelajahi Komentar
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions - Only for Admin */}
        {isAdmin && (
          <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-[0_20px_60px_rgba(0,184,169,0.15)] border border-white/40 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 animate-fade-up hover:shadow-[0_25px_70px_rgba(0,184,169,0.2)] hover:border-[#00b8a9]/30 transition-all duration-500 relative overflow-hidden group" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#00b8a9]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 mb-4 sm:mb-6 relative z-10" style={{ fontFamily: 'Nort, sans-serif' }}>Aksi Cepat</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 relative z-10">
              <Link to="/admin/articles">
                <div className="flex items-center gap-2 sm:gap-3 p-4 sm:p-5 bg-gradient-to-r from-[#00b8a9] to-[#00a298] text-white rounded-xl hover:shadow-[0_8px_25px_rgba(0,184,169,0.3)] transition-all duration-300 font-semibold hover:-translate-y-1 cursor-pointer text-sm sm:text-base group/action relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/action:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                  <span className="relative z-10">Kelola Artikel</span>
                </div>
              </Link>
              <Link to="/admin/products">
                <div className="flex items-center gap-2 sm:gap-3 p-4 sm:p-5 bg-gradient-to-r from-[#ffde7d] to-[#f4d58d] text-gray-900 rounded-xl hover:shadow-[0_8px_25px_rgba(255,222,125,0.3)] transition-all duration-300 font-semibold hover:-translate-y-1 cursor-pointer text-sm sm:text-base group/action relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/action:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                  <span className="relative z-10">Kelola Produk</span>
                </div>
              </Link>
              <Link to="/admin/gallery">
                <div className="flex items-center gap-2 sm:gap-3 p-4 sm:p-5 bg-gradient-to-r from-[#b8860b] to-[#9a6f09] text-white rounded-xl hover:shadow-[0_8px_25px_rgba(184,134,11,0.3)] transition-all duration-300 font-semibold hover:-translate-y-1 cursor-pointer text-sm sm:text-base group/action relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/action:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                  <span className="relative z-10">Kelola Galeri</span>
                </div>
              </Link>
              <Link to="/admin/users">
                <div className="flex items-center gap-2 sm:gap-3 p-4 sm:p-5 bg-gradient-to-r from-[#00b8a9] to-[#00a298] text-white rounded-xl hover:shadow-[0_8px_25px_rgba(0,184,169,0.3)] transition-all duration-300 font-semibold hover:-translate-y-1 cursor-pointer text-sm sm:text-base group/action relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/action:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                  <span className="relative z-10">Kelola Pengguna</span>
                </div>
              </Link>
              <Link to="/admin/comments">
                <div className="flex items-center gap-2 sm:gap-3 p-4 sm:p-5 bg-gradient-to-r from-[#00b8a9] to-[#00a298] text-white rounded-xl hover:shadow-[0_8px_25px_rgba(0,184,169,0.3)] transition-all duration-300 font-semibold hover:-translate-y-1 cursor-pointer text-sm sm:text-base group/action relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/action:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                  <span className="relative z-10">Kelola Komentar</span>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Admin Section */}
        {isAdmin && (
          <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-[0_20px_60px_rgba(0,184,169,0.15)] p-4 sm:p-6 md:p-8 animate-fade-up mt-6 sm:mt-8 border border-white/40 hover:shadow-[0_25px_70px_rgba(0,184,169,0.2)] hover:border-[#00b8a9]/30 transition-all duration-500 relative overflow-hidden group" style={{ animationDelay: '0.5s', opacity: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#00b8a9]/5 via-transparent to-[#ffde7d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-[#00b8a9]/15 to-[#00b8a9]/5 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#00b8a9]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900" style={{ fontFamily: 'Nort, sans-serif' }}>Pusat Kontrol Admin</h3>
                  <p className="text-gray-600 text-xs sm:text-sm hidden sm:block" style={{ fontFamily: 'Nort, sans-serif' }}>Kelola artikel, user, dan komentar</p>
                </div>
              </div>
            </div>

            {/* Admin Stats */}
            {adminStats && (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <Card className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1" style={{ fontFamily: 'Nort, sans-serif' }}>Total Users</p>
                      <p className="text-2xl font-black text-[#00b8a9]" style={{ fontFamily: 'Nort, sans-serif' }}>{adminStats.totalUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-[#00b8a9]" />
                  </div>
                </Card>
                <Card className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1" style={{ fontFamily: 'Nort, sans-serif' }}>Total Articles</p>
                      <p className="text-2xl font-black text-[#b8860b]" style={{ fontFamily: 'Nort, sans-serif' }}>{adminStats?.totalArticles || 0}</p>
                    </div>
                    <FileText className="w-8 h-8 text-[#b8860b]" />
                  </div>
                </Card>
                <Card className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1" style={{ fontFamily: 'Nort, sans-serif' }}>Total Comments</p>
                      <p className="text-2xl font-black text-[#8b6914]" style={{ fontFamily: 'Nort, sans-serif' }}>{adminComments.length}</p>
                    </div>
                    <MessageCircle className="w-8 h-8 text-[#8b6914]" />
                  </div>
                </Card>
                <Card className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1" style={{ fontFamily: 'Nort, sans-serif' }}>Admins</p>
                      <p className="text-2xl font-black text-[#8b6914]" style={{ fontFamily: 'Nort, sans-serif' }}>{adminStats.totalAdmins}</p>
                    </div>
                    <Shield className="w-8 h-8 text-[#8b6914]" />
                  </div>
                </Card>
              </div>
            )}

            {/* Admin Tabs */}
            <div className="border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto">
              <div className="flex flex-nowrap sm:flex-wrap gap-2 min-w-max sm:min-w-0">
                <button
                  onClick={() => {
                    setActiveAdminTab('articles');
                    fetchArticles();
                  }}
                  className={`px-3 sm:px-4 py-2 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                    activeAdminTab === 'articles'
                      ? 'text-[#00b8a9] border-b-2 border-[#00b8a9]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Semua Artikel</span>
                  <span className="sm:hidden">Artikel</span> ({adminArticles.length})
                </button>
                <button
                  onClick={() => {
                    setActiveAdminTab('users');
                    fetchUsers();
                  }}
                  className={`px-3 sm:px-4 py-2 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                    activeAdminTab === 'users'
                      ? 'text-[#00b8a9] border-b-2 border-[#00b8a9]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Semua User</span>
                  <span className="sm:hidden">User</span> ({adminUsers.length})
                </button>
                <button
                  onClick={() => {
                    setActiveAdminTab('comments');
                    fetchComments();
                  }}
                  className={`px-3 sm:px-4 py-2 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                    activeAdminTab === 'comments'
                      ? 'text-[#00b8a9] border-b-2 border-[#00b8a9]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Semua Comment</span>
                  <span className="sm:hidden">Comment</span> ({adminComments.length})
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
                    <div className="space-y-3 sm:space-y-4">
                      {adminArticles.map((article) => (
                        <div key={article._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex-1 w-full">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="text-base sm:text-lg font-bold text-gray-900 break-words">{article.title}</h3>
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
                              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteArticle(article._id)}
                              className="text-red-600 hover:text-red-700 flex-1 sm:flex-none w-full sm:w-auto"
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
                    <div className="space-y-3 sm:space-y-4">
                      {adminUsers.map((userItem) => (
                        <div key={userItem._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                            {userItem.avatar ? (
                              <img
                                src={userItem.avatar}
                                alt={userItem.name}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#00b8a9] flex items-center justify-center text-white font-bold text-base sm:text-lg shrink-0">
                                {userItem.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">{userItem.name}</h3>
                                {userItem.role === 'admin' ? (
                                  <Shield className="w-4 h-4 text-[#b8860b] shrink-0" />
                                ) : (
                                  <Users className="w-4 h-4 text-gray-400 shrink-0" />
                                )}
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600 truncate">{userItem.email}</p>
                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                <span className={`px-2 py-1 text-xs rounded whitespace-nowrap ${
                                  userItem.role === 'admin'
                                    ? 'bg-[#b8860b]/20 text-[#b8860b]'
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {userItem.role}
                                </span>
                                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600 whitespace-nowrap">
                                  {userItem.provider}
                                </span>
                                <span className="text-xs text-gray-500 hidden sm:inline">
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
                    <div className="space-y-3 sm:space-y-4">
                      {adminComments.map((comment) => (
                        <div key={comment._id} className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-3 sm:gap-0 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex-1 w-full min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {comment.authorAvatar ? (
                                <img
                                  src={comment.authorAvatar}
                                  alt={comment.authorName}
                                  className="w-8 h-8 rounded-full object-cover shrink-0"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-[#00b8a9] flex items-center justify-center text-white font-bold text-sm shrink-0">
                                  {comment.authorName.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span className="font-semibold text-gray-900 text-sm sm:text-base">{comment.authorName}</span>
                              <span className="text-xs text-gray-500 hidden sm:inline">
                                • {new Date(comment.createdAt).toLocaleString('id-ID')}
                              </span>
                              <span className="text-xs text-gray-500 sm:hidden w-full">
                                {new Date(comment.createdAt).toLocaleString('id-ID')}
                              </span>
                            </div>
                            <p className="text-sm sm:text-base text-gray-700 mb-2 break-words">{comment.content}</p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                              <span className="truncate">Artikel: {comment.articleId?.title || 'N/A'}</span>
                              <span className="hidden sm:inline">•</span>
                              <span>{comment.likes} likes</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-red-600 hover:text-red-700 sm:ml-4 w-full sm:w-auto"
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
    </>
  );
}

export default Dashboard;

