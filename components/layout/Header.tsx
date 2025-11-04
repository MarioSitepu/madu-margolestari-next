'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <nav className={`navbar-container ${isScrolled ? 'navbar-container-scrolled' : ''}`}>
        {/* Logo */}
        <div className="navbar-logo">
          <Link href="/">
            <span className="logo-text-yellow">Madu</span>{' '}
            <span className="logo-text-blue">MarLes</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-menu">
          <Link href="/" className="navbar-link">
            Home
          </Link>
          <Link href="/produk" className="navbar-link">
            Produk
          </Link>
          <Link href="/tentang-kami" className="navbar-link">
            Tentang Kami
          </Link>
          <Link href="/artikel-dokumentasi" className="navbar-link">
            Artikel
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="navbar-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span 
            className={isMenuOpen ? 'navbar-icon-open' : 'navbar-icon'} 
            style={isMenuOpen ? { transform: 'rotate(45deg) translate(8px, 8px)' } : {}}
          />
          <span 
            className={isMenuOpen ? 'navbar-icon-open' : 'navbar-icon'} 
            style={isMenuOpen ? { opacity: 0 } : {}}
          />
          <span 
            className={isMenuOpen ? 'navbar-icon-open' : 'navbar-icon'} 
            style={isMenuOpen ? { transform: 'rotate(-45deg) translate(7px, -7px)' } : {}}
          />
        </button>

        {/* Mobile Menu */}
        <div className={`navbar-mobile-menu ${isMenuOpen ? 'navbar-mobile-menu-open' : ''}`}>
          <Link href="/" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/produk" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
            Produk
          </Link>
          <Link href="/tentang-kami" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
            Tentang Kami
          </Link>
          <Link href="/artikel-dokumentasi" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
            Artikel
          </Link>
        </div>
      </nav>

      <style jsx>{`
        .navbar-header {
          position: fixed;
          top: 20px;
          left: 0;
          right: 0;
          z-index: 1000;
          background: transparent;
          padding: 0 77px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .navbar-header.navbar-scrolled {
          top: 0;
          padding: 10px 77px;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .navbar-container {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 65px;
          background: #00b8a9;
          border: 2px solid #ffffff;
          border-radius: 50px;
          padding: 0 40px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .navbar-container.navbar-container-scrolled {
          height: 60px;
          box-shadow: 0 8px 32px rgba(0, 184, 169, 0.4);
          border-width: 2.5px;
        }

        .navbar-logo a {
          font-family: Nort, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 24px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: all 0.3s ease;
          letter-spacing: -0.3px;
        }

        .navbar-logo a:hover {
          transform: scale(1.05);
        }

        .logo-text-yellow {
          color: #ffffff;
          position: relative;
          transition: all 0.3s ease;
        }

        .navbar-logo a:hover .logo-text-yellow {
          color: #ffde7d;
        }

        .logo-text-blue {
          color: #ffffff;
          position: relative;
          transition: all 0.3s ease;
        }

        .navbar-logo a:hover .logo-text-blue {
          color: #ffffff;
        }

        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .navbar-link {
          font-family: Nort, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
          text-decoration: none;
          position: relative;
          transition: all 0.3s ease;
          padding: 5px 0;
        }

        .navbar-link:hover {
          color: #ffde7d;
          transform: translateY(-1px);
        }

        .navbar-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #ffffff;
          transition: width 0.3s ease;
          border-radius: 1px;
        }

        .navbar-link:hover::after {
          width: 100%;
        }

        .navbar-menu-button {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: transparent;
          border: 2px solid #ffffff;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .navbar-menu-button:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .navbar-icon {
          width: 25px;
          height: 3px;
          background: #ffffff;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .navbar-icon-open {
          width: 25px;
          height: 3px;
          background: #ffffff;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .navbar-mobile-menu {
          display: none;
          position: absolute;
          top: calc(100% + 20px);
          left: 77px;
          right: 77px;
          background: #00b8a9;
          border: 2px solid #ffffff;
          border-radius: 25px;
          box-shadow: 0 8px 32px rgba(0, 184, 169, 0.3);
          flex-direction: column;
          padding: 20px;
          gap: 10px;
          transform: translateY(-20px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s ease;
        }

        .navbar-mobile-menu-open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .navbar-mobile-link {
          font-family: Nort, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 18px;
          font-weight: 500;
          color: #ffffff;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
        }

        .navbar-mobile-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffde7d;
        }

        @media (max-width: 1024px) {
          .navbar-header {
            padding: 0 40px;
          }

          .navbar-header.navbar-scrolled {
            padding: 10px 40px;
          }

          .navbar-container {
            padding: 0 30px;
          }

          .navbar-menu {
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .navbar-header {
            padding: 0 20px;
            top: 15px;
          }

          .navbar-header.navbar-scrolled {
            top: 0;
            padding: 8px 20px;
          }

          .navbar-container {
            padding: 0 20px;
            height: 60px;
          }

          .navbar-container.navbar-container-scrolled {
            height: 55px;
          }

          .navbar-logo a {
            font-size: 20px;
          }

          .navbar-menu {
            display: none;
          }

          .navbar-menu-button {
            display: flex;
          }

          .navbar-mobile-menu {
            display: flex;
            left: 20px;
            right: 20px;
          }
        }

        @media (max-width: 480px) {
          .navbar-header {
            padding: 0 15px;
            top: 10px;
          }

          .navbar-header.navbar-scrolled {
            top: 0;
            padding: 8px 15px;
          }

          .navbar-container {
            padding: 0 15px;
          }

          .navbar-container.navbar-container-scrolled {
            height: 50px;
          }

          .navbar-logo a {
            font-size: 18px;
          }

          .navbar-mobile-menu {
            left: 15px;
            right: 15px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
