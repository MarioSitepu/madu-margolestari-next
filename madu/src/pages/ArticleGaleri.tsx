import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MessageCircle, Send, Heart, MoreVertical, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import marlesHoney from "@/assets/marles-honey.png";
import { API_URL } from '@/lib/api';

interface Article {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  backgroundImage?: string;
  authorName: string;
  createdAt: string;
  views: number;
  tags?: string[];
}

interface Comment {
  _id: string;
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  likedBy: string[];
  isLiked?: boolean;
}

interface RelatedArticle {
  _id: string;
  title: string;
  description: string;
  image: string;
}

export function ArticleGaleri() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchArticle();
      fetchComments();
      fetchRelatedArticles();
    } else {
      // If no ID, redirect to article list or show default
      navigate('/article');
    }
  }, [id, navigate]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/articles/${id}`);
      if (response.data.success) {
        setArticle(response.data.article);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      alert('Artikel tidak ditemukan');
      navigate('/article');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    if (!id) return;
    try {
      setCommentLoading(true);
      const response = await axios.get(`${API_URL}/comments/article/${id}`);
      if (response.data.success) {
        const commentsData = response.data.comments.map((comment: any) => ({
          ...comment,
          authorName: comment.author?.name || comment.authorName || 'Anonymous',
          authorAvatar: comment.author?.avatar || comment.authorAvatar,
          isLiked: user ? (comment.likedBy?.some((likedId: any) => 
            likedId.toString() === user.id || likedId._id?.toString() === user.id
          ) || false) : false
        }));
        setComments(commentsData);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setCommentLoading(false);
    }
  };

  const fetchRelatedArticles = async () => {
    try {
      const response = await axios.get(`${API_URL}/articles`);
      if (response.data.success) {
        // Get 3 random articles excluding current article
        const filtered = response.data.articles
          .filter((a: any) => a._id !== id)
          .slice(0, 3);
        setRelatedArticles(filtered);
      }
    } catch (error) {
      console.error('Error fetching related articles:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user || !id) return;

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API_URL}/comments`, {
        articleId: id,
        content: newComment
      });

      if (response.data.success) {
        const newCommentData: Comment = {
          ...response.data.comment,
          author: {
            _id: user.id,
            name: user.name,
            avatar: user.avatar
          },
          authorName: user.name,
          authorAvatar: user.avatar,
          isLiked: false,
          likedBy: []
        };
        
        setComments([newCommentData, ...comments]);
        fetchComments(); // Refresh comments to get updated data
        
        // Save to comment history
        if (user?.id || user?.email) {
          const userId = user.id || user.email;
          const commentHistory = {
            id: response.data.comment._id,
            content: newComment,
            articleTitle: article?.title || '',
            articleId: id,
            createdAt: new Date().toLocaleString('id-ID'),
            likes: 0,
          };
          
          const stored = localStorage.getItem(`commentHistory_${userId}`);
          const history = stored ? JSON.parse(stored) : [];
          localStorage.setItem(`commentHistory_${userId}`, JSON.stringify([commentHistory, ...history]));
        }
        
        setNewComment("");
      }
    } catch (error: any) {
      console.error('Error submitting comment:', error);
      alert(error.response?.data?.message || 'Gagal mengirim komentar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!user) {
      alert('Silakan login untuk menyukai komentar');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/comments/${commentId}/like`);
      if (response.data.success) {
        const updatedComment = response.data.comment;
        const wasLiked = comments.find(c => c._id === commentId)?.isLiked || false;
        const newIsLiked = !wasLiked;
        
        // Save to liked comments history
        if (user?.id || user?.email) {
          const userId = user.id || user.email;
          const stored = localStorage.getItem(`likedComments_${userId}`);
          const likedHistory = stored ? JSON.parse(stored) : [];
          const currentComment = comments.find(c => c._id === commentId);
          
          if (newIsLiked && !wasLiked) {
            // Add to liked history
            const likedComment = {
              id: `${commentId}_${Date.now()}`,
              commentId: commentId,
              content: currentComment?.content || '',
              author: currentComment?.authorName || '',
              articleTitle: article?.title || '',
              articleId: id,
              likedAt: new Date().toLocaleString('id-ID'),
            };
            localStorage.setItem(`likedComments_${userId}`, JSON.stringify([likedComment, ...likedHistory]));
          } else if (!newIsLiked && wasLiked) {
            // Remove from liked history
            const filtered = likedHistory.filter((item: any) => item.commentId !== commentId);
            localStorage.setItem(`likedComments_${userId}`, JSON.stringify(filtered));
          }
        }
        
        // Update comments with new like status
        setComments(comments.map(comment => {
          if (comment._id === commentId) {
            return {
              ...comment,
              isLiked: newIsLiked,
              likes: updatedComment.likes,
              likedBy: updatedComment.likedBy || []
            };
          }
          return comment;
        }));
      }
    } catch (error: any) {
      console.error('Error liking comment:', error);
      if (error.response?.status === 401) {
        alert('Silakan login untuk menyukai komentar');
      }
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

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Baru saja';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
    
    return formatDate(dateString);
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (loading) {
    return (
      <div className="bg-[#ffde7d] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b8a9]"></div>
          <p className="mt-4 text-gray-600">Memuat artikel...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-[#ffde7d] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Artikel tidak ditemukan</p>
          <Link to="/article" className="text-[#00b8a9] hover:underline mt-4 inline-block">
            Kembali ke Daftar Artikel
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = article.content ? calculateReadingTime(article.content) : 1;

  // Format dates for SEO
  const publishedTime = article.createdAt ? new Date(article.createdAt).toISOString() : undefined;
  const articleImage = article.image || article.backgroundImage || 'https://madumargolestari.vercel.app/marles-honey.png';
  const articleUrl = `https://madumargolestari.vercel.app/article-galeri/${id}`;

  return (
    <div className="bg-[#ffde7d] min-h-screen">
      <SEO 
        title={`${article.title} | Madu Margo Lestari`}
        description={article.description || article.content.substring(0, 160) + '...'}
        keywords={article.tags ? article.tags.join(', ') : 'artikel madu, informasi madu, madu margo lestari'}
        url={articleUrl}
        type="article"
        image={articleImage}
        breadcrumbs={[
          { name: 'Beranda', url: 'https://madumargolestari.vercel.app/' },
          { name: 'Artikel', url: 'https://madumargolestari.vercel.app/article' },
          { name: article.title, url: articleUrl }
        ]}
        article={{
          publishedTime: publishedTime,
          modifiedTime: publishedTime,
          author: article.authorName || 'Madu Margo Lestari',
          section: 'Artikel Madu',
          tags: article.tags || []
        }}
      />
      {/* Header Section */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Title - Centered */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-6">
            {article.title}
          </h1>

          {/* Description - Below Title, without container, italic, with quotes */}
          <div className="mb-6 text-center">
            <p className="text-lg md:text-xl text-gray-800 italic leading-relaxed font-medium drop-shadow-sm">
              &ldquo;{article.description}&rdquo;
            </p>
          </div>

          {/* Tags - Below Description */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {article.tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="border-[#00b8a9]/40 bg-white/70 px-4 py-2 text-sm text-[#00b8a9] shadow"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Hero Image */}
          {(article.image || article.backgroundImage) && (
            <div className="mb-8">
              <img
                src={article.image || article.backgroundImage || "/images/beekeeper-main.jpg"}
                alt={`Gambar utama artikel ${article.title} - Dokumentasi lengkap tentang madu dan peternakan lebah dari Madu Margo Lestari`}
                className="w-full h-[500px] md:h-[600px] object-cover rounded-lg"
              />
            </div>
          )}

          {/* Content Layout - Sidebar Left, Content Right */}
          <div className="flex flex-col md:flex-row gap-8 mt-8">
            {/* Left Sidebar - Metadata */}
            <div className="md:w-64 shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Contributor */}
                <div className="bg-white p-4 shadow-md">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">Contributor</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#00b8a9] flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {article.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{article.authorName}</p>
                      <p className="text-sm text-gray-600">{formatTimeAgo(article.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Reading Time */}
                <div className="bg-white p-4 shadow-md">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">Reading Time</h3>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#00b8a9]" />
                    <span className="text-gray-900 font-medium">{readingTime} {readingTime === 1 ? 'Minute' : 'Minutes'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">

              {/* Article Content */}
              {article.content && (
                <div className="bg-white p-6 md:p-8 shadow-md">
                  <div className="prose prose-lg max-w-none">
                    {article.content.split('\n\n').map((paragraph, index, array) => {
                      // Check if paragraph is a heading (starts with #)
                      if (paragraph.trim().startsWith('#')) {
                        const level = paragraph.match(/^#+/)?.[0].length || 1;
                        const text = paragraph.replace(/^#+\s*/, '');
                        const headingClass = `font-bold text-gray-900 mb-4 mt-8 ${
                          level === 1 ? 'text-3xl' :
                          level === 2 ? 'text-2xl' :
                          level === 3 ? 'text-xl' :
                          'text-lg'
                        }`;
                        
                        if (level === 1) {
                          return <h1 key={index} className={headingClass}>{text}</h1>;
                        } else if (level === 2) {
                          return <h2 key={index} className={headingClass}>{text}</h2>;
                        } else if (level === 3) {
                          return <h3 key={index} className={headingClass}>{text}</h3>;
                        } else if (level === 4) {
                          return <h4 key={index} className={headingClass}>{text}</h4>;
                        } else if (level === 5) {
                          return <h5 key={index} className={headingClass}>{text}</h5>;
                        } else {
                          return <h6 key={index} className={headingClass}>{text}</h6>;
                        }
                      }
                      
                      // Find first non-heading paragraph index
                      let firstParagraphIndex = 0;
                      for (let i = 0; i < array.length; i++) {
                        if (!array[i].trim().startsWith('#')) {
                          firstParagraphIndex = i;
                          break;
                        }
                      }
                      
                      // Regular paragraph - only highlight first word for first paragraph
                      const isFirstParagraph = index === firstParagraphIndex;
                      const words = paragraph.trim().split(' ');
                      const firstWord = words[0];
                      const restOfText = words.slice(1).join(' ');
                      
                      return (
                        <p
                          key={index}
                          className="text-base md:text-lg text-[#00b8a9] leading-relaxed mb-6"
                        >
                          {isFirstParagraph ? (
                            <>
                              <span className="text-[#ffde7d] text-xl md:text-2xl font-bold underline decoration-2 decoration-[#ffde7d]">
                                {firstWord}
                              </span>
                              {' '}{restOfText}
                            </>
                          ) : (
                            paragraph
                          )}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <div className="w-full bg-white relative overflow-visible py-7 mt-12">
        <div className="max-w-6xl mx-auto py-5 px-6 md:px-12 relative flex items-center justify-between">
          {/* Image positioned absolute so it can "pop out" of the white section */}
          <div className="absolute left-6 top-0 -translate-y-1/2 z-30 pointer-events-none">
            <img
              src={marlesHoney}
              alt="Logo Madu Margo Lestari - Madu murni asli dari peternakan lebah Lampung Selatan"
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
            {commentLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#00b8a9]"></div>
                <p className="mt-4 text-gray-500">Memuat komentar...</p>
              </div>
            ) : comments.length > 0 ? (
              <>
                {comments.map((comment, index) => (
                  <Card
                    key={comment._id}
                    className="group border border-[#00b8a9]/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex gap-4">
                      <div className="shrink-0">
                        <div className="w-12 h-12 rounded-full bg-[#00b8a9] flex items-center justify-center overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-110">
                          {comment.authorAvatar ? (
                            <img src={comment.authorAvatar} alt={comment.authorName} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-white font-bold text-lg">
                              {comment.authorName.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-black text-base lg:text-lg">
                                {comment.authorName}
                              </h4>
                              {formatTimeAgo(comment.createdAt) === 'Baru saja' && (
                                <Badge className="border-[#00b8a9]/40 bg-[#00b8a9]/10 px-2 py-0.5 text-xs text-[#00b8a9]">
                                  Baru
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-500 text-xs">
                              {formatTimeAgo(comment.createdAt)}
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
                            onClick={() => handleLikeComment(comment._id)}
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
            {relatedArticles.length > 0 ? (
              relatedArticles.map((relatedArticle) => (
                <article
                  key={relatedArticle._id}
                  className="bg-white rounded-lg overflow-hidden shadow-xl transform hover:-translate-y-1 transition cursor-pointer"
                  onClick={() => navigate(`/article-galeri/${relatedArticle._id}`)}
                >
                  <div className="overflow-hidden">
                    <img
                      src={relatedArticle.image || marlesHoney}
                      alt={`Gambar artikel terkait ${relatedArticle.title} - Artikel madu dan peternakan lebah dari Madu Margo Lestari`}
                      className="w-full h-44 object-cover"
                    />
                  </div>

                  <div className="bg-[#00b8a9] text-white p-5 flex flex-col justify-between h-[200px]">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{relatedArticle.title}</h3>
                      <p className="text-sm leading-relaxed opacity-95 line-clamp-3">
                        {relatedArticle.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm opacity-95 text-[#ffde7d]">
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
                        <span>Madu Margo Lestari</span>
                      </div>

                      <button 
                        className="bg-white text-[#00b8a9] font-semibold px-4 py-2 rounded shadow-sm flex items-center gap-2 hover:bg-[#ffde7d] transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/article-galeri/${relatedArticle._id}`);
                        }}
                      >
                        <span>Lihat Galeri</span>
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
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-3 py-8">Belum ada artikel terkait</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default ArticleGaleri;
