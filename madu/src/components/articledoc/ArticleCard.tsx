import { useNavigate } from 'react-router-dom';
import { CalendarIcon, UserIcon, UserCircleIcon, ArrowRightIcon, Tag } from 'lucide-react';
import defaultArticleImage from "@/assets/marles-honey.png";

interface ArticleData {
  id: string | number;
  image: string;
  date: string;
  participants: number;
  title: string;
  description: string;
  author: string;
  tags?: string[];
}

interface ArticleCardProps {
  article?: ArticleData;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const navigate = useNavigate();

  // Default data if no article prop is provided
  const defaultArticle: ArticleData = {
    id: 1,
    image: defaultArticleImage,
    date: "26 Desember 2024",
    participants: 60,
    title: "Pengambilan Madu",
    description: "Madu alami ini kaya akan antioksidan, vitamin, dan mineral yang dapat membantu meningkatkan daya tahan tubuh",
    author: "Madu Margo Lestari"
  };

  const articleData = article || defaultArticle;

  const handleLihatGaleri = () => {
    navigate(`/article-galeri/${articleData.id}`);
  };

  return <div className="bg-[#00b8a9] border-[6px] border-[#ffde7d] rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="h-56 relative overflow-hidden">
        <img 
          src={articleData.image} 
          alt={`Gambar artikel ${articleData.title} - Dokumentasi dan informasi tentang madu dari Madu Margo Lestari`}
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
        <p className="text-sm leading-relaxed mb-4 opacity-95 line-clamp-3">
          {articleData.description}
        </p>
        
        {/* Tags */}
        {articleData.tags && articleData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {articleData.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-[#ffde7d]/30 text-white text-xs rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {articleData.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 bg-[#ffde7d]/30 text-white text-xs rounded-full">
                +{articleData.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-[#ffde7d]/30">
          <div className="flex items-center">
            <UserCircleIcon className="h-5 w-5 mr-2" />
            <span className="text-sm font-semibold text-[#ffde7d]">{articleData.author}</span>
          </div>
          <button 
            onClick={handleLihatGaleri}
            className="bg-[#ffde7d] text-[#00b8a9] text-sm font-semibold py-2.5 px-5 rounded-lg shadow-md flex items-center gap-2 hover:bg-[#f5c869] hover:text-[#00b8a9] transition-all duration-300 hover:scale-105"
          >
            <span>Lihat Galeri</span>
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>;
}