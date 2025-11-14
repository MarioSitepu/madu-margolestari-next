import React from 'react';
import { CalendarIcon, UserIcon, UserCircleIcon, ArrowRightIcon } from 'lucide-react';

interface ArticleData {
  id: number;
  image: string;
  date: string;
  participants: number;
  title: string;
  description: string;
  author: string;
}

interface ArticleCardProps {
  article?: ArticleData;
}

export function ArticleCard({ article }: ArticleCardProps) {
  // Default data if no article prop is provided
  const defaultArticle: ArticleData = {
    id: 1,
    image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800&h=600&fit=crop&crop=center",
    date: "26 Desember 2024",
    participants: 60,
    title: "Pengambilan Madu",
    description: "Madu alami ini kaya akan antioksidan, vitamin, dan mineral yang dapat membantu meningkatkan daya tahan tubuh",
    author: "Marles"
  };

  const articleData = article || defaultArticle;

  return <div className="bg-[#00b8a9] border-[6px] border-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="h-56 relative overflow-hidden">
        <img 
          src={articleData.image} 
          alt={articleData.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <div className="p-6 text-white">
        <div className="flex items-center text-sm mb-3 opacity-90">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <span className="font-medium">{articleData.date}</span>
        </div>
        <div className="flex items-center text-sm mb-5 opacity-90">
          <UserIcon className="h-4 w-4 mr-2" />
          <span className="font-medium">{articleData.participants} peserta</span>
        </div>
        <h3 className="text-2xl font-bold mb-3">{articleData.title}</h3>
        <p className="text-sm leading-relaxed mb-8 opacity-95">
          {articleData.description}
        </p>
        <div className="flex justify-between items-center pt-4 border-t border-white/20">
          <div className="flex items-center">
            <UserCircleIcon className="h-5 w-5 mr-2" />
            <span className="text-sm font-semibold text-[#ffde7d]">{articleData.author}</span>
          </div>
          <button className="bg-white text-[#00b8a9] text-sm font-semibold py-2.5 px-5 rounded-lg shadow-md flex items-center gap-2 hover:bg-[#ffde7d] hover:text-[#00b8a9] transition-all">
            <span>Lihat Galeri</span>
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>;
}