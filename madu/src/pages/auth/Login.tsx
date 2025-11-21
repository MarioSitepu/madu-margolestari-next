import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { buildApiUrl, getApiUrl } from '@/lib/api';

const API_URL = getApiUrl();

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
  const [showGoogleAccounts, setShowGoogleAccounts] = useState(false);
  const navigate = useNavigate();
  const { login, getGoogleAccountHistory } = useAuth();
  const [googleAccounts, setGoogleAccounts] = useState(getGoogleAccountHistory());
  const googleLoginRef = useRef<HTMLDivElement>(null);

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
      const loginEndpoint = buildApiUrl('/auth/login');
      const response = await axios.post(loginEndpoint, formData);
      
      if (response.data.success) {
        login(response.data.token, response.data.user);
        navigate('/');
      }
    } catch (error: any) {
      console.error('Login error:', error);
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
      const googleEndpoint = buildApiUrl('/auth/google');
      console.log('API Base URL:', API_URL);
      console.log('Full endpoint:', googleEndpoint);
      
      const response = await axios.post(googleEndpoint, {
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
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      
      let errorMessage = 'Gagal login Google';
      
      // Handle 404 errors specifically
      if (error.response?.status === 404) {
        const usedUrl = error.config?.url || buildApiUrl('/auth/google');
        errorMessage = `Endpoint tidak ditemukan. Pastikan VITE_API_URL di-set dengan benar.\n\nURL yang digunakan: ${usedUrl}\n\nBackend URL seharusnya: https://madu-server.onrender.com/api\n\nPastikan VITE_API_URL di-set sebagai: https://madu-server.onrender.com/api`;
      }
      // Handle network errors
      else if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        const usedUrl = buildApiUrl('/auth/google');
        errorMessage = `Network Error: Tidak dapat terhubung ke server.\n\nURL yang digunakan: ${usedUrl}\n\nPastikan backend server berjalan dan VITE_API_URL di-set dengan benar.\n\nVITE_API_URL seharusnya: https://madu-server.onrender.com/api`;
      } 
      // Handle response errors with detailed messages
      else if (error.response?.data) {
        const errorData = error.response.data;
        errorMessage = errorData.message || 'Login dengan Google gagal';
        
        // Include path information for 404 errors
        if (error.response.status === 404 && errorData.path) {
          errorMessage += `\n\nPath yang diminta: ${errorData.path}`;
        }
        
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

  // Refresh Google accounts list when component mounts or after successful login
  useEffect(() => {
    setGoogleAccounts(getGoogleAccountHistory());
  }, [getGoogleAccountHistory]);

  const handleAccountSelect = () => {
    // When user clicks on a recommended account, trigger Google login button click
    // The GoogleLogin component will handle account selection via Google's UI
    if (googleLoginRef.current) {
      const googleButton = googleLoginRef.current.querySelector('div[role="button"]') as HTMLElement;
      if (googleButton) {
        googleButton.click();
      }
    }
    setShowGoogleAccounts(false);
  };

  return (
    // UPDATED: Latar belakang solid Kuning Madu (#ffde7d)
    <div className="min-h-screen bg-[#ffde7d] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand - Teks Hitam */}
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-4xl font-black text-black mb-2" style={{ fontFamily: 'Nort, sans-serif' }}>Marles</h1>
          <p className="text-gray-800 font-medium">Masuk ke akun Anda</p>
        </div>

        {/* Login Card */}
        <div className={`bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm whitespace-pre-wrap">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  // Focus ring warna Biru Halus
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
                  placeholder="Masukkan password Anda"
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

            {/* Forgot Password - Link Biru Halus */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-[#00b8a9] hover:underline font-bold">
                Lupa password?
              </Link>
            </div>

            {/* UPDATED: Tombol warna Biru Halus (#00b8a9) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00b8a9] text-white py-3 rounded-lg font-bold hover:bg-[#00a298] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Masuk...' : 'Masuk'}
              {!isLoading && <ArrowRight className="h-5 w-5" />}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">atau</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Recommended Google Accounts */}
          {googleAccounts.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3 font-medium">Akun Google yang pernah digunakan:</p>
              <div className="space-y-2">
                {googleAccounts.slice(0, 3).map((account, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={handleAccountSelect}
                    className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all duration-200 hover:shadow-md group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#00b8a9] flex items-center justify-center overflow-hidden ring-2 ring-white shadow-sm flex-shrink-0">
                      {account.avatar ? (
                        <img
                          src={account.avatar}
                          alt={account.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-white font-semibold text-sm">
                          {account.name?.charAt(0)?.toUpperCase() || account.email?.charAt(0)?.toUpperCase() || 'G'}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-semibold text-gray-900 truncate group-hover:text-[#00b8a9] transition-colors">
                        Login sebagai {account.name || 'User'}
                      </p>
                      <p className="text-sm text-gray-600 truncate">{account.email}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-[#00b8a9] transition-colors">
                      <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd">
                          <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                          <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                          <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.348 6.173 0 7.55 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                        </g>
                      </svg>
                      <ChevronDown size={16} className="opacity-50" />
                    </div>
                  </button>
                ))}
              </div>
              {googleAccounts.length > 3 && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowGoogleAccounts(!showGoogleAccounts)}
                    className="mt-2 text-sm text-[#00b8a9] hover:underline font-medium w-full text-center"
                  >
                    {showGoogleAccounts ? 'Sembunyikan' : `Lihat ${googleAccounts.length - 3} akun lainnya`}
                  </button>
                  {showGoogleAccounts && (
                    <div className="mt-2 space-y-2">
                      {googleAccounts.slice(3).map((account, index) => (
                        <button
                          key={index + 3}
                          type="button"
                          onClick={handleAccountSelect}
                          className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all duration-200 hover:shadow-md group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#00b8a9] flex items-center justify-center overflow-hidden ring-2 ring-white shadow-sm flex-shrink-0">
                            {account.avatar ? (
                              <img
                                src={account.avatar}
                                alt={account.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            ) : (
                              <span className="text-white font-semibold text-sm">
                                {account.name?.charAt(0)?.toUpperCase() || account.email?.charAt(0)?.toUpperCase() || 'G'}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <p className="font-semibold text-gray-900 truncate group-hover:text-[#00b8a9] transition-colors">
                              Login sebagai {account.name || 'User'}
                            </p>
                            <p className="text-sm text-gray-600 truncate">{account.email}</p>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 group-hover:text-[#00b8a9] transition-colors">
                            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                              <g fill="none" fillRule="evenodd">
                                <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                                <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.348 6.173 0 7.55 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                              </g>
                            </svg>
                            <ChevronDown size={16} className="opacity-50" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          <div className="w-full" ref={googleLoginRef}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              text="signin_with"
              shape="rectangular"
              logo_alignment="left"
              width="100%"
              useOneTap={false}
            />
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Belum punya akun?{' '}
              <Link to="/register" className="text-[#00b8a9] font-bold hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home - Teks Gelap */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-800 hover:text-black text-sm font-medium">
            ← Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}