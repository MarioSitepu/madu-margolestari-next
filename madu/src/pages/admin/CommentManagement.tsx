import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { ArrowLeft, Trash2, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/lib/api';

interface Comment {
  _id: string;
  content: string;
  authorName: string;
  authorAvatar?: string;
  likes: number;
  articleId: {
    _id: string;
    title: string;
  };
  createdAt: string;
}

export function CommentManagement() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/admin/login');
      return;
    }

    if (user?.role === 'admin') {
      fetchComments();
    }
  }, [user, isLoading, navigate]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/comments`);
      if (response.data.success) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus komentar ini?')) return;

    try {
      await axios.delete(`${API_URL}/comments/${id}`);
      setComments(comments.filter(c => c._id !== id));
      alert('Komentar berhasil dihapus');
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Gagal menghapus komentar');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ffde7d] to-[#f4d58d] flex items-center justify-center">
        <div className="text-gray-900 text-xl" style={{ fontFamily: 'Nort, sans-serif' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#ffde7d] via-[#f9e4a3] to-[#f4d58d] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Nort, sans-serif' }}>Kelola Komentar</h1>
        </div>

        <Card className="p-4 sm:p-6 md:p-8 bg-white/98 backdrop-blur-md rounded-2xl border border-white/40 shadow-[0_20px_60px_rgba(255,222,125,0.15)] hover:shadow-[0_25px_70px_rgba(255,222,125,0.2)] transition-all duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ffde7d]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="mb-4 sm:mb-6 relative z-10">
            <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: 'Nort, sans-serif' }}>Total Komentar: <span className="font-bold text-[#ffde7d] text-lg sm:text-xl">{comments.length}</span></p>
          </div>
          {comments.length === 0 ? (
            <div className="text-center py-12 relative z-10">
              <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Belum ada komentar</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4 relative z-10">
              {comments.map((comment) => (
                <div key={comment._id} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200/50 rounded-lg hover:bg-white/80 hover:shadow-md transition-all duration-300 bg-white/60 backdrop-blur-sm">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {comment.authorAvatar ? (
                        <img 
                          src={comment.authorAvatar} 
                          alt={comment.authorName}
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#00b8a9] flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {comment.authorName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="font-semibold text-gray-900 truncate" style={{ fontFamily: 'Nort, sans-serif' }}>{comment.authorName}</span>
                      <span className="text-xs text-gray-500 hidden sm:inline whitespace-nowrap">
                        • {new Date(comment.createdAt).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 sm:hidden block mb-2">
                      {new Date(comment.createdAt).toLocaleString('id-ID')}
                    </span>
                    <p className="text-sm sm:text-base text-gray-700 mb-2 break-words">{comment.content}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <span className="truncate">Artikel: {comment.articleId?.title || 'N/A'}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="whitespace-nowrap">{comment.likes} likes</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(comment._id)}
                    className="text-red-600 hover:text-red-700 w-full sm:w-auto sm:ml-4"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sm:hidden ml-2">Hapus</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}


