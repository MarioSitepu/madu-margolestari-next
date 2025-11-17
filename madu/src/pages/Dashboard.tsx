import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Shield, LogOut, Package, ShoppingCart, Heart, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'local' | 'google';
  isVerified: boolean;
  createdAt?: string;
}

export function Dashboard() {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      fetchUserProfile();
    }
  }, [user, isLoading, navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      if (response.data.success) {
        setUserProfile(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
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

  const stats = [
    {
      label: 'Total Pesanan',
      value: '0',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      label: 'Produk Favorit',
      value: '0',
      icon: Heart,
      color: 'bg-red-500'
    },
    {
      label: 'Produk Dibeli',
      value: '0',
      icon: Package,
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffde7d] to-[#00b8a9] py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            Dashboard
          </h1>
          <p className="text-white/90 text-lg">
            Selamat datang kembali, {userProfile.name}!
          </p>
        </div>

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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-up" style={{ animationDelay: '300ms' }}>
          <h3 className="text-2xl font-black text-gray-900 mb-6">Aksi Cepat</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#00b8a9] to-[#00a298] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5" />
              Beli Produk
            </button>
            <button
              onClick={() => navigate('/article')}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#ffde7d] to-[#f4d58d] text-gray-900 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105"
            >
              <Package className="w-5 h-5" />
              Baca Artikel
            </button>
            <button
              onClick={() => navigate('/about')}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#ffde7d] to-[#f4d58d] text-gray-900 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105"
            >
              <Heart className="w-5 h-5" />
              Tentang Kami
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

