import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function AdminLogin() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/admin/login`, formData);
      
      if (response.data.success) {
        login(response.data.token, response.data.user);
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      let errorMessage = 'Terjadi kesalahan saat login';
      
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        errorMessage = 'Network Error: Tidak dapat terhubung ke server.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // UPDATED: Latar belakang solid Kuning Madu (#ffde7d)
    <div className="min-h-screen bg-[#ffde7d] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* Ikon warna Biru Halus */}
            <Shield className="w-12 h-12 text-[#00b8a9]" />
            {/* Teks Judul warna Hitam agar kontras dengan background kuning */}
            <h1 className="text-4xl font-black text-black" style={{ fontFamily: 'Nort, sans-serif' }}>Admin Marles</h1>
          </div>
          <p className="text-gray-800 font-medium">Panel Administrasi</p>
        </div>

        {/* Login Card */}
        <div className={`bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm whitespace-pre-wrap">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                Email Admin
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  // Focus ring warna Biru Halus
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none transition-all"
                  placeholder="admin@marles.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none transition-all"
                  placeholder="Masukkan password admin"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00b8a9]"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* UPDATED: Tombol warna Biru Halus (#00b8a9) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00b8a9] text-white py-3 rounded-lg font-bold hover:bg-[#00a298] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Masuk...' : 'Masuk sebagai Admin'}
              {!isLoading && <ArrowRight className="h-5 w-5" />}
            </button>
          </form>

          <div className="mt-6 p-4 bg-[#ffde7d]/20 border border-[#ffde7d] rounded-lg">
            <p className="text-gray-800 text-sm">
              <strong>Default Credentials:</strong><br />
              Email: <code className="bg-[#ffde7d]/50 px-2 py-1 rounded">admin@marles.com</code><br />
              Password: <code className="bg-[#ffde7d]/50 px-2 py-1 rounded">admin123</code>
            </p>
          </div>

          <div className="text-center mt-6">
            <Link to="/login" className="text-[#00b8a9] font-bold hover:underline text-sm">
              ← Login sebagai User
            </Link>
          </div>

          <div className="text-center mt-4">
            {/* Link kembali warna gelap agar kontras */}
            <Link to="/" className="text-gray-800 hover:text-black text-sm font-medium">
              ← Kembali ke beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}