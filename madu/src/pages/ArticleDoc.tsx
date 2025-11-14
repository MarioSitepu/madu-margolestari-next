import { Header as ArticleHeader } from '@/components/articledoc/Header'
import { SearchSection } from '@/components/articledoc/SearchSection'
import { ArticleGrid } from '@/components/articledoc/ArticleGrid'
import { Gallery } from '@/components/articledoc/Gallery'

export function ArticleDoc() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#ffde7d]">
      <ArticleHeader />
      <SearchSection />
      <ArticleGrid />
      <Gallery />
    </div>
  )
}

export default ArticleDoc
