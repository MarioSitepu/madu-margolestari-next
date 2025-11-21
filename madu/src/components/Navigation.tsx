import { useState, useEffect } from "react";
import { Menu, X, LogIn, LogOut, ChevronDown, User } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import honeyLogo from "@/assets/1.svg";

type NavigationItem =
  | { label: string; type: "route"; to: string }
  | { label: string; type: "anchor"; href: string };

const navigationItems: NavigationItem[] = [
  { label: "Beranda", type: "route", to: "/" },
  { label: "Produk", type: "route", to: "/product" },
  { label: "Artikel", type: "route", to: "/article" },
  { label: "Tentang Kami", type: "route", to: "/about" },
];

const baseLinkClass =
  "relative text-gray-900 hover:text-[#00b8a9] transition-all duration-300 font-semibold text-base px-3 py-2 rounded-lg hover:bg-white/40";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setIsMenuOpen(false);
  const handleToggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const UserAvatar = ({ size = "w-8 h-8" }: { size?: string }) => (
    <div className={`${size} rounded-full bg-[#00b8a9] flex items-center justify-center overflow-hidden ring-2 ring-white/50 shadow-md`}>
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      ) : (
        <span className="text-white font-semibold text-sm">
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </span>
      )}
    </div>
  );

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full border-b transition-all duration-300",
      isScrolled 
        ? "bg-[#ffde7d]/98 backdrop-blur-sm border-[#00b8a9]/20 shadow-lg" 
        : "bg-[#ffde7d] border-[#00b8a9]/10 shadow-md"
    )}>
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
          <img
            src={honeyLogo}
            alt="Madu Margo Lestari Logo"
            className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110"
          />
          <span 
            className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 transition-colors group-hover:text-[#00b8a9]"
            style={{ fontFamily: 'Nort, sans-serif' }}
          >
            <span className="text-gray-900">Madu Margo</span>{' '}
            <span className="text-[#00b8a9]">Lestari</span>
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden items-center gap-2 md:gap-6 lg:gap-8 md:flex">
          {navigationItems.map((item) =>
            item.type === "route" ? (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    baseLinkClass,
                    isActive && "text-[#00b8a9] bg-white/60 font-bold shadow-sm"
                  )
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className={baseLinkClass}
              >
                {item.label}
              </a>
            )
          )}
          
          {/* User Menu or Login Button */}
          {!isLoading && (
            user ? (
              <div className="relative ml-2">
                <button
                  onClick={handleToggleUserMenu}
                  className="flex items-center gap-2 bg-white/60 hover:bg-white/80 px-3 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg border border-white/50 hover:border-[#00b8a9]/40"
                >
                  <UserAvatar />
                  <span className="font-semibold text-gray-900 max-w-24 truncate hidden lg:inline">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={16} className={cn(
                    "transition-transform duration-300 text-gray-800",
                    isUserMenuOpen && "rotate-180"
                  )} />
                </button>
                
                {isUserMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200/50 py-2 z-50 animate-scale-in overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-[#ffde7d]/20 to-[#00b8a9]/10">
                        <div className="flex items-center gap-3 mb-2">
                          <UserAvatar size="w-12 h-12" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 truncate">{user.name}</p>
                            <p className="text-sm text-gray-600 truncate">{user.email}</p>
                          </div>
                        </div>
                        {user.provider === 'google' && (
                          <div className="flex items-center gap-2 mt-2 p-2 bg-white/60 rounded-lg border border-gray-200/50">
                            <svg width="16" height="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                              <g fill="none" fillRule="evenodd">
                                <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                                <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.348 6.173 0 7.55 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                              </g>
                            </svg>
                            <p className="text-xs text-gray-700 font-medium">Login sebagai {user.name?.split(' ')[0] || 'User'}</p>
                          </div>
                        )}
                        {user.provider !== 'google' && (
                          <p className="text-xs text-gray-500 capitalize mt-1 flex items-center gap-1">
                            <span className="w-2 h-2 bg-[#00b8a9] rounded-full"></span>
                            Login via Email
                          </p>
                        )}
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-[#00b8a9]/10 hover:text-[#00b8a9] flex items-center gap-3 transition-all duration-200"
                      >
                        <User size={18} className="text-[#00b8a9]" />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3 transition-all duration-200"
                      >
                        <LogOut size={18} />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link 
                to="/login"
                className="bg-[#00b8a9] text-white px-5 md:px-6 py-2 rounded-lg font-semibold hover:bg-[#00a298] transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <LogIn size={18} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="p-2 md:hidden rounded-lg hover:bg-white/40 transition-colors" 
          onClick={handleToggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} className="text-gray-900" />
          ) : (
            <Menu size={24} className="text-gray-900" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden" 
            onClick={handleCloseMenu}
          />
          <div className="border-t border-[#00b8a9]/20 bg-[#ffde7d] md:hidden animate-slide-in-left relative z-50">
            <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
              {navigationItems.map((item) =>
                item.type === "route" ? (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    onClick={handleCloseMenu}
                    className={({ isActive }) =>
                      cn(
                        "relative text-gray-900 hover:text-[#00b8a9] hover:bg-white/40 transition-all duration-200 font-semibold text-base px-4 py-3 rounded-lg",
                        isActive && "text-[#00b8a9] bg-white/60 font-bold shadow-sm"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-900 hover:text-[#00b8a9] hover:bg-white/40 transition-all duration-200 font-semibold text-base px-4 py-3 rounded-lg"
                    onClick={handleCloseMenu}
                  >
                    {item.label}
                  </a>
                )
              )}
              
              {/* Mobile User Menu or Login Button */}
              {!isLoading && (
                <div className="border-t border-black/20 pt-4 mt-2">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 mb-4 px-4 py-3 bg-white/60 rounded-lg border border-white/50 shadow-sm">
                        <UserAvatar size="w-12 h-12" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 truncate">{user.name}</p>
                          <p className="text-sm text-gray-700 truncate">{user.email}</p>
                          {user.provider === 'google' && (
                            <div className="flex items-center gap-2 mt-2">
                              <svg width="14" height="14" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                <g fill="none" fillRule="evenodd">
                                  <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                                  <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.348 6.173 0 7.55 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                                </g>
                              </svg>
                              <p className="text-xs text-gray-700 font-medium">Login sebagai {user.name?.split(' ')[0] || 'User'}</p>
                            </div>
                          )}
                          {user.provider !== 'google' && (
                            <p className="text-xs text-gray-600 capitalize mt-1 flex items-center gap-1">
                              <span className="w-2 h-2 bg-[#00b8a9] rounded-full"></span>
                              Login via Email
                            </p>
                          )}
                        </div>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={handleCloseMenu}
                        className="w-full bg-[#00b8a9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00a298] transition-all duration-300 flex items-center gap-2 justify-center mb-3 shadow-md"
                      >
                        <User size={18} />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 flex items-center gap-2 justify-center shadow-md"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link 
                      to="/login"
                      className="w-full bg-[#00b8a9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00a298] transition-all duration-300 flex items-center gap-2 justify-center shadow-md"
                      onClick={handleCloseMenu}
                    >
                      <LogIn size={18} />
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}