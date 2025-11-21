import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { ArrowLeft, Shield, User as UserIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import honeyBg from "@/assets/honey-bg-6badc9.png";
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
      <div className="min-h-screen bg-gradient-to-br from-[#ffde7d] to-[#00b8a9] flex items-center justify-center">
        <div className="text-white text-xl" style={{ fontFamily: 'Nort, sans-serif' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#ffde7d] to-[#00b8a9] py-8 px-4">
      {/* Background Honey Image */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <img 
          src={honeyBg} 
          alt="Honey background" 
          className="w-full h-full object-cover"
          style={{ transform: 'scale(1.1)' }}
        />
      </div>
      
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard">
            <Button variant="outline" className="bg-white/90 hover:bg-white shadow-md backdrop-blur-sm border-2 border-white/50" style={{ fontFamily: 'Nort, sans-serif' }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <h1 className="text-4xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Nort, sans-serif' }}>Kelola Users</h1>
        </div>

        <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-white/50 shadow-2xl">
          <div className="mb-4">
            <p className="text-gray-600" style={{ fontFamily: 'Nort, sans-serif' }}>Total Users: <span className="font-bold text-[#00b8a9]">{users.length}</span></p>
          </div>
          {users.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Belum ada user</p>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((userItem) => (
                <div key={userItem._id} className="flex items-center justify-between p-4 border-2 border-gray-200/50 rounded-lg hover:bg-white/80 hover:shadow-md transition-all duration-300 bg-white/60 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    {userItem.avatar ? (
                      <img 
                        src={userItem.avatar} 
                        alt={userItem.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#00b8a9] flex items-center justify-center text-white font-bold text-lg">
                        {userItem.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Nort, sans-serif' }}>{userItem.name}</h3>
                        {userItem.role === 'admin' ? (
                          <Shield className="w-4 h-4 text-[#b8860b]" />
                        ) : (
                          <UserIcon className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{userItem.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 text-xs rounded ${
                          userItem.role === 'admin' 
                            ? 'bg-[#b8860b]/20 text-[#b8860b]' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {userItem.role}
                        </span>
                        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                          {userItem.provider}
                        </span>
                        <span className="text-xs text-gray-500">
                          Bergabung: {new Date(userItem.createdAt).toLocaleDateString('id-ID')}
                        </span>
                      </div>
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


