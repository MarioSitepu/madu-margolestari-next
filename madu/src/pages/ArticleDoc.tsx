import { useEffect, useState } from 'react';
import { Header as ArticleHeader } from '@/components/articledoc/Header'
import { SearchSection } from '@/components/articledoc/SearchSection'
import { ArticleGrid } from '@/components/articledoc/ArticleGrid'
import { Gallery } from '@/components/articledoc/Gallery'

export function ArticleDoc() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#ffde7d]">
      <div className={isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000'}>
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
