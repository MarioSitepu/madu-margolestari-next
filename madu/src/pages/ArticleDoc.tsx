import { useEffect, useState } from 'react';
import { Header as ArticleHeader } from '@/components/articledoc/Header'
import { SearchSection } from '@/components/articledoc/SearchSection'
import { ArticleGrid } from '@/components/articledoc/ArticleGrid'
import { Gallery } from '@/components/articledoc/Gallery'
import { SEO } from '@/components/SEO'

export function ArticleDoc() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#ffde7d]">
      <SEO 
        title="Artikel & Dokumentasi Madu Margo Lestari | Blog Informasi Madu"
        description="Baca artikel dan dokumentasi lengkap tentang madu, manfaat kesehatan, tips penggunaan, dan informasi seputar peternakan lebah dari Madu Margo Lestari. Pelajari lebih lanjut tentang madu murni dan cara memilih madu berkualitas. Update terbaru tentang dunia madu dan kesehatan."
        keywords="artikel madu, dokumentasi madu, manfaat madu, tips madu, peternakan lebah, informasi madu, blog madu, madu margo lestari artikel, artikel kesehatan madu, tips penggunaan madu, cara memilih madu berkualitas, informasi peternakan lebah"
        url="https://madumargolestari.vercel.app/article"
        type="website"
        image="https://madumargolestari.vercel.app/article.png"
        breadcrumbs={[
          { name: 'Beranda', url: 'https://madumargolestari.vercel.app/' },
          { name: 'Artikel', url: 'https://madumargolestari.vercel.app/article' }
        ]}
      />
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000'} style={{ width: '100%' }}>
        <ArticleHeader />
      </div>
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 delay-200'}>
        <SearchSection />
      </div>
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 delay-300'}>
        <ArticleGrid />
      </div>
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 delay-400'}>
        <Gallery />
      </div>
    </div>
  )
}

export default ArticleDoc
