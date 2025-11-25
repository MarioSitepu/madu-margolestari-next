import { useState } from 'react';
import { Header } from './Header';
import { SearchSection } from './SearchSection';
import { ArticleGrid } from './ArticleGrid';
import { Gallery } from './Gallery';

export function HoneyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'most-viewed'>('newest');

  return (
    <div className="w-full min-h-screen bg-[#ffde7d]">
      <Header />
      <SearchSection 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <ArticleGrid 
        searchQuery={searchQuery}
        sortBy={sortBy}
      />
      <Gallery />
    </div>
  );
}