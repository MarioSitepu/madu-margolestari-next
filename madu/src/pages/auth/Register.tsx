import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { API_URL } from '@/lib/api';

export function Register() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
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
    
    // Validate terms checkbox
    if (!agreedToTerms) {
      setError('Anda harus menyetujui syarat dan ketentuan untuk melanjutkan');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok!');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        login(response.data.token, response.data.user);
        navigate('/');
      }
    } catch (error: any) {
      console.error('Register error:', error);
      let errorMessage = 'Terjadi kesalahan saat mendaftar';
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Network Error: Tidak dapat terhubung ke server.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
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

      console.log('Mengirim Google credential ke backend...');
      const response = await axios.post(`${API_URL}/auth/google`, {
        credential: credentialResponse.credential
      });

      if (response.data.success) {
        login(response.data.token, response.data.user);
        navigate('/');
      } else {
        setError(response.data.message || 'Login dengan Google gagal');
      }
    } catch (error: any) {
      console.error('Google login error:', error);
      
      let errorMessage = 'Gagal login Google';
      
      // Handle network errors
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        errorMessage = 'Network Error: Tidak dapat terhubung ke server. Pastikan backend server berjalan.';
      } 
      // Handle response errors with detailed messages
      else if (error.response?.data) {
        const errorData = error.response.data;
        errorMessage = errorData.message || 'Login dengan Google gagal';
        
        // Include additional details if available (for development)
        if (errorData.details && import.meta.env.DEV) {
          errorMessage += `\n\nDetail: ${JSON.stringify(errorData.details, null, 2)}`;
        }
        
        // Handle specific error cases
        if (errorData.message?.includes('GOOGLE_CLIENT_ID')) {
          errorMessage = 'Konfigurasi Google OAuth tidak lengkap. Silakan hubungi administrator.';
        }
      } 
      // Handle other errors
      else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error('Google OAuth error occurred');
    setError('Login dengan Google gagal. Pastikan popup tidak diblokir dan coba lagi.');
  };

  return (
    // BACKGROUND: Solid Kuning Madu (#ffde7d)
    <div className="min-h-screen bg-[#ffde7d] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-4xl font-black text-black mb-2" style={{ fontFamily: 'Nort, sans-serif' }}>Marles</h1>
          <p className="text-gray-800 font-medium">Bergabung dengan komunitas kami</p>
        </div>

        {/* Register Card */}
        <div className={`bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm whitespace-pre-wrap">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  // Focus ring: Biru Halus (#00b8a9)
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none transition-all"
                  placeholder="Masukkan nama lengkap"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
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
                  placeholder="Min. 6 karakter"
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none transition-all"
                  placeholder="Ulangi password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00b8a9]"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label htmlFor="terms" className="flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all" style={{
              borderColor: agreedToTerms ? '#00b8a9' : '#e5e7eb',
              backgroundColor: agreedToTerms ? 'rgba(0, 184, 169, 0.08)' : '#f9fafb'
            }}>
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  setError('');
                }}
                className="mt-1 h-5 w-5 accent-[#00b8a9] cursor-pointer flex-shrink-0"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-600 select-none">
                Saya setuju dengan{' '}
                <Link to="/terms" className="text-[#00b8a9] hover:underline font-medium">
                  syarat dan ketentuan
                </Link>{' '}
                yang berlaku
              </span>
            </label>

            {/* Register Button - Solid Biru Halus */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00b8a9] text-white py-3 rounded-lg font-bold hover:bg-[#00a298] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
              {!isLoading && <ArrowRight className="h-5 w-5" />}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">atau</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              text="signup_with"
              shape="rectangular"
              logo_alignment="left"
              width="100%"
            />
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-[#00b8a9] font-bold hover:underline">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-800 hover:text-black text-sm font-medium">
            ← Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}