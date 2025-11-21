import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { ArrowLeft, Shield, User as UserIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  provider: string;
  avatar?: string;
  createdAt: string;
}

// Role Change Modal Component
interface RoleModalProps {
  isOpen: boolean;
  userId: string;
  userName: string;
  currentRole: string;
  onClose: () => void;
  onConfirm: (role: string) => void;
  isLoading: boolean;
}

const RoleChangeModal = ({ isOpen, userName, currentRole, onClose, onConfirm, isLoading }: RoleModalProps) => {
  if (!isOpen) return null;

  const newRole = currentRole === 'admin' ? 'user' : 'admin';
  const actionText = currentRole === 'admin' ? 'menurunkan' : 'menaikkan';
  const roleText = newRole === 'admin' ? 'Admin' : 'User Biasa';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Nort, sans-serif' }}>Ubah Role User</h3>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-4">
          <p className="text-gray-700">
            Apakah Anda yakin ingin <span className="font-bold">{actionText}</span> <span className="font-bold text-blue-600">{userName}</span> menjadi <span className="font-bold">{roleText}</span>?
          </p>
          <p className="text-sm text-gray-500">
            {newRole === 'admin' 
              ? 'User ini akan mendapatkan akses admin dashboard' 
              : 'User ini akan kehilangan akses admin dashboard'}
          </p>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={() => onConfirm(newRole)}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Mengubah...
              </>
            ) : (
              'Ya, Ubah Role'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export function UserManagement() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);
  const [roleModal, setRoleModal] = useState<{ isOpen: boolean; userId: string; userName: string; currentRole: string }>({
    isOpen: false,
    userId: '',
    userName: '',
    currentRole: ''
  });

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/admin/login');
      return;
    }

    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user, isLoading, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/users`);
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      setUpdatingRole(userId);
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/admin/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Update local state
        setUsers(users.map(u => 
          u._id === userId ? { ...u, role: newRole } : u
        ));
        setRoleModal({ isOpen: false, userId: '', userName: '', currentRole: '' });
      }
    } catch (error: any) {
      console.error('Error updating user role:', error);
      alert(error.response?.data?.message || 'Gagal mengubah role user');
    } finally {
      setUpdatingRole(null);
    }
  };

  const openRoleModal = (userId: string, userName: string, currentRole: string) => {
    // Prevent user from changing their own role
    if (user?.id === userId) {
      alert('Anda tidak bisa mengubah role Anda sendiri');
      return;
    }
    setRoleModal({
      isOpen: true,
      userId,
      userName,
      currentRole
    });
  };

  const closeRoleModal = () => {
    setRoleModal({ isOpen: false, userId: '', userName: '', currentRole: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00b8a9] via-[#00a298] to-[#009c91] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl font-semibold" style={{ fontFamily: 'Nort, sans-serif' }}>Loading...</div>
        </div>
      </div>
    );
  }

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
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slideInFromLeft 0.5s ease-out forwards;
        }
      `}</style>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#00b8a9] via-[#00a298] to-[#009c91] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8 animate-slide-in-left" style={{ opacity: 0 }}>
          <Link to="/dashboard">
            <Button variant="outline" className="bg-white/90 hover:bg-white shadow-md backdrop-blur-sm border-2 border-white/50 h-10 sm:h-11 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ fontFamily: 'Nort, sans-serif' }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Kembali</span>
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Nort, sans-serif' }}>Kelola Users</h1>
        </div>

        <Card className="p-4 sm:p-6 md:p-8 bg-white/98 backdrop-blur-md rounded-2xl border border-white/40 shadow-[0_20px_60px_rgba(0,184,169,0.15)] hover:shadow-[0_25px_70px_rgba(0,184,169,0.2)] transition-all duration-500 relative overflow-hidden group animate-fade-up" style={{ opacity: 0, animationDelay: '0.3s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#00b8a9]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="mb-4 sm:mb-6 relative z-10">
            <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: 'Nort, sans-serif' }}>Total Users: <span className="font-bold text-[#00b8a9] text-lg sm:text-xl">{users.length}</span></p>
          </div>
          {users.length === 0 ? (
            <div className="text-center py-12 relative z-10">
              <p className="text-gray-500 text-lg">Belum ada user</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4 relative z-10">
              {users.map((userItem, index) => (
                <div key={userItem._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200/50 rounded-lg hover:bg-white/80 hover:shadow-md transition-all duration-300 bg-white/60 backdrop-blur-sm animate-fade-up" style={{ opacity: 0, animationDelay: `${0.4 + index * 0.1}s` }}>
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
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
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate" style={{ fontFamily: 'Nort, sans-serif' }}>{userItem.name}</h3>
                        {userItem.role === 'admin' ? (
                          <Shield className="w-4 h-4 text-[#b8860b] shrink-0" />
                        ) : (
                          <UserIcon className="w-4 h-4 text-gray-400 shrink-0" />
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
                        <span className="text-xs text-gray-500 hidden sm:inline whitespace-nowrap">
                          Bergabung: {new Date(userItem.createdAt).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 sm:hidden block mt-1">
                        Bergabung: {new Date(userItem.createdAt).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => openRoleModal(userItem._id, userItem.name, userItem.role)}
                      disabled={updatingRole === userItem._id || user?.id === userItem._id}
                      className={`px-3 py-2 text-xs sm:text-sm rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                        userItem.role === 'admin'
                          ? 'bg-orange-100 hover:bg-orange-200 text-orange-700 disabled:opacity-50'
                          : 'bg-green-100 hover:bg-green-200 text-green-700 disabled:opacity-50'
                      }`}
                    >
                      {updatingRole === userItem._id ? (
                        <span className="flex items-center gap-1">
                          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span className="hidden sm:inline">Updating...</span>
                        </span>
                      ) : (
                        userItem.role === 'admin' ? 'Jadikan User' : 'Jadikan Admin'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>

    {/* Role Change Modal */}
    <RoleChangeModal
      isOpen={roleModal.isOpen}
      userId={roleModal.userId}
      userName={roleModal.userName}
      currentRole={roleModal.currentRole}
      onClose={closeRoleModal}
      onConfirm={(newRole) => updateUserRole(roleModal.userId, newRole)}
      isLoading={updatingRole === roleModal.userId}
    />
    </>
  );
}


