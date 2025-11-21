import { Header } from './Header';
import { SearchSection } from './SearchSection';
import { ArticleGrid } from './ArticleGrid';
import { Gallery } from './Gallery';

export function HoneyPage() {
  return (
    <div className="w-full min-h-screen bg-[#ffde7d]">
      <Header />
      <SearchSection />
      <ArticleGrid />
      <Gallery />
    </div>
  );
}