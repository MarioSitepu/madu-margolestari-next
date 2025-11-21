import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { ArticleCard } from './ArticleCard';
import defaultArticleImage from "@/assets/marles-honey.png";
import { API_URL } from '@/lib/api';

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

interface ArticleGridProps {
  searchQuery: string;
  sortBy: 'newest' | 'most-viewed';
}

export function ArticleGrid({ searchQuery, sortBy }: ArticleGridProps) {
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

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'most-viewed') {
      result.sort((a, b) => b.views - a.views);
    }

    return result;
  }, [articles, searchQuery, sortBy]);

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

  if (filteredArticles.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Tidak ada artikel yang sesuai dengan pencarian</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="mb-6">
        <p className="text-gray-600 text-sm">
          Menampilkan <span className="font-semibold text-[#00b8a9]">{filteredArticles.length}</span> dari <span className="font-semibold text-[#00b8a9]">{articles.length}</span> artikel
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredArticles.map((article, index) => (
          <div
            key={article._id}
            className="animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ArticleCard 
              article={{
                id: article._id,
                image: article.image || article.backgroundImage || defaultArticleImage,
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