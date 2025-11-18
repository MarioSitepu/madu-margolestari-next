import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArticleCard } from './ArticleCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Article {
  _id: string;
  title: string;
  description: string;
  image: string;
  backgroundImage?: string;
  authorName: string;
  createdAt: string;
  views: number;
  published: boolean;
  tags?: string[];
}

export function ArticleGrid() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/articles`);
      if (response.data.success) {
        setArticles(response.data.articles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b8a9]"></div>
          <p className="mt-4 text-gray-600">Memuat artikel...</p>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Belum ada artikel yang dipublikasikan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map((article, index) => (
          <div
            key={article._id}
            className="animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ArticleCard 
              article={{
                id: article._id,
                image: article.image || article.backgroundImage || "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800&h=600&fit=crop&crop=center",
                date: formatDate(article.createdAt),
                participants: article.views || 0,
                title: article.title,
                description: article.description,
                author: article.authorName,
                tags: article.tags || []
              }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}