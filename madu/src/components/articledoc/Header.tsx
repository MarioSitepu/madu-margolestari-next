import articleImage from "@/assets/article.png";

export function Header() {
  const handleScrollToArticles = () => {
    const articlesSection = document.getElementById('articles-section');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'clamp(300px, 37.85vw, 545px)' }}>
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={articleImage} 
          alt="Bee Farmer's Delight" 
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
            marginBottom: 'clamp(4px, 0.35vw, 5px)',
            background: 'linear-gradient(135deg, rgba(255, 222, 125, 0.15) 0%, rgba(0, 184, 169, 0.15) 100%)',
            padding: 'clamp(8px, 1vw, 12px)',
            borderRadius: '8px',
            backdropFilter: 'blur(2px)'
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
            maxWidth: 'calc(100% - clamp(0px, 2.92vw, 42px) * 2)',
            background: 'linear-gradient(135deg, rgba(255, 222, 125, 0.1) 0%, rgba(0, 184, 169, 0.1) 100%)',
            padding: 'clamp(8px, 1vw, 12px)',
            borderRadius: '8px',
            backdropFilter: 'blur(2px)'
          }}
        >
          <p
            style={{
              fontFamily: 'Nort, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(14px, 1.5vw, 18px)',
              lineHeight: '1.342',
              textAlign: 'left',
              color: '#FFFFFF'
            }}
          >
            Ingin tahu lebih banyak tentang keajaiban madu dan bagaimana ia bisa mendukung gaya hidup sehat Anda? Baca artikel lengkapnya{' '}
            <button 
              onClick={handleScrollToArticles}
              style={{ 
                color: '#ffde7d',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'Nort, sans-serif',
                fontWeight: 400,
                fontSize: 'inherit',
                lineHeight: 'inherit'
              }}
              className="relative group transition-colors hover:text-[#f5c869]"
            >
              di sini!
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}