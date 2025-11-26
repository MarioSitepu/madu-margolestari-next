import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, CheckCircle, X } from "lucide-react";
import honeyLogo from "@/assets/1.svg";
import honeycomb from "@/assets/2.png";

export function Footer() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSuccess(true);
    setEmail("");
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <footer className="flex flex-col w-full">
      
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Pendaftaran Berhasil</h3>
              </div>
              <button 
                onClick={() => setShowSuccess(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Terima kasih telah mendaftar. Kami akan mengirimkan update terbaru mengenai produk dan informasi terkini langsung ke email Anda.
            </p>
            <button 
              onClick={() => setShowSuccess(false)} 
              className="w-full bg-[#00b8a9] hover:bg-[#009d92] text-white font-bold py-3 rounded-lg transition-colors duration-200"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      
      {/* ==========================================
         BAGIAN 1: NEWSLETTER (Background Kuning)
         ========================================== */}
      <div className="relative bg-[#ffde7d] pt-16 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto relative z-10">
          
          {/* Floating White Card */}
          {/* Menggunakan -mb agar kartu ini turun menimpa section hijau di bawahnya */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 -mb-40 md:-mb-48 relative overflow-hidden">
            
            {/* Dekorasi Sarang Lebah */}
            <img
              src={honeycomb}
              alt="Dekorasi"
              className="absolute top-0 left-0 w-24 md:w-48 opacity-50 md:opacity-100 pointer-events-none transform -translate-x-4 -translate-y-4"
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              
              {/* Teks Ajakan */}
              <div className="text-center lg:text-left max-w-xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Nort, sans-serif' }}>
                  Tetap <span className="text-[#00b8a9]">Terhubung</span> Dengan Kami
                </h2>
                <p className="text-gray-600">
                  Dapatkan update terbaru tentang produk madu premium dan informasi UMKM kami langsung ke email Anda.
                </p>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan email Anda..."
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00b8a9] transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#00b8a9] hover:bg-[#008f82] text-white font-bold rounded-full shadow-lg transition-all hover:-translate-y-1 whitespace-nowrap"
                >
                  Berlangganan
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          BAGIAN 2: FOOTER UTAMA (Background Hijau)
         ========================================== */}
      <div className="bg-[#00b8a9] text-white pt-44 md:pt-52 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Kolom 1: Brand Info */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                  <img src={honeyLogo} alt="Logo" className="w-8 h-8" />
                </div>
                <span className="text-2xl font-bold text-[#ffde7d]" style={{ fontFamily: 'Nort, sans-serif' }}>
                  Madu Jaya Lestari
                </span>
              </Link>
              <p className="text-white/90 leading-relaxed text-sm">
                UMKM Lebah Madu Margolestari menghadirkan madu hutan asli berkualitas premium dari Lampung Selatan. Murni, alami, dan menyehatkan.
              </p>
              {/* Social Icons */}
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="bg-white/10 hover:bg-[#ffde7d] hover:text-black p-2.5 rounded-full transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Kolom 2: Navigasi (Sudah dirapikan, tidak ada duplikasi 'Tentang Kami') */}
            <div>
              <h4 className="text-lg font-bold text-[#ffde7d] mb-6">Menu Utama</h4>
              <ul className="space-y-4 text-sm">
                {['Beranda', 'Produk', 'Artikel', 'Tentang Kami'].map((item) => (
                  <li key={item}>
                    <Link 
                      to={item === 'Beranda' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                      className="hover:text-[#ffde7d] transition-colors inline-flex items-center gap-2"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolom 3: Bantuan */}
            <div>
              <h4 className="text-lg font-bold text-[#ffde7d] mb-6">Bantuan</h4>
              <ul className="space-y-4 text-sm">
                {['Cara Pemesanan', 'Info Pengiriman', 'FAQ', 'Kebijakan Privasi'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#ffde7d] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolom 4: Kontak */}
            <div>
              <h4 className="text-lg font-bold text-[#ffde7d] mb-6">Hubungi Kami</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#ffde7d] shrink-0 mt-0.5" />
                  <span>Margo Lestari, Kec. Jati Agung, Lampung Selatan</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#ffde7d] shrink-0" />
                  <a href="tel:+6281234567890" className="hover:underline">+62 812-3456-7890</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#ffde7d] shrink-0" />
                  <a href="mailto:info@lebahmadu.co.id" className="hover:underline">info@lebahmadu.co.id</a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#ffde7d] shrink-0" />
                  <span>Senin - Sabtu: 08:00 - 17:00</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 mt-16 pt-8 text-center text-sm text-white/60">
            <p>© {new Date().getFullYear()} Madu Jaya Lestari. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
