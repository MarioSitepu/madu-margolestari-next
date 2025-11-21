import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, X, User, Mail, Calendar, Shield, ArrowLeft, Save, Edit2, Check, X as XIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { API_URL } from '@/lib/api';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'local' | 'google';
  isVerified: boolean;
  createdAt?: string;
}

export function Settings() {
  const { user, updateUser, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [updatingName, setUpdatingName] = useState(false);
  const [nameError, setNameError] = useState('');
  const [nameSuccess, setNameSuccess] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      fetchUserProfile();
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (userProfile) {
      setNewName(userProfile.name);
    }
  }, [userProfile]);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5MB');
      return;
    }

    setError('');
    setSuccess('');
    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Pilih foto terlebih dahulu');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('avatar', selectedFile);

      const response = await axios.post(`${API_URL}/auth/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSuccess('Foto profil berhasil diupdate!');
        setUserProfile(response.data.user);
        setPreview(null);
        setSelectedFile(null);
        
        // Clear file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Update user data in context
        updateUser(response.data.user);
      }
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      setError(
        error.response?.data?.message || 
        'Gagal mengupload foto profil. Pastikan backend server berjalan dan Supabase sudah dikonfigurasi.'
      );
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setSelectedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpdateName = async () => {
    if (!newName || newName.trim().length < 2) {
      setNameError('Nama harus minimal 2 karakter');
      return;
    }

    if (newName.trim().length > 100) {
      setNameError('Nama maksimal 100 karakter');
      return;
    }

    if (newName.trim() === userProfile?.name) {
      setIsEditingName(false);
      return;
    }

    setUpdatingName(true);
    setNameError('');
    setNameSuccess('');

    try {
      const response = await axios.put(`${API_URL}/auth/username`, {
        name: newName.trim()
      });

      if (response.data.success) {
        setNameSuccess('Username berhasil diupdate!');
        setUserProfile(response.data.user);
        setIsEditingName(false);
        
        // Update user data in context
        updateUser(response.data.user);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setNameSuccess('');
        }, 3000);
      }
    } catch (error: any) {
      console.error('Error updating username:', error);
      setNameError(
        error.response?.data?.message || 
        'Gagal mengupdate username. Silakan coba lagi.'
      );
    } finally {
      setUpdatingName(false);
    }
  };

  const handleCancelEditName = () => {
    setNewName(userProfile?.name || '');
    setIsEditingName(false);
    setNameError('');
    setNameSuccess('');
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Tidak tersedia';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (authLoading || loading) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffde7d] to-[#00b8a9] py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-all duration-300 hover:translate-x-[-4px]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Dashboard</span>
          </button>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            Pengaturan
          </h1>
          <p className="text-white/90 text-lg">
            Kelola profil dan preferensi akun Anda
          </p>
        </div>

        {/* Profile Picture Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6 animate-scale-in">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Foto Profil</h2>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Current Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00b8a9] to-[#ffde7d] flex items-center justify-center overflow-hidden shadow-lg border-4 border-white">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : userProfile.avatar ? (
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-black text-4xl">
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

            {/* Upload Controls */}
            <div className="flex-1 w-full">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="avatar-upload"
                    className="flex items-center justify-center gap-2 bg-[#00b8a9] hover:bg-[#00a298] text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer w-full md:w-auto"
                  >
                    <Camera className="w-5 h-5" />
                    {preview ? 'Ganti Foto' : 'Pilih Foto'}
                  </label>
                  <input
                    ref={fileInputRef}
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Format: JPG, PNG, GIF (Maks. 5MB)
                  </p>
                </div>

                {preview && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Mengupload...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Simpan Foto
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={uploading}
                      className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
                    >
                      <X className="w-5 h-5" />
                      Batal
                    </button>
                  </div>
                )}
              </div>

              {/* Messages */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm">{success}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl font-black text-gray-900 mb-6">Informasi Akun</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-4">
                <User className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">Nama</div>
                  {isEditingName ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => {
                          setNewName(e.target.value);
                          setNameError('');
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent outline-none transition-all font-semibold text-gray-900"
                        placeholder="Masukkan nama baru"
                        disabled={updatingName}
                        maxLength={100}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleUpdateName}
                          disabled={updatingName || !newName.trim() || newName.trim() === userProfile?.name}
                          className="flex items-center gap-2 bg-[#00b8a9] hover:bg-[#00a298] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {updatingName ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Menyimpan...
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4" />
                              Simpan
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleCancelEditName}
                          disabled={updatingName}
                          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
                        >
                          <XIcon className="w-4 h-4" />
                          Batal
                        </button>
                      </div>
                      {nameError && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-red-700 text-sm">{nameError}</p>
                        </div>
                      )}
                      {nameSuccess && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-green-700 text-sm">{nameSuccess}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-gray-900">{userProfile.name}</div>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="flex items-center gap-2 text-[#00b8a9] hover:text-[#00a298] font-semibold transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <div className="text-sm text-gray-500 mb-1">Email</div>
                <div className="font-semibold text-gray-900">{userProfile.email}</div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <div className="text-sm text-gray-500 mb-1">Bergabung</div>
                <div className="font-semibold text-gray-900">
                  {formatDate(userProfile.createdAt)}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <div className="text-sm text-gray-500 mb-1">Metode Login</div>
                <div className="font-semibold text-gray-900 capitalize">
                  {userProfile.provider === 'google' ? 'Google' : 'Email'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

