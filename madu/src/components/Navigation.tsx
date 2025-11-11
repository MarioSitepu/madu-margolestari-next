import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

type NavigationItem =
  | { label: string; type: "route"; to: string }
  | { label: string; type: "anchor"; href: string };

const navigationItems: NavigationItem[] = [
  { label: "Beranda", type: "route", to: "/" },
  { label: "Produk", type: "anchor", href: "#produk" },
  { label: "Artikel", type: "anchor", href: "#artikel" },
  { label: "Tentang Kami", type: "route", to: "/about" },
];

const baseLinkClass =
  "text-black hover:text-[#00b8a9] transition-colors font-semibold text-base";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#ffde7d] py-4 shadow-sm">
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
        </div>
        {/* Mobile Menu Button */}
        <button className="p-2 md:hidden" onClick={handleToggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-black/5 bg-[#ffde7d] md:hidden">
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
          </div>
        </div>
      )}
    </nav>
  );
}