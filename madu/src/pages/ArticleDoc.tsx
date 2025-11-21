import { useEffect, useState } from 'react';
import { Header as ArticleHeader } from '@/components/articledoc/Header'
import { SearchSection } from '@/components/articledoc/SearchSection'
import { ArticleGrid } from '@/components/articledoc/ArticleGrid'
import { Gallery } from '@/components/articledoc/Gallery'
import { SEO } from '@/components/SEO'

export function ArticleDoc() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'most-viewed'>('newest');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#ffde7d]">
      <SEO 
        title="Artikel & Dokumentasi Madu Margo Lestari"
        description="Baca artikel dan dokumentasi lengkap tentang madu, manfaat kesehatan, tips penggunaan, dan informasi seputar peternakan lebah dari Madu Margo Lestari. Pelajari lebih lanjut tentang madu murni dan cara memilih madu berkualitas."
        keywords="artikel madu, dokumentasi madu, manfaat madu, tips madu, peternakan lebah, informasi madu, blog madu, madu margo lestari artikel"
        url="https://madumargolestari.vercel.app/article"
        type="website"
      />
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000'} style={{ width: '100%' }}>
        <ArticleHeader />
      </div>
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 delay-200'}>
        <SearchSection 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 delay-300'}>
        <ArticleGrid 
          searchQuery={searchQuery}
          sortBy={sortBy}
        />
      </div>
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 delay-400'}>
        <Gallery />
      </div>
    </div>
  )
}

export default ArticleDoc
