import React, { useState, useEffect } from 'react';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '@/lib/api';

export function ResetPassword() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    if (!token) {
      setTokenError(true);
      setIsVerifying(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/verify-reset-token`, {
        token
      });

      if (response.data.success) {
        setEmail(response.data.email);
        setTokenError(false);
      }
    } catch (error: any) {
      console.error('Token verification error:', error);
      setTokenError(true);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!password.trim() || !confirmPassword.trim()) {
      setError('Password dan konfirmasi password harus diisi');
      return;
    }

    if (password.length < 6) {
      setError('Password harus minimal 6 karakter');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        token,
        password,
        confirmPassword
      });

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error: any) {
      console.error('Reset password error:', error);
      let errorMessage = 'Terjadi kesalahan saat mengubah password';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message === 'Network Error') {
        errorMessage = 'Network Error: Tidak dapat terhubung ke server.';
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <div className={`min-h-screen w-full bg-gradient-to-br from-[#00b8a9] to-[#009c91] flex items-center justify-center px-4 py-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-white text-lg">Memverifikasi token...</p>
        </div>
      </div>
    );
  }

  if (tokenError) {
    return (
      <div className={`min-h-screen w-full bg-gradient-to-br from-[#00b8a9] to-[#009c91] flex items-center justify-center px-4 py-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#00b8a9] to-[#009c91] px-6 py-8 md:px-8 md:py-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Link Tidak Valid
              </h1>
              <p className="text-white/90 text-sm md:text-base">
                Token reset password tidak valid atau sudah kadaluarsa
              </p>
            </div>

            <div className="p-6 md:p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-red-100 rounded-full">
                  <AlertCircle className="w-12 h-12 text-red-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Token Kadaluarsa
              </h2>
              <p className="text-gray-600 mb-6">
                Link reset password tidak valid atau sudah kadaluarsa. Silakan minta link baru.
              </p>
              <Link 
                to="/forgot-password"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00b8a9] hover:bg-[#009c91] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                Minta Link Baru
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br from-[#00b8a9] to-[#009c91] flex items-center justify-center px-4 py-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00b8a9] to-[#009c91] px-6 py-8 md:px-8 md:py-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Reset Password
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              Masukkan password baru untuk akun Anda
            </p>
          </div>

          {/* Form Container */}
          <div className="p-6 md:p-8">
            {success ? (
              <div className="text-center py-8 animate-fade-up">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-full">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Password Berhasil Diubah!
                </h2>
                <p className="text-gray-600 mb-6">
                  Anda akan dialihkan ke halaman login dalam beberapa detik...
                </p>
                <Link 
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00b8a9] hover:bg-[#009c91] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Ke Halaman Login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Display */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Email:</p>
                  <p className="font-semibold text-gray-900">{email}</p>
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password Baru
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#00b8a9] w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      placeholder="Minimal 6 karakter"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#00b8a9] focus:ring-2 focus:ring-[#00b8a9]/20 transition-all duration-300 bg-gray-50 focus:bg-white"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#00b8a9] w-5 h-5" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError('');
                      }}
                      placeholder="Konfirmasi password baru"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#00b8a9] focus:ring-2 focus:ring-[#00b8a9]/20 transition-all duration-300 bg-gray-50 focus:bg-white"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-shake">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#00b8a9] to-[#009c91] hover:from-[#009c91] hover:to-[#008b7e] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2 shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Mengubah Password...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Ubah Password
                    </>
                  )}
                </button>

                {/* Back to Login */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm">
                    Ingat password Anda?{' '}
                    <Link to="/login" className="text-[#00b8a9] hover:text-[#009c91] font-semibold transition-colors">
                      Kembali ke Login
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-6 text-white/80 text-xs">
          <p>
            Pertanyaan? Hubungi{' '}
            <a href="mailto:support@madumargolestari.com" className="hover:text-white underline">
              support@madumargolestari.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
