import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress for circular animation
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  // Calculate the circumference and stroke-dashoffset for the circular animation
  // Circumference of circle with radius 22 (svg viewBox is 48, radius = 24-2 for stroke)
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full shadow-lg hover:shadow-xl"
      aria-label="Scroll to top"
      title="Kembali ke atas"
    >
      {/* SVG Circular progress border */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 48 48"
        style={{
          filter: 'drop-shadow(0 0 0px rgba(0,0,0,0))',
        }}
      >
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.1s linear',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>

      {/* Icon */}
      <ChevronUp 
        className="w-6 h-6 sm:w-7 sm:h-7 text-black transition-transform duration-300 group-hover:-translate-y-1 relative z-10" 
        strokeWidth={3}
      />

      {/* Glassmorphism glow effect */}
      <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/10 to-transparent pointer-events-none z-0"></div>
    </button>
  );
}

