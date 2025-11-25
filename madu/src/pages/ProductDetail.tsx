import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Star, Minus, Plus, ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import productBottleCard from "@/assets/product-bottle-card.png";
import axios from "axios";
import { API_URL } from '@/lib/api';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [rating] = useState(4.5);
    const [selectedImage, setSelectedImage] = useState<string>('');

    // Product images gallery - dummy images yang beragam
    const productImages = product ? [
        product.imageUrl || productBottleCard,
        'https://via.placeholder.com/400x400/FFE4B5/000000?text=Madu+2',
        'https://via.placeholder.com/400x400/F4A460/000000?text=Madu+3',
        'https://via.placeholder.com/400x400/DAA520/000000?text=Madu+4',
    ] : [];

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    useEffect(() => {
        if (product) {
            setSelectedImage(product.imageUrl || productBottleCard);
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

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleAddToCart = () => {
        if (product) {
            alert(`${quantity}x ${product.name} ditambahkan ke keranjang!`);
        }
    };

    const handleBuyNow = () => {
        if (product) {
            alert(`Membeli ${quantity}x ${product.name} - Total: Rp ${(product.price * quantity).toLocaleString('id-ID')}`);
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
        <div className="min-h-screen bg-white">
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
                        className="bg-[#00b8a9] rounded-sm p-8 md:p-12"
                        style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)' }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                            <div className="flex flex-col space-y-6">
                                <div className="flex items-center justify-center">
                                    <div className="w-full max-w-[450px] h-[500px] flex items-center justify-center rounded-lg">
                                        <img
                                            src={selectedImage}
                                            alt={product.name}
                                            className="w-full h-full object-contain p-6"
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
                                        {renderStars(rating)}
                                    </div>
                                    <span
                                        className="text-white text-xl font-bold"
                                        style={{ fontFamily: 'Nort, sans-serif' }}
                                    >
                                        ({rating.toFixed(1)})
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
                                        className="flex-1 w-0 h-[64px] bg-[#ffde7d] text-black hover:bg-[#f5c869] font-bold rounded-none flex items-center justify-center gap-2 text-[17px] transition-all hover:scale-[1.02]"
                                        style={{
                                            fontFamily: 'Nort, sans-serif',
                                            boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.6)'
                                        }}
                                    >
                                        <ShoppingCart size={22} strokeWidth={2.5} />
                                        <span>Tambah ke Keranjang</span>
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

            <Footer />
            <ScrollToTopButton />
        </div>
    );
}

export default ProductDetail;
