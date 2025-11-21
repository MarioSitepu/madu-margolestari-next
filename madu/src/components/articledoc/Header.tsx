import articleImage from "@/assets/article.png";

export function Header() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'clamp(300px, 37.85vw, 545px)' }}>
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={articleImage} 
          alt="Header artikel dan dokumentasi Madu Margo Lestari - Informasi lengkap tentang madu dan peternakan lebah" 
          className="w-full h-full object-cover object-center" 
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-0">
        {/* Judul: Artikel Dan Dokumentasi */}
        <div
          style={{
            marginLeft: 'clamp(0px, 2.92vw, 42px)',
            width: 'clamp(280px, 39.86vw, 574px)',
            maxWidth: 'calc(100% - clamp(0px, 2.92vw, 42px) * 2)',
            marginBottom: 'clamp(4px, 0.35vw, 5px)'
          }}
        >
          <h1
            style={{
              fontFamily: 'Nort, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 3.33vw, 48px)',
              lineHeight: '1.342',
              textAlign: 'left'
            }}
          >
            <span style={{ color: '#ffde7d' }}>Artikel</span>{' '}
            <span style={{ color: '#FFFFFF' }}>Dan</span>{' '}
            <span style={{ color: '#00b8a9' }}>Dokumentasi</span>
          </h1>
        </div>

        {/* Deskripsi */}
        <div
          style={{
            marginLeft: 'clamp(0px, 2.92vw, 42px)',
            width: 'clamp(280px, 40.07vw, 577px)',
            maxWidth: 'calc(100% - clamp(0px, 2.92vw, 42px) * 2)'
          }}
        >
          <p
            style={{
              fontFamily: 'Nort, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(12px, 0.97vw, 14px)',
              lineHeight: '1.342',
              textAlign: 'left',
              color: '#FFFFFF'
            }}
          >
            Ingin tahu lebih banyak tentang keajaiban madu dan bagaimana ia bisa mendukung gaya hidup sehat Anda? Baca artikel lengkapnya{' '}
            <span style={{ color: '#ffde7d' }}>di sini!</span>
          </p>
        </div>
      </div>
    </div>
  );
}