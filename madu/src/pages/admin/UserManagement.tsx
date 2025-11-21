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

export function UserManagement() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00b8a9] via-[#00a298] to-[#009c91] flex items-center justify-center">
        <div className="text-white text-xl" style={{ fontFamily: 'Nort, sans-serif' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#00b8a9] via-[#00a298] to-[#009c91] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Link to="/dashboard">
            <Button variant="outline" className="bg-white/90 hover:bg-white shadow-md backdrop-blur-sm border-2 border-white/50 h-10 sm:h-11" style={{ fontFamily: 'Nort, sans-serif' }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Kembali</span>
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Nort, sans-serif' }}>Kelola Users</h1>
        </div>

        <Card className="p-4 sm:p-6 md:p-8 bg-white/98 backdrop-blur-md rounded-2xl border border-white/40 shadow-[0_20px_60px_rgba(0,184,169,0.15)] hover:shadow-[0_25px_70px_rgba(0,184,169,0.2)] transition-all duration-500 relative overflow-hidden group">
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
              {users.map((userItem) => (
                <div key={userItem._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200/50 rounded-lg hover:bg-white/80 hover:shadow-md transition-all duration-300 bg-white/60 backdrop-blur-sm">
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
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}


