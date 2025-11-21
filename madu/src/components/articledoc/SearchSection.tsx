import { SearchIcon, ChevronDownIcon } from 'lucide-react';
export function SearchSection() {
  return <div className="w-full py-10 px-4 flex flex-col md:flex-row justify-center items-center gap-4 max-w-4xl mx-auto">
      <div className="relative w-full max-w-lg">
        <input type="text" placeholder="Cari kegiatan..." className="w-full h-[56px] pl-14 pr-6 rounded-full bg-white shadow-md border-2 border-white text-[#101828] placeholder:text-[#6a7282] focus:outline-none focus:ring-2 focus:ring-[#00b8a9] transition-all" />
        <SearchIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#6a7282] h-5 w-5" />
      </div>
      <button className="h-[56px] px-8 rounded-full bg-white shadow-md border-2 border-white text-[#101828] font-medium flex items-center gap-2 hover:bg-[#00b8a9] hover:text-white transition-all">
        <span>Terbaru</span>
        <ChevronDownIcon className="h-5 w-5" />
      </button>
    </div>;
}