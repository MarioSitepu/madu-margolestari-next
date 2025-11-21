import React, { useState, useEffect } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '@/lib/api';

export function ForgotPassword() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Silakan masukkan email Anda');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email tidak valid');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
        email
      });

      if (response.data.success) {
        setSuccess(true);
        setSubmitted(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (error: any) {
      console.error('Forgot password error:', error);
      let errorMessage = 'Terjadi kesalahan saat mengirim permintaan reset password';

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
    <div className={`min-h-screen w-full bg-gradient-to-br from-[#00b8a9] to-[#009c91] flex items-center justify-center px-4 py-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00b8a9] to-[#009c91] px-6 py-8 md:px-8 md:py-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Lupa Password?
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              Kami akan membantu Anda mengatur ulang password
            </p>
          </div>

          {/* Form Container */}
          <div className="p-6 md:p-8">
            {submitted && success ? (
              <div className="text-center py-8 animate-fade-up">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-full">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Email Terkirim!
                </h2>
                <p className="text-gray-600 mb-4">
                  Kami telah mengirimkan link reset password ke email <span className="font-semibold text-[#00b8a9]">{email}</span>
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-gray-700">
                  <p>
                    <strong>Catatan:</strong> Silakan cek folder spam jika Anda tidak menerima email dalam beberapa menit.
                  </p>
                </div>
                <Link 
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00b8a9] hover:bg-[#009c91] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Info Text */}
                <p className="text-gray-600 text-sm">
                  Masukkan email yang terdaftar di akun Anda, dan kami akan mengirimkan link untuk mengatur ulang password Anda.
                </p>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#00b8a9] w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      placeholder="nama@email.com"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#00b8a9] focus:ring-2 focus:ring-[#00b8a9]/20 transition-all duration-300 bg-gray-50 focus:bg-white"
                      disabled={isLoading}
                    />
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
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Kirim Link Reset
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-gray-500 text-sm">atau</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Back to Login Link */}
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 text-[#00b8a9] hover:text-[#009c91] font-semibold transition-colors duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Login
                </Link>
              </form>
            )}

            {/* Help Text */}
            {!submitted && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-600 text-xs md:text-sm">
                  Belum punya akun?{' '}
                  <Link to="/register" className="text-[#00b8a9] hover:text-[#009c91] font-semibold transition-colors">
                    Daftar di sini
                  </Link>
                </p>
              </div>
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

export default ForgotPassword;
