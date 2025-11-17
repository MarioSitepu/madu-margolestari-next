import { ArticleCard } from './ArticleCard';

export function ArticleGrid() {
  const articles = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800&h=600&fit=crop&crop=center",
      date: "26 Desember 2024",
      participants: 60,
      title: "Pengambilan Madu",
      description: "Madu alami ini kaya akan antioksidan, vitamin, dan mineral yang dapat membantu meningkatkan daya tahan tubuh",
      author: "Marles"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop&crop=center",
      date: "20 Desember 2024",
      participants: 45,
      title: "Pelatihan Budidaya Lebah",
      description: "Pelajari teknik modern dalam budidaya lebah madu untuk menghasilkan produk berkualitas tinggi",
      author: "Ahmad Subari"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1516824711217-8b7b8a1dd8b4?w=800&h=600&fit=crop&crop=center",
      date: "15 Desember 2024",
      participants: 80,
      title: "Festival Madu Nusantara",
      description: "Acara tahunan yang menampilkan berbagai jenis madu dari seluruh Indonesia dengan cita rasa unik",
      author: "Siti Nurhaliza"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center",
      date: "10 Desember 2024",
      participants: 35,
      title: "Workshop Produk Olahan Madu",
      description: "Belajar membuat berbagai produk olahan madu seperti sabun, lilin, dan kosmetik alami",
      author: "Budi Santoso"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&h=600&fit=crop&crop=center",
      date: "5 Desember 2024",
      participants: 25,
      title: "Eksplorasi Hutan Madu",
      description: "Jelajahi hutan alami tempat lebah liar menghasilkan madu dengan kualitas dan rasa yang istimewa",
      author: "Rina Kartika"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1614115153627-d6d80dedb4b7?w=800&h=600&fit=crop&crop=center",
      date: "1 Desember 2024",
      participants: 55,
      title: "Seminar Manfaat Madu untuk Kesehatan",
      description: "Diskusi mendalam tentang kandungan nutrisi madu dan manfaatnya bagi kesehatan tubuh manusia",
      author: "Dr. Maya Sari"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map((article, index) => (
          <div
            key={article.id}
            className="animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}