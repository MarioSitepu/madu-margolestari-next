import { useEffect, useState } from "react";
import { ArrowRight, User, MessageCircle, Send, Heart, MoreVertical } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const articleCards = [
  {
    id: 1,
    title: "Pengambilan Madu",
    description:
      "Madu alami ini kaya akan antioksidan, vitamin, dan mineral yang dapat membantu meningkatkan daya tahan tubuh",
    author: "Marles",
    backgroundImage: "url(https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800&h=600&fit=crop)",
  },
  {
    id: 2,
    title: "Pengambilan Madu",
    description:
      "Madu alami ini kaya akan antioksidan, vitamin, dan mineral yang dapat membantu meningkatkan daya tahan tubuh",
    author: "Marles",
    backgroundImage: "url(https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop)",
  },
  {
    id: 3,
    title: "Pengambilan Madu",
    description:
      "Madu alami ini kaya akan antioksidan, vitamin, dan mineral yang dapat membantu meningkatkan daya tahan tubuh",
    author: "Marles",
    backgroundImage: "url(https://images.unsplash.com/photo-1516824711217-8b7b8a1dd8b4?w=800&h=600&fit=crop)",
  },
];

interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export const Desktop = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    // Set visible immediately and also after a short delay for animation
    setIsVisible(true);
    
    // Force re-render to ensure animations trigger
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

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
    <div className="bg-[#ffde7d] overflow-hidden w-full min-h-screen flex flex-col">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <p className="text-center md:text-right font-['Nort-Medium',Helvetica] font-medium text-transparent text-lg md:text-xl mb-4">
            <span className="text-black">Diposting Pada </span>
            <span className="text-[#00b8a9]">
              11 Agustus 2025
            </span>
          </p>
        </div>

        <h1 className={`text-center font-['Nort-Medium',Helvetica] font-medium text-black text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Madu Marles Berhasil Memenangkan Laga
        </h1>

        <div className={`mb-8 md:mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="w-full max-w-5xl mx-auto bg-[#00b8a9] rounded-2xl shadow-2xl overflow-hidden">
            <img
              className="w-full h-auto object-cover"
              alt="Article Featured"
              src="https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=1200&h=600&fit=crop"
            />
          </div>
        </div>

        <article className={`max-w-4xl mx-auto mb-12 md:mb-16 font-['Nort-Medium',Helvetica] font-medium text-[#333333] text-base md:text-lg leading-relaxed transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        Lorem ipsum (/ˌlɔː.rəm ˈɪp.səm/ LOR-əm IP-səm) is a dummy or placeholder
        text commonly used in graphic design, publishing, and web development.
        Its purpose is to permit a page layout to be designed, independently of
        the copy that will subsequently populate it, or to demonstrate various
        fonts of a typeface without meaningful text that could be distracting.
        <br />
        <br />
        Lorem ipsum is typically a corrupted version of De finibus bonorum et
        malorum, a 1st-century BC text by the Roman statesman and philosopher
        Cicero, with words altered, added, and removed to make it nonsensical
        and improper Latin. The first two words are the truncation of dolorem
        ipsum (&#34;pain itself&#34;).
        <br />
        <br />
        Versions of the Lorem ipsum text have been used in typesetting since the
        1960s, when advertisements for Letraset transfer sheets popularized
        it.[1] Lorem ipsum was introduced to the digital world in the mid-1980s,
        when Aldus employed it in graphic and word-processing templates for its
        desktop publishing program PageMaker. Other popular word processors,
        including Pages and Microsoft Word, have since adopted Lorem ipsum,[2]
        as have many LaTeX packages,[3][4][5] web content managers such as
        Joomla! and WordPress, and CSS libraries such as Semantic UI.
      </article>

        <section className={`relative my-12 md:my-16 bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-linear-to-br from-[#00b8a9] to-[#ffde7d] rounded-full flex items-center justify-center animate-float shadow-lg">
                <span className="text-4xl md:text-5xl lg:text-6xl">🍯</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <p className="font-['Nort-Bold',Helvetica] font-bold text-[#00b8a9] text-lg md:text-xl lg:text-2xl mb-4 md:mb-6">
                Jangan lewatkan kesempatan untuk merasakan kelezatannya. Kunjungi
                toko kami dan beli sekarang juga di{" "}
                <span className="text-[#ffde7d] bg-black px-2 py-1 rounded">sini!</span>
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[#00b8a9] hover:bg-[#009c91] text-white px-6 py-3 rounded-lg font-['Nort-Bold',Helvetica] font-bold shadow-lg transition-all duration-300 hover:scale-105"
              >
                Kunjungi Sekarang
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className={`max-w-4xl mx-auto mb-12 md:mb-16 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8 text-center md:text-left">
            <Badge className="mb-4 border-[#00b8a9]/40 bg-white/70 px-4 py-2 text-sm text-[#00b8a9] shadow">
              <MessageCircle className="mr-2 h-4 w-4" />
              Diskusi
            </Badge>
            <h2 className="font-['Nort-Black',Helvetica] font-black text-black text-3xl md:text-4xl lg:text-5xl mb-2">
              Komentar{" "}
              <span className="relative inline-block text-[#00b8a9]">
                ({comments.length})
                <span className="absolute bottom-0 left-0 w-full h-2 bg-[#ffde7d]/70"></span>
              </span>
            </h2>
            <p className="text-black/70 text-base md:text-lg font-['Nort-Regular',Helvetica]">
              Bagikan pendapat dan pengalaman Anda tentang artikel ini
            </p>
          </div>

          <div className="space-y-6">
            {/* Comment Form */}
            {user ? (
              <Card className="border border-[#00b8a9]/20 bg-white p-6 shadow-sm lg:p-8">
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
                            // Auto-resize textarea
                            e.target.style.height = 'auto';
                            e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
                          }}
                          placeholder="Tulis komentar Anda di sini..."
                          className="w-full px-4 py-3 border border-[#00b8a9]/20 rounded-xl focus:ring-2 focus:ring-[#00b8a9] focus:border-[#00b8a9] outline-none resize-none font-['Nort-Regular',Helvetica] text-sm transition-all duration-300 bg-gray-50 focus:bg-white"
                          rows={3}
                          disabled={isSubmitting}
                          maxLength={500}
                        />
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs text-gray-400 font-['Nort-Regular',Helvetica]">
                            {newComment.length}/500 karakter
                          </p>
                          <Button
                            type="submit"
                            disabled={!newComment.trim() || isSubmitting}
                            className="rounded-xl! bg-[#00b8a9] hover:bg-[#009c91] text-white px-6 py-2.5 font-['Nort-Medium',Helvetica] font-medium text-sm shadow-md transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <Card className="border border-[#00b8a9]/20 bg-white p-6 shadow-sm lg:p-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#00b8a9]/10 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-[#00b8a9]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm font-['Nort-Medium',Helvetica] mb-1">
                      Ingin berpartisipasi dalam diskusi?
                    </p>
                    <p className="text-gray-600 text-xs font-['Nort-Regular',Helvetica]">
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
                    className="group border border-[#00b8a9]/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:p-8 animate-fade-up"
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
                              <h4 className="font-['Nort-Bold',Helvetica] font-bold text-black text-base lg:text-lg">
                                {comment.author}
                              </h4>
                              {comment.createdAt === "Baru saja" && (
                                <Badge className="border-[#00b8a9]/40 bg-[#00b8a9]/10 px-2 py-0.5 text-xs text-[#00b8a9]">
                                  Baru
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-500 text-xs font-['Nort-Regular',Helvetica]">
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
                        <p className="text-gray-700 text-sm lg:text-base font-['Nort-Regular',Helvetica] leading-relaxed mb-4 whitespace-pre-wrap wrap-break-word">
                          {comment.content}
                        </p>
                        <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => handleLikeComment(comment.id)}
                            className={`flex items-center gap-2 text-sm font-['Nort-Medium',Helvetica] transition-all duration-300 ${
                              comment.isLiked
                                ? 'text-red-500'
                                : 'text-gray-500 hover:text-red-500'
                            }`}
                          >
                            <Heart className={`w-5 h-5 transition-transform duration-300 ${comment.isLiked ? 'fill-current scale-110' : 'hover:scale-110'}`} />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="text-gray-500 hover:text-[#00b8a9] text-sm font-['Nort-Medium',Helvetica] transition-colors duration-300 hover:underline">
                            Balas
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
                <h3 className="font-['Nort-Bold',Helvetica] font-bold text-gray-700 text-lg mb-2">
                  Belum ada komentar
                </h3>
                <p className="text-gray-500 font-['Nort-Regular',Helvetica] text-sm max-w-md mx-auto">
                  Jadilah yang pertama berkomentar dan bagikan pendapat Anda tentang artikel ini!
                </p>
              </Card>
            )}
          </div>
        </section>

        <header className={`text-center md:text-left mb-8 md:mb-12 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-['Nort-Black',Helvetica] font-black text-black text-3xl md:text-4xl lg:text-5xl mb-2">
            Lihat Artikel{" "}
            <span className="relative inline-block text-[#00b8a9]">
              Lainnya
              <span className="absolute bottom-0 left-0 w-full h-2 bg-black"></span>
            </span>
          </h2>
        </header>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {articleCards.map((card, index) => (
            <article
              key={card.id}
              className="group relative bg-[#00b8a9] rounded-xl overflow-hidden border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${700 + index * 100}ms` }}
            >
              <div
                className="w-full h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: card.backgroundImage }}
              />

              <div className="p-4 md:p-6">
                <h3 className="font-['Nort-Bold',Helvetica] font-bold text-white text-lg md:text-xl mb-2">
                  {card.title}
                </h3>

                <p className="font-['Nort-Regular',Helvetica] font-normal text-white text-sm mb-4 line-clamp-3">
                  {card.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#ffde7d]" />
                    <span className="font-['Nort-Regular',Helvetica] font-normal text-[#ffde7d] text-sm">
                      {card.author}
                    </span>
                  </div>

                  <a
                    href="#"
                    className="flex items-center gap-2 bg-white hover:bg-gray-100 text-[#00b8a9] px-4 py-2 rounded-lg font-['Nort-Medium',Helvetica] font-medium text-sm shadow-md transition-all duration-300 hover:scale-105"
                  >
                    Lihat Galeri
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Desktop;
