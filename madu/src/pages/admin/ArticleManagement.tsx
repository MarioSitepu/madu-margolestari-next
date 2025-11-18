import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { Plus, Edit, Trash2, Eye, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Article {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  backgroundImage: string;
  published: boolean;
  views: number;
  createdAt: string;
  authorName: string;
}

export function ArticleManagement() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/admin/login');
      return;
    }

    if (user?.role === 'admin') {
      fetchArticles();
    }
  }, [user, isLoading, navigate]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/articles/all`);
      if (response.data.success) {
        setArticles(response.data.articles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;

    try {
      await axios.delete(`${API_URL}/articles/${id}`);
      setArticles(articles.filter(a => a._id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Gagal menghapus artikel');
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" className="bg-white/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <h1 className="text-4xl font-black text-white">Kelola Artikel</h1>
          </div>
          <Link to="/admin/articles/new">
            <Button className="bg-[#00b8a9] hover:bg-[#009c91] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Buat Artikel Baru
            </Button>
          </Link>
        </div>

        <Card className="p-6 bg-white/95">
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Belum ada artikel</p>
              <Link to="/admin/articles/new">
                <Button className="bg-[#00b8a9] hover:bg-[#009c91] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Artikel Pertama
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{article.title}</h3>
                      {!article.published && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Draft</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{article.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Oleh: {article.authorName}</span>
                      <span>•</span>
                      <span>{article.views} views</span>
                      <span>•</span>
                      <span>{new Date(article.createdAt).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/articles/${article._id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(article._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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


