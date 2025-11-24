import { SearchIcon, ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'newest' | 'most-viewed';
  onSortChange: (sort: 'newest' | 'most-viewed') => void;
}

export function SearchSection({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange 
}: SearchSectionProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSortSelect = (sort: 'newest' | 'most-viewed') => {
    onSortChange(sort);
    setIsDropdownOpen(false);
  };

  const sortLabel = sortBy === 'newest' ? 'Terbaru' : 'Paling Banyak Dilihat';

  return (
    <div className="w-full py-10 px-4 flex flex-col md:flex-row justify-center items-center gap-4 max-w-4xl mx-auto">
      <div className="relative w-full max-w-lg">
        <input 
          type="text" 
          placeholder="Cari artikel..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-[56px] pl-14 pr-6 rounded-full bg-white shadow-md border-2 border-white text-[#101828] placeholder:text-[#6a7282] focus:outline-none focus:ring-2 focus:ring-[#00b8a9] transition-all" 
        />
        <SearchIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#6a7282] h-5 w-5" />
      </div>
      
      <div className="relative">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="h-[56px] px-8 rounded-full bg-white shadow-md border-2 border-white text-[#101828] font-medium flex items-center gap-2 hover:bg-[#00b8a9] hover:text-white transition-all"
        >
          <span>{sortLabel}</span>
          <ChevronDownIcon className={`h-5 w-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 min-w-[160px]">
            <button
              onClick={() => handleSortSelect('newest')}
              className={`w-full px-4 py-3 text-left font-medium transition-all duration-300 flex items-center gap-2 ${
                sortBy === 'newest' 
                  ? 'bg-[#00b8a9] text-white' 
                  : 'text-[#101828] hover:bg-gray-100'
              }`}
            >
              <span>Terbaru</span>
              {sortBy === 'newest' && <span className="ml-auto">✓</span>}
            </button>
            <button
              onClick={() => handleSortSelect('most-viewed')}
              className={`w-full px-4 py-3 text-left font-medium transition-all duration-300 flex items-center gap-2 ${
                sortBy === 'most-viewed' 
                  ? 'bg-[#00b8a9] text-white' 
                  : 'text-[#101828] hover:bg-gray-100'
              }`}
            >
              <span>Paling Banyak Dilihat</span>
              {sortBy === 'most-viewed' && <span className="ml-auto">✓</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}