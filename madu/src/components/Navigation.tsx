import { useState } from "react";
import { Menu, X, LogIn, LogOut, ChevronDown, User } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

type NavigationItem =
  | { label: string; type: "route"; to: string }
  | { label: string; type: "anchor"; href: string };

const navigationItems: NavigationItem[] = [
  { label: "Beranda", type: "route", to: "/" },
  { label: "Produk", type: "anchor", href: "#produk" },
  { label: "Artikel", type: "route", to: "/article" },
  { label: "Tentang Kami", type: "route", to: "/about" },
];

const baseLinkClass =
  "text-black hover:text-[#00b8a9] transition-colors font-semibold text-base";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

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
    <div className={`${size} rounded-full bg-[#00b8a9] flex items-center justify-center overflow-hidden`}>
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
    <nav className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#ffde7d] py-4 shadow-sm transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center">
          <span className="text-2xl font-black text-black md:text-3xl">
            Marles
          </span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {navigationItems.map((item) =>
            item.type === "route" ? (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    baseLinkClass,
                    isActive && "text-[#00b8a9] underline decoration-2"
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
              <div className="relative">
                <button
                  onClick={handleToggleUserMenu}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors"
                >
                  <UserAvatar />
                  <span className="font-semibold text-black max-w-24 truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={16} className={cn(
                    "transition-transform text-black",
                    isUserMenuOpen && "rotate-180"
                  )} />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-scale-in">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600 truncate">{user.email}</p>
                      <p className="text-xs text-gray-500 capitalize mt-1">
                        Login via {user.provider === 'google' ? 'Google' : 'Email'}
                      </p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    >
                      <User size={16} />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login"
                className="bg-[#00b8a9] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#00a298] transition-colors flex items-center gap-2 shadow-md"
              >
                <LogIn size={18} />
                Login
              </Link>
            )
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button className="p-2 md:hidden" onClick={handleToggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-black/5 bg-[#ffde7d] md:hidden animate-slide-in-left">
          <div className="container mx-auto flex flex-col gap-2 px-4 py-4">
            {navigationItems.map((item) =>
              item.type === "route" ? (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={handleCloseMenu}
                  className={({ isActive }) =>
                    cn(
                      baseLinkClass,
                      "py-2",
                      isActive && "text-[#00b8a9] underline decoration-2"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(baseLinkClass, "py-2")}
                  onClick={handleCloseMenu}
                >
                  {item.label}
                </a>
              )
            )}
            
            {/* Mobile User Menu or Login Button */}
            {!isLoading && (
              user ? (
                <div className="border-t border-black/10 pt-4 mt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <UserAvatar size="w-10 h-10" />
                    <div>
                      <p className="font-semibold text-black">{user.name}</p>
                      <p className="text-sm text-gray-700">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={handleCloseMenu}
                    className="w-full bg-[#00b8a9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00a298] transition-colors flex items-center gap-2 justify-center mb-2"
                  >
                    <User size={18} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 justify-center"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="bg-[#00b8a9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00a298] transition-colors flex items-center gap-2 shadow-md mt-2"
                  onClick={handleCloseMenu}
                >
                  <LogIn size={18} />
                  Login
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}