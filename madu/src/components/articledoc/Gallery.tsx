import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { API_URL } from '@/lib/api';
const IMAGES_PER_PAGE = 6;

export function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const galleryRef = useRef<HTMLDivElement>(null);
  const lightboxImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/gallery`);
      if (response.data.success && response.data.galleries.length > 0) {
        // Extract only image URLs, sorted by order
        const imageUrls = response.data.galleries
          .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
          .map((gallery: any) => gallery.imageUrl);
        setImages(imageUrls);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const endIndex = startIndex + IMAGES_PER_PAGE;
  const currentImages = images.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to gallery section position
      if (galleryRef.current) {
        const offsetTop = galleryRef.current.offsetTop - 100; // 100px offset from top
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
  };

  const openLightbox = (index: number) => {
    const globalIndex = startIndex + index;
    setLightboxIndex(globalIndex);
    setLightboxOpen(true);
    setZoom(1);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(1);
    document.body.style.overflow = 'unset';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
      setZoom(1);
    } else if (direction === 'next' && lightboxIndex < images.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
      setZoom(1);
    }
  };

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.max(0.5, Math.min(3, prev + delta)));
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      } else if (e.key === '+' || e.key === '=') {
        handleZoom(0.2);
      } else if (e.key === '-') {
        handleZoom(-0.2);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxIndex, images.length]);

  return (
    <div className="w-full bg-[#00b8a9] py-20" ref={galleryRef}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16 leading-tight">
          Jangan Lewatkan Dokumentasi Kegiatan{' '}
          <span className="text-[#ffde7d]">Kami</span>
        </h2>
        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="mt-4 text-white">Memuat galeri...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white text-lg">Belum ada gambar galeri</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
              {currentImages.map((image, index) => (
                <div
                  key={startIndex + index}
                  className="group relative transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="bg-[#ffde7d] p-3 rounded-xl shadow-2xl">
                    <div className="bg-white p-3 rounded-lg">
                      <img
                        src={image}
                        alt={`Galeri foto dokumentasi madu dan peternakan lebah Madu Margo Lestari - Gambar ${startIndex + index + 1}`}
                        className="w-full h-[380px] object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === 1
                      ? 'bg-white/30 text-white/50 cursor-not-allowed'
                      : 'bg-white text-[#00b8a9] hover:bg-[#ffde7d] hover:text-[#00b8a9]'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                  <React.Fragment key={index}>
                    {page === '...' ? (
                      <span className="px-2 text-white">...</span>
                    ) : (
                      <button
                        onClick={() => handlePageChange(page as number)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-[#ffde7d] text-[#00b8a9] shadow-lg scale-110'
                            : 'bg-white text-[#00b8a9] hover:bg-[#ffde7d] hover:text-[#00b8a9]'
                        }`}
                      >
                        {page}
                      </button>
                    )}
                  </React.Fragment>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'bg-white/30 text-white/50 cursor-not-allowed'
                      : 'bg-white text-[#00b8a9] hover:bg-[#ffde7d] hover:text-[#00b8a9]'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('prev');
              }}
              className="absolute left-4 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {lightboxIndex < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('next');
              }}
              className="absolute right-4 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Image Container */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              ref={lightboxImageRef}
              src={images[lightboxIndex]}
              alt={`Galeri foto dokumentasi madu dan peternakan lebah Madu Margo Lestari - Lightbox gambar ${lightboxIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain transition-transform duration-300"
              style={{
                transform: `scale(${zoom})`,
                cursor: zoom > 1 ? 'move' : 'default'
              }}
              draggable={false}
            />
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoom(-0.2);
              }}
              disabled={zoom <= 0.5}
              className="p-2 text-white hover:bg-white/20 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-white text-sm font-semibold min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoom(0.2);
              }}
              disabled={zoom >= 3}
              className="p-2 text-white hover:bg-white/20 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 z-10 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}