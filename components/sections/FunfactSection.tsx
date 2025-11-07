import type { FC } from 'react';
import { CircleHelp } from 'lucide-react';

interface FunfactSectionProps {
  title?: string;
  highlightedWord?: string;
  facts?: string[];
}

const FunfactSection: FC<FunfactSectionProps> = ({ 
  title = "Apakah Kamu", 
  highlightedWord = "Tahu?", 
  facts = [] 
}) => {
  return (
    <section className="bg-brand-teal py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-[1200px] mx-auto">
          {/* Left: Text Content */}
          <div>
            <h2 className="heading-lg text-brand-white mb-6">
              {title} <span className="heading-xl text-brand-yellow">{highlightedWord}</span>
            </h2>
            <div className="w-[136px] h-[11px] bg-brand-black mb-8"></div>
            
            <div className="space-y-6">
              {facts?.map((fact, index) => (
                <p key={index} className="text-body text-brand-white">
                  {fact}
                </p>
              ))}
            </div>
          </div>
          
          {/* Right: Large Question Mark Icon */}
          <div className="flex justify-center lg:justify-end">
            <div className="text-brand-yellow">
              <CircleHelp size={400} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunfactSection;