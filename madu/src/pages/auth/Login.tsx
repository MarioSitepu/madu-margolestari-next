import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function Login() {
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
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      
      if (response.data.success) {
        // Use auth context to store user data
        login(response.data.token, response.data.user);
        
        // Redirect to home page
        navigate('/');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Extract error message
      let errorMessage = 'Terjadi kesalahan saat login';
      
      // Handle network errors
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        errorMessage = `Network Error: Tidak dapat terhubung ke server.\n\n` +
          `Pastikan:\n` +
          `1. Backend server sudah berjalan di http://localhost:5000\n` +
          `2. API URL sudah benar: ${API_URL}\n` +
          `3. Tidak ada firewall yang memblokir koneksi\n` +
          `4. Coba buka http://localhost:5000/api/health di browser untuk test koneksi`;
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

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    setError('');

    try {
      if (!credentialResponse?.credential) {
        setError('Google credential tidak ditemukan. Silakan coba lagi.');
        setIsLoading(false);
        return;
      }

      const response = await axios.post(`${API_URL}/auth/google`, {
        credential: credentialResponse.credential
      });

      if (response.data.success) {
        // Use auth context to store user data
        login(response.data.token, response.data.user);
        
        // Redirect to home page
        navigate('/');
      } else {
        setError(response.data.message || 'Login dengan Google gagal');
      }
    } catch (error: any) {
      console.error('Google login error:', error);
      
      // Extract error message
      let errorMessage = 'Terjadi kesalahan saat login dengan Google';
      
      // Handle network errors
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        errorMessage = `Network Error: Tidak dapat terhubung ke server.\n\n` +
          `Pastikan:\n` +
          `1. Backend server sudah berjalan di http://localhost:5000\n` +
          `2. API URL sudah benar: ${API_URL}\n` +
          `3. Tidak ada firewall yang memblokir koneksi\n` +
          `4. Coba buka http://localhost:5000/api/health di browser untuk test koneksi`;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
        
        // Add details if available in development
        if (error.response.data.details && import.meta.env.DEV) {
          errorMessage += `\n\nDetail: ${JSON.stringify(error.response.data.details, null, 2)}`;
        }
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Pastikan backend sudah berjalan dan GOOGLE_CLIENT_ID sudah dikonfigurasi.';
      } else if (error.response?.status === 400) {
        errorMessage = 'Request tidak valid. Pastikan Google Client ID sudah benar.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Login dengan Google gagal. Silakan coba lagi.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffde7d] to-[#00b8a9] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-4xl font-black text-white mb-2">Marles</h1>
          <p className="text-white/80">Masuk ke akun Anda</p>
        </div>

        {/* Login Card */}
        <div className={`bg-white rounded-2xl shadow-2xl p-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm whitespace-pre-wrap">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none transition-all"
                  placeholder="Masukkan email Anda"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
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
                  placeholder="Masukkan password Anda"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-[#00b8a9] hover:underline font-medium">
                Lupa password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00b8a9] text-white py-3 rounded-lg font-semibold hover:bg-[#00a298] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Masuk...' : 'Masuk'}
              {!isLoading && <ArrowRight className="h-5 w-5" />}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">atau</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Login Button */}
          <div className="w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              text="signin_with"
              shape="rectangular"
              logo_alignment="left"
              width="100%"
            />
          </div>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Belum punya akun?{' '}
              <Link to="/register" className="text-[#00b8a9] font-semibold hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-white/80 hover:text-white text-sm font-medium">
            ← Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}