import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { ArrowLeft, Trash2, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
          <h1 className="text-4xl font-black text-white">Kelola Komentar</h1>
        </div>

        <Card className="p-6 bg-white/95">
          <div className="mb-4">
            <p className="text-gray-600">Total Komentar: <span className="font-bold text-[#00b8a9]">{comments.length}</span></p>
          </div>
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada komentar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment._id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {comment.authorAvatar ? (
                        <img 
                          src={comment.authorAvatar} 
                          alt={comment.authorName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#00b8a9] flex items-center justify-center text-white font-bold text-sm">
                          {comment.authorName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="font-semibold text-gray-900">{comment.authorName}</span>
                      <span className="text-xs text-gray-500">
                        • {new Date(comment.createdAt).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{comment.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Artikel: {comment.articleId?.title || 'N/A'}</span>
                      <span>•</span>
                      <span>{comment.likes} likes</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(comment._id)}
                    className="text-red-600 hover:text-red-700 ml-4"
                  >
                    <Trash2 className="w-4 h-4" />
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


