import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Star, Minus, Plus, ArrowLeft, Check, Trash2 } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import productBottleCard from "@/assets/product-bottle-card.png";
import axios from "axios";
import { API_URL } from '@/lib/api';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    images?: string[];
}

interface Review {
    _id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface DeleteModal {
    isOpen: boolean;
    reviewId: string | null;
    reviewerName: string;
}

export function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [addedToCart, setAddedToCart] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [averageRating, setAverageRating] = useState(0);
    const [deleteModal, setDeleteModal] = useState<DeleteModal>({
        isOpen: false,
        reviewId: null,
        reviewerName: ''
    });
    const [deleting, setDeleting] = useState(false);
    
    // Review form states
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [hoverRating, setHoverRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Product images gallery - menggabungkan imageUrl utama + images array
    const productImages = product ? (() => {
        const images = [];
        if (product.imageUrl) {
            images.push(product.imageUrl);
        }
        if (product.images && product.images.length > 0) {
            images.push(...product.images);
        }
        return images.length > 0 ? images : [productBottleCard];
    })() : [];

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    useEffect(() => {
        if (product) {
            setSelectedImage(product.imageUrl || productBottleCard);
            fetchReviews();
        }
    }, [product]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/products/${id}`);
            if (response.data.success) {
                setProduct(response.data.product);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${API_URL}/products/${id}/reviews`);
            if (response.data.success) {
                setReviews(response.data.reviews);
                setAverageRating(response.data.averageRating);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                _id: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity,
            });
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        }
    };

    const handleBuyNow = () => {
        if (product) {
            addToCart({
                _id: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity,
            });
            navigate('/checkout');
        }
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user) {
            setSubmitError('Silakan login terlebih dahulu untuk memberikan ulasan');
            return;
        }

        if (comment.length < 5) {
            setSubmitError('Komentar harus minimal 5 karakter');
            return;
        }

        setSubmitting(true);
        setSubmitError('');
        setSubmitSuccess(false);

        try {
            const response = await axios.post(
                `${API_URL}/products/${id}/reviews`,
                { rating, comment },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.success) {
                setSubmitSuccess(true);
                setComment('');
                setRating(5);
                await fetchReviews();
                setTimeout(() => setSubmitSuccess(false), 3000);
            }
        } catch (error: any) {
            setSubmitError(error.response?.data?.message || 'Gagal mengirim ulasan');
        } finally {
            setSubmitting(false);
        }
    };

    const openDeleteModal = (reviewId: string, reviewerName: string) => {
        setDeleteModal({
            isOpen: true,
            reviewId,
            reviewerName
        });
    };

    const closeDeleteModal = () => {
        setDeleteModal({
            isOpen: false,
            reviewId: null,
            reviewerName: ''
        });
    };

    const handleDeleteReview = async () => {
        if (!deleteModal.reviewId) return;

        try {
            setDeleting(true);
            const response = await axios.delete(
                `${API_URL}/products/${id}/reviews/${deleteModal.reviewId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.success) {
                await fetchReviews();
                closeDeleteModal();
            }
        } catch (error: any) {
            console.error('Error deleting review:', error);
            alert('Gagal menghapus ulasan: ' + (error.response?.data?.message || 'Unknown error'));
        } finally {
            setDeleting(false);
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <Star key={i} size={20} fill="#ffde7d" stroke="#ffde7d" />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <Star key={i} size={20} fill="#ffde7d" stroke="#ffde7d" className="opacity-50" />
                );
            } else {
                stars.push(
                    <Star key={i} size={20} fill="none" stroke="#d1d5db" />
                );
            }
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b8a9]"></div>
                    <p className="mt-4 text-gray-700">Memuat produk...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-700 text-lg mb-4">Produk tidak ditemukan</p>
                    <Button onClick={() => navigate('/product')} className="bg-[#00b8a9] hover:bg-[#009688]">
                        Kembali ke Produk
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white animate-in fade-in duration-500">
            <SEO
                title={`${product.name} - Madu Jaya Lestari | Madu Murni Berkualitas`}
                description={product.description}
                keywords={`${product.name}, madu murni, beli madu online, madu asli lampung`}
                url={`https://madumargolestari.vercel.app/product/${id}`}
                image={product.imageUrl || 'https://madumargolestari.vercel.app/product-bottle-card.png'}
                type="product"
            />

            <div className="bg-[#ffde7d] py-4 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate('/product')}
                        className="flex items-center gap-2 text-black hover:text-[#00b8a9] transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-medium" style={{ fontFamily: 'Nort, sans-serif' }}>
                            Kembali ke Produk
                        </span>
                    </button>
                </div>
            </div>

            <section className="bg-[#ffde7d] py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div
                        className="bg-[#00b8a9] rounded-sm p-8 md:p-12 overflow-hidden"
                        style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)' }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                            <div className="flex flex-col space-y-6">
                                <div className="flex items-center justify-center">
                                    <div className="inline-block border-4 border-white rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                                        <img
                                            src={selectedImage}
                                            alt={product?.name}
                                            className="block w-auto max-h-[500px] object-contain"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = productBottleCard;
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 justify-center">
                                    {productImages.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(img)}
                                            className={`w-20 h-20 flex items-center justify-center bg-white rounded-none overflow-hidden border-2 transition-all hover:border-[#ffde7d] ${selectedImage === img ? 'border-[#ffde7d]' : 'border-transparent'
                                                }`}
                                            style={{ boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.6)' }}
                                        >
                                            <img
                                                src={img}
                                                alt={`${product.name} thumbnail ${index + 1}`}
                                                className="w-full h-full object-contain p-2"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = productBottleCard;
                                                }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col justify-start space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1">
                                        {renderStars(averageRating)}
                                    </div>
                                    <span
                                        className="text-white text-xl font-bold"
                                        style={{ fontFamily: 'Nort, sans-serif' }}
                                    >
                                        ({averageRating.toFixed(1)}) {reviews.length} ulasan
                                    </span>
                                </div>

                                <div className="flex flex-row items-end justify-between gap-3">
                                    <h1
                                        className="flex-1 text-[22px] sm:text-[32px] md:text-[42px] font-extrabold text-[#ffde7d] leading-tight min-w-0"
                                        style={{ fontFamily: 'Nort, sans-serif' }}
                                    >
                                        {product.name}
                                    </h1>

                                    <div className="flex items-baseline gap-1 shrink-0">
                                        <span
                                            className="text-[14px] sm:text-[16px] md:text-[18px] font-medium text-white"
                                            style={{ fontFamily: 'Nort, sans-serif' }}
                                        >
                                            Rp
                                        </span>
                                        <span
                                            className="text-[24px] sm:text-[36px] md:text-[42px] font-extrabold text-[#ffde7d] leading-none"
                                            style={{ fontFamily: 'Nort, sans-serif' }}
                                        >
                                            {product.price.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t-2 border-white/30 pt-2"></div>

                                <div className="flex gap-4">
                                    <div className="flex items-center bg-white rounded-none overflow-hidden flex-1 w-0 h-[64px] shadow-lg">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="flex-1 h-full hover:bg-gray-100 transition-colors disabled:opacity-40 flex items-center justify-center"
                                            disabled={quantity <= 1}
                                        >
                                            <Minus size={22} className={quantity <= 1 ? 'text-gray-300' : 'text-[#00b8a9]'} strokeWidth={3} />
                                        </button>
                                        <span
                                            className="px-4 h-full text-[22px] font-extrabold text-[#00b8a9] flex items-center justify-center border-x-2 border-gray-200"
                                            style={{ fontFamily: 'Nort, sans-serif' }}
                                        >
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="flex-1 h-full hover:bg-gray-100 transition-colors flex items-center justify-center"
                                        >
                                            <Plus size={22} className="text-[#00b8a9]" strokeWidth={3} />
                                        </button>
                                    </div>

                                    <Button
                                        onClick={handleAddToCart}
                                        className={`flex-1 w-0 h-[64px] ${addedToCart ? 'bg-green-500 hover:bg-green-600' : 'bg-[#ffde7d] hover:bg-[#f5c869]'} text-black font-bold rounded-none flex items-center justify-center gap-2 text-[17px] transition-all hover:scale-[1.02]`}
                                        style={{
                                            fontFamily: 'Nort, sans-serif',
                                            boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.6)'
                                        }}
                                    >
                                        {addedToCart ? (
                                            <>
                                                <Check size={22} strokeWidth={3} />
                                                <span>Berhasil Ditambahkan</span>
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart size={22} strokeWidth={2.5} />
                                                <span>Tambah ke Keranjang</span>
                                            </>
                                        )}
                                    </Button>
                                </div>

                                <Button
                                    onClick={handleBuyNow}
                                    className="w-full bg-white text-[#00b8a9] hover:bg-gray-50 font-bold rounded-none py-8 text-[19px] transition-all hover:scale-[1.02]"
                                    style={{
                                        fontFamily: 'Nort, sans-serif',
                                        boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.6)'
                                    }}
                                >
                                    Beli Sekarang
                                </Button>

                                <div className="border-t-2 border-white/30 pt-6 mt-2">
                                    <h3
                                        className="text-[22px] font-bold text-[#ffde7d] mb-4"
                                        style={{ fontFamily: 'Nort, sans-serif' }}
                                    >
                                        Deskripsi Produk
                                    </h3>
                                    <p
                                        className="text-[16px] text-white leading-relaxed"
                                        style={{ fontFamily: 'Nort, sans-serif' }}
                                    >
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h2
                        className="text-3xl md:text-4xl font-bold text-[#00b8a9] mb-12"
                        style={{ fontFamily: 'Nort, sans-serif' }}
                    >
                        Ulasan Pelanggan
                    </h2>

                    {/* Review Form */}
                    {user ? (
                        <div className="bg-gray-50 p-8 rounded-lg mb-12 border-l-4 border-[#00b8a9]">
                            <h3
                                className="text-xl font-bold text-[#00b8a9] mb-6"
                                style={{ fontFamily: 'Nort, sans-serif' }}
                            >
                                Berikan Ulasan Anda
                            </h3>
                            
                            <form onSubmit={handleSubmitReview} className="space-y-4">
                                {/* Star Rating Picker */}
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-3"
                                        style={{ fontFamily: 'Nort, sans-serif' }}
                                    >
                                        Rating (Klik untuk memilih)
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    size={32}
                                                    fill={star <= (hoverRating || rating) ? '#ffde7d' : 'none'}
                                                    stroke={star <= (hoverRating || rating) ? '#ffde7d' : '#d1d5db'}
                                                    className="transition-colors"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Rating: <strong>{rating}</strong> dari 5
                                    </p>
                                </div>

                                {/* Comment Textarea */}
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                        style={{ fontFamily: 'Nort, sans-serif' }}
                                    >
                                        Komentar (minimal 5 karakter)
                                    </label>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Bagikan pengalaman Anda dengan produk ini..."
                                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b8a9] focus:border-transparent resize-none"
                                        rows={4}
                                        maxLength={500}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        {comment.length}/500 karakter
                                    </p>
                                </div>

                                {/* Error/Success Messages */}
                                {submitError && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-800 text-sm">{submitError}</p>
                                    </div>
                                )}

                                {submitSuccess && (
                                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-green-800 text-sm flex items-center gap-2">
                                            <Check size={18} />
                                            Ulasan berhasil dikirim!
                                        </p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={submitting || comment.length < 5}
                                    className="w-full bg-[#00b8a9] hover:bg-[#009688] text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ fontFamily: 'Nort, sans-serif' }}
                                >
                                    {submitting ? 'Mengirim...' : 'Kirim Ulasan'}
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-blue-50 p-8 rounded-lg mb-12 border-l-4 border-blue-400">
                            <p className="text-blue-800" style={{ fontFamily: 'Nort, sans-serif' }}>
                                <strong>Silakan login</strong> untuk memberikan ulasan pada produk ini.
                            </p>
                        </div>
                    )}

                    {/* Reviews List */}
                    <div>
                        <h3
                            className="text-lg font-bold text-gray-800 mb-6"
                            style={{ fontFamily: 'Nort, sans-serif' }}
                        >
                            {reviews.length} Ulasan
                        </h3>

                        {reviews.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">
                                Belum ada ulasan. Jadilah yang pertama!
                            </p>
                        ) : (
                            <div className="space-y-6">
                                {reviews.map((review, index) => (
                                    <div
                                        key={review._id}
                                        className="bg-white p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow animate-in fade-in slide-in-from-left-2 duration-500"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <p
                                                    className="font-bold text-gray-800"
                                                    style={{ fontFamily: 'Nort, sans-serif' }}
                                                >
                                                    {review.userName}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex gap-1">
                                                        {renderStars(review.rating)}
                                                    </div>
                                                    <span className="text-sm text-gray-600">
                                                        {review.rating.toFixed(1)}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {(user && (user.id === review.userId || user.role === 'admin')) && (
                                                <button
                                                    onClick={() => openDeleteModal(review._id, review.userName)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Hapus ulasan"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>

                                        <p className="text-gray-700 leading-relaxed mb-3">
                                            {review.comment}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {new Date(review.createdAt).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Delete Confirmation Modal */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000] p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="bg-red-50 px-6 py-4 border-b border-red-100">
                            <h3 className="text-lg font-bold text-gray-900">Hapus Ulasan</h3>
                        </div>

                        {/* Content */}
                        <div className="px-6 py-6 space-y-4">
                            <p className="text-gray-700">
                                Apakah Anda yakin ingin menghapus ulasan dari <span className="font-semibold">{deleteModal.reviewerName}</span>?
                            </p>
                            <p className="text-sm text-gray-500">
                                Tindakan ini tidak dapat dibatalkan. Ulasan akan dihapus secara permanen.
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3 justify-end">
                            <button
                                onClick={closeDeleteModal}
                                disabled={deleting}
                                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDeleteReview}
                                disabled={deleting}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {deleting ? 'Menghapus...' : 'Hapus'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
            <ScrollToTopButton />
        </div>
    );
}

export default ProductDetail;
