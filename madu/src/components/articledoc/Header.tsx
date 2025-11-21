import articleImage from "@/assets/article.png";

export function Header() {
  return (
    <div className="relative w-full h-[545px]" style={{ maxWidth: '1440px', margin: '0 auto' }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={articleImage} 
          alt="Bee Farmer's Delight" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        {/* Judul: Artikel Dan Dokumentasi */}
        <div
          style={{
            marginLeft: 'clamp(20px, 2.92vw, 42px)',
            width: 'clamp(300px, 39.86vw, 574px)',
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
            marginLeft: 'clamp(20px, 2.92vw, 42px)',
            width: 'clamp(300px, 40.07vw, 577px)'
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