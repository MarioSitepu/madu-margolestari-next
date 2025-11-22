import { useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  UserIcon,
  UserCircleIcon,
  ArrowRightIcon,
  Tag,
} from "lucide-react";
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

function truncateText(text: string, maxWords: number): string {
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
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
    description:
      "Madu alami ini kaya akan antioksidan, vitamin, dan mineral yang dapat membantu meningkatkan daya tahan tubuh",
    author: "Madu Margo Lestari",
  };

  const articleData = article || defaultArticle;

  const handleLihatGaleri = () => {
    navigate(`/article-galeri/${articleData.id}`);
  };

  return (
    <div className="relative aspect-square bg-[#01b8a9] border-[6px] border-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* BAGIAN GAMBAR — FIXED HEIGHT (50%) */}
      <div className="absolute top-0 left-0 w-full h-1/2 pb-4 overflow-hidden">
        <img
          src={articleData.image}
          alt={articleData.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* BAGIAN CAPTION — AUTOMATIS AMBIL SISA RUANG */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 p-4 pt-0 sm:p-5 sm:pt-0 md:p-6 md:pt-0 text-white flex flex-col justify-between">
        <div>
          <div className="flex items-center text-sm mb-2 opacity-90">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span className="font-medium">{articleData.date}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">
            {articleData.title}
          </h3>

          <p className="text-sm leading-relaxed mb-3 opacity-95 line-clamp-2">
            {truncateText(articleData.description, 5)}
          </p>

          {articleData.tags && (
            <div className="flex flex-wrap gap-2 mb-3 hidden sm:flex">
              {articleData.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 text-white text-xs rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-white/20">
          <div className="flex items-center">
            <UserCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            <span className="text-xs sm:text-sm font-semibold text-[#ffde7d] truncate">
              {articleData.author}
            </span>
          </div>

          <button
            onClick={handleLihatGaleri}
            className="bg-white text-[#00b8a9] text-xs sm:text-sm font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 hover:bg-[#ffde7d] transition-all duration-300 hover:scale-105"
          >
            <span>Lihat Galeri</span>
            <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
