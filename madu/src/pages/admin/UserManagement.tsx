import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { ArrowLeft, Shield, User as UserIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffde7d] to-[#00b8a9] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard">
            <Button variant="outline" className="bg-white/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <h1 className="text-4xl font-black text-white">Kelola Users</h1>
        </div>

        <Card className="p-6 bg-white/95">
          <div className="mb-4">
            <p className="text-gray-600">Total Users: <span className="font-bold text-[#00b8a9]">{users.length}</span></p>
          </div>
          {users.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Belum ada user</p>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((userItem) => (
                <div key={userItem._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
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
                        <h3 className="text-lg font-bold text-gray-900">{userItem.name}</h3>
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


