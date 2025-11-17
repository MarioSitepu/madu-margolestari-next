import { useState } from "react";
import { MessageCircle, Send, Heart, MoreVertical } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import marlesHoney from "@/assets/marles-honey.png";

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export function ArticleGaleri() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Ahmad Subari",
      content: "Artikel yang sangat informatif! Madu Marles memang berkualitas tinggi.",
      createdAt: "2 jam yang lalu",
      likes: 12,
      isLiked: false,
    },
    {
      id: "2",
      author: "Siti Nurhaliza",
      content: "Saya sudah mencoba produknya dan sangat puas dengan kualitasnya. Recommended!",
      createdAt: "5 jam yang lalu",
      likes: 8,
      isLiked: true,
    },
    {
      id: "3",
      author: "Budi Santoso",
      content: "Terima kasih atas informasinya. Sangat membantu untuk memahami manfaat madu.",
      createdAt: "1 hari yang lalu",
      likes: 5,
      isLiked: false,
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const postDate = "11 Agustus 2025";
  const articles: Article[] = [
    {
      id: 1,
      title: "Pengambilan Madu",
      description:
        "Madu asam di kaya akan antioksidasi, vitamin, dan mineral yang baik untuk kesehatan dan meningkatkan daya tahan tubuh.",
      image: "/images/beekeeper1.jpg",
    },
    {
      id: 2,
      title: "Pengambilan Madu",
      description:
        "Madu asam di kaya akan antioksidasi, vitamin, dan mineral yang baik untuk kesehatan dan meningkatkan daya tahan tubuh.",
      image: "/images/beekeeper2.jpg",
    },
    {
      id: 3,
      title: "Pengambilan Madu",
      description:
        "Madu asam di kaya akan antioksidasi, vitamin, dan mineral yang baik untuk kesehatan dan meningkatkan daya tahan tubuh.",
      image: "/images/beekeeper3.jpg",
    },
  ];

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        author: user.name,
        authorAvatar: user.avatar,
        content: newComment,
        createdAt: "Baru saja",
        likes: 0,
        isLiked: false,
      };
      
      setComments([comment, ...comments]);
      setNewComment("");
      setIsSubmitting(false);
    }, 500);
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
        };
      }
      return comment;
    }));
  };

  return (
    <div className="bg-[#ffde7d] min-h-screen relative">
      {/* posting date top-right */}
      <div className="absolute top-6 right-6 text-right">
        <p className="text-sm text-gray-700 font-bold">
          Diposting Pada{" "}
          <span className="text-[#00b8a9] font-semibold">{postDate}</span>
        </p>
      </div>

      {/* Header Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            Madu Marles Berhasil Memenangkan Laga
          </h1>

          {/* Main Image */}
          <div className="mb-8">
            <div className="border-4 border-[#00b8a9] rounded-lg overflow-hidden">
              <img
                src="/images/beekeeper-main.jpg"
                alt="Beekeeper with honeycomb"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Description Text */}
          <div className="space-y-4 mb-8 text-center">
            <p className="text-sm text-gray-800 leading-relaxed">
              Lorem Ipsum (Up iam "in sam/ LOR=en iP sam) is a dummy or
              placeholder text commonly used in graphic designs, publishing, and
              web development. The purpose is to permit a page layout to be
              designed, independently of the copy that will subsequently
              populate it, or to demonstrate what the visual layout of a page
              will look like if it is populated with text of a typeface without
              meaningful text that could be distracting.
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">
              Lorem Ipsum is typically a corrupted version of De finibus bonorum
              et malorum, a 1st-century BC text by the Roman statesman and
              philosopher Cicero, with words altered, added, and removed to make
              it nonsensical and improper Latin. The first two words are the
              truncation of dolorem ipsum ("Pain itself").
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">
              Versions of the Lorem Ipsum text have been used in typesetting
              since the 1960s, when advertisements for Letraset transfer sheets
              popularized it. It was introduced to the digital world in the
              mid-1980s, when Aldus employed it in graphic and word-processing
              templates for its desktop publishing program PageMaker.
            </p>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <div className="w-full bg-white relative overflow-visible py-7">
        <div className="max-w-6xl mx-auto py-5 px-6 md:px-12 relative flex items-center justify-between">
          {/* Image positioned absolute so it can "pop out" of the white section */}
          <div className="absolute left-6 top-0 -translate-y-1/2 z-30 pointer-events-none">
            <img
              src={marlesHoney}
              alt="Madu Marles Honey"
              className="w-28 md:w-36 lg:w-25 object-contain drop-shadow-2xl"
            />
          </div>

          {/* Content (give left padding so image doesn't overlap text) */}
          <div className="flex items-center gap-4 pl-28 md:pl-40">
            <div>
              <p className="text-[#00b8a9] md:text-lg lg:text-xl font-semibold leading-snug">
                Jangan lewatkan kesempatan untuk merasakan kelezatannya
                <br />
                Kunjungi toko kami dan beli sekarang juga di{" "}
                <a href="#" className="text-[#ffde7d] font-bold underline">
                  sini!
                </a>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <button
              className="
                rounded
                bg-[#ffde7d]
                text-white
                font-bold
                px-4
                py-2
                flex
                items-center
                justify-center
                gap-3
                shadow-[0_5px_7px_rgba(0,0,0,0.4)]
                hover:bg-[#f5c869]
                transition
            "
            >
              Kunjungi Sekarang <span className="ml-2">↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <section className="py-12 px-4 bg-[#ffde7d]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <Badge className="mb-4 border-[#00b8a9]/40 bg-white/70 px-4 py-2 text-sm text-[#00b8a9] shadow">
              <MessageCircle className="mr-2 h-4 w-4" />
              Diskusi
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-2">
              Komentar{" "}
              <span className="text-[#00b8a9]">
                ({comments.length})
              </span>
            </h2>
            <p className="text-gray-700 text-base">
              Bagikan pendapat dan pengalaman Anda tentang artikel ini
            </p>
          </div>

          <div className="space-y-6">
            {/* Comment Form */}
            {user ? (
              <Card className="border border-[#00b8a9]/20 bg-white p-6 shadow-sm">
                <form onSubmit={handleSubmitComment}>
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-full bg-[#00b8a9] flex items-center justify-center overflow-hidden shadow-md">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white font-bold text-lg">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <textarea
                          value={newComment}
                          onChange={(e) => {
                            setNewComment(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
                          }}
                          placeholder="Tulis komentar Anda di sini..."
                          className="w-full px-4 py-3 border border-[#00b8a9]/20 rounded-xl focus:ring-2 focus:ring-[#00b8a9] focus:border-[#00b8a9] outline-none resize-none text-sm transition-all duration-300 bg-gray-50 focus:bg-white"
                          rows={3}
                          disabled={isSubmitting}
                          maxLength={500}
                        />
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs text-gray-400">
                            {newComment.length}/500 karakter
                          </p>
                          <Button
                            type="submit"
                            disabled={!newComment.trim() || isSubmitting}
                            className="rounded-xl! bg-[#00b8a9] hover:bg-[#009c91] text-white px-6 py-2.5 text-sm shadow-md transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Mengirim...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4 mr-2" />
                                Kirim Komentar
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </Card>
            ) : (
              <Card className="border border-[#00b8a9]/20 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#00b8a9]/10 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-[#00b8a9]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm font-semibold mb-1">
                      Ingin berpartisipasi dalam diskusi?
                    </p>
                    <p className="text-gray-600 text-xs">
                      Silakan <Link to="/login" className="text-[#00b8a9] font-semibold hover:underline">masuk</Link> atau <Link to="/register" className="text-[#00b8a9] font-semibold hover:underline">daftar</Link> untuk menulis komentar
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Comments List */}
            {comments.length > 0 ? (
              <>
                {comments.map((comment, index) => (
                  <Card
                    key={comment.id}
                    className="group border border-[#00b8a9]/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex gap-4">
                      <div className="shrink-0">
                        <div className="w-12 h-12 rounded-full bg-[#00b8a9] flex items-center justify-center overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-110">
                          {comment.authorAvatar ? (
                            <img src={comment.authorAvatar} alt={comment.author} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-white font-bold text-lg">
                              {comment.author.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-black text-base lg:text-lg">
                                {comment.author}
                              </h4>
                              {comment.createdAt === "Baru saja" && (
                                <Badge className="border-[#00b8a9]/40 bg-[#00b8a9]/10 px-2 py-0.5 text-xs text-[#00b8a9]">
                                  Baru
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-500 text-xs">
                              {comment.createdAt}
                            </p>
                          </div>
                          <button 
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-all duration-300 p-1 hover:bg-gray-100 rounded"
                            title="Lainnya"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-gray-700 text-sm lg:text-base leading-relaxed mb-4 whitespace-pre-wrap wrap-break-word">
                          {comment.content}
                        </p>
                        <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => handleLikeComment(comment.id)}
                            className={`flex items-center gap-2 text-sm transition-all duration-300 ${
                              comment.isLiked
                                ? 'text-[#b8860b]'
                                : 'text-gray-500 hover:text-[#b8860b]'
                            }`}
                          >
                            <Heart className={`w-5 h-5 transition-transform duration-300 ${comment.isLiked ? 'fill-[#b8860b] text-[#b8860b] scale-110' : 'hover:scale-110'}`} />
                            <span>{comment.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            ) : (
              <Card className="border border-[#00b8a9]/20 bg-white p-12 text-center shadow-sm">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                  <MessageCircle className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="font-bold text-gray-700 text-lg mb-2">
                  Belum ada komentar
                </h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  Jadilah yang pertama berkomentar dan bagikan pendapat Anda tentang artikel ini!
                </p>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Article Gallery Section */}
      <section className="py-40 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-12">
            Lihat Artikel{" "}
            <span className="text-[#00b8a9] underline decoration-[black] decoration-5">
              Lainnya
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg overflow-hidden shadow-xl transform hover:-translate-y-1 transition"
              >
                <div className="overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-44 object-cover"
                  />
                </div>

                <div className="bg-[#00b8a9] text-white p-5 flex flex-col justify-between h-[200px]">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-sm leading-relaxed opacity-95">
                      {article.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm opacity-95 text-[#ffde7d]">
                      {/* lokasi icon */}
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                      >
                        <path
                          d="M12 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                          stroke="#ffde7d"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.5 10.5c0 6-7.5 11.25-7.5 11.25S4.5 16.5 4.5 10.5a7.5 7.5 0 1115 0z"
                          stroke="#ffde7d"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Marles</span>
                    </div>

                    <button className="bg-white text-[#00b8a9] font-semibold px-4 py-2 rounded shadow-sm flex items-center gap-2 ">
                      <span>Lihat Galeri</span>
                      {/* panah */}
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                      >
                        <path
                          d="M5 12h14"
                          stroke="#00b8a9"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 5l7 7-7 7"
                          stroke="#00b8a9"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ArticleGaleri;