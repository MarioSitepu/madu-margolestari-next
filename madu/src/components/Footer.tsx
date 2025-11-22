import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from "lucide-react";
import honeyLogo from "@/assets/1.svg";
import honeycomb from "@/assets/2.png";

export function Footer() {
  const [email, setEmail] = useState("");
  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle subscription logic here
    alert("Thank you for subscribing!");
    setEmail("");
  };
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Top section with subscription form */}
      <section className="relative bg-[#ffde7d] w-full pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-0 sm:pb-0 relative">
            {/* White container with subscription form */}
          <div className="bg-white rounded-2xl max-w-6xl mx-auto -mb-12 sm:-mb-16 md:-mb-20 lg:-mb-24 xl:-mb-28 p-3 sm:p-5 md:p-6 lg:p-8 relative shadow-[0_4px_6px_rgba(0,0,0,0.8)] min-h-[180px] sm:min-h-60 md:min-h-[280px]">
            {/* Honeycomb image */}
            <div className="absolute -top-4 sm:-top-6 md:-top-8 lg:-top-10 xl:-top-12 left-0 md:-left-6 w-28 sm:w-40 md:w-56 lg:w-80 xl:w-96 hidden md:block">
              <img
                src={honeycomb}
                alt="Sarang lebah madu alami dari peternakan Madu Margo Lestari - Produk madu murni berkualitas tinggi"
                className="w-full h-auto"
              />
            </div>
            {/* Subscription content */}
            <div className="grid md:grid-cols-2 pt-4 sm:pt-6 md:pt-10 lg:pt-3 gap-4 md:gap-0 md:-ml-8 lg:-ml-12 xl:-ml-55">
              <div className="md:col-span-1 hidden md:block">
                {/* Empty column on mobile, image space on desktop */}
              </div>
              <div className="md:col-span-1 space-y-3 sm:space-y-3 md:space-y-1">
                <h2 className="text-[#00b8a9] text-base sm:text-lg md:text-2xl lg:text-[27px] font-bold leading-tight sm:leading-normal">
                  Berlangganan ke web kami untuk{" "}
                  <span className="hidden sm:inline">
                    <br />
                  </span>{" "}
                  mendapatkan pembaruan tentang{" "}
                  <span className="text-[#ffde7d] underline">
                    penawaran{" "}
                    <span className="hidden sm:inline">
                      <br />
                    </span>
                    menarik
                  </span>{" "}
                  dari kami
                </h2>
                <p className="text-[#00b8a9] text-xs sm:text-sm md:text-[14px] leading-relaxed">
                  Dapatkan{" "}
                  <span className="text-[#ffde7d] underline font-semibold">diskon 20%</span>{" "}
                  untuk pembelian pertama Anda hanya dengan berlangganan
                  newsletter kami.
                </p>
                <form onSubmit={handleSubscribe} className="relative mt-4 sm:mt-5 md:mt-5">
                  {/* Mobile Layout - Stacked */}
                  <div className="flex flex-col sm:hidden gap-3">
                    {/* Email Input Container - Background hijau seperti desktop */}
                    <div className="bg-[#00b8a9] rounded-full px-4 py-3.5 flex items-center gap-3 shadow-md">
                      <div className="flex items-center justify-center w-5 h-5 shrink-0">
                        <img
                          src="https://uploadthingy.s3.us-west-1.amazonaws.com/1Zxs7CjJ4YZ6xotFV6yEXr/3607decd973daa13410de1b04b7029e9e99f9fd5.svg"
                          alt="Email icon"
                          className="w-5 h-5"
                        />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email Anda"
                        className="bg-transparent text-sm text-white placeholder:text-white/70 outline-none w-full flex-1"
                        required
                      />
                    </div>
                    {/* Button - Warna kuning seperti desktop */}
                    <button
                      type="submit"
                      className="bg-[#ffde7d] text-black font-bold text-sm py-3.5 px-6 rounded-full hover:bg-[#f5c869] active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl w-full"
                    >
                      Berlangganan
                    </button>
                  </div>
                  
                  {/* Desktop/Tablet Layout - Horizontal */}
                  <div className="hidden sm:flex bg-[#00b8a9] rounded-full p-1 items-center max-w-lg md:max-w-120">
                    <div className="flex items-center flex-1 pl-4 pr-2">
                      <img
                        src="https://uploadthingy.s3.us-west-1.amazonaws.com/1Zxs7CjJ4YZ6xotFV6yEXr/3607decd973daa13410de1b04b7029e9e99f9fd5.svg"
                        alt="Email icon"
                        className="w-4 h-4 mr-2 shrink-0"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email Anda"
                        className="bg-transparent text-sm text-white placeholder:text-white/70 outline-none w-full py-2"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#ffde7d] text-black font-semibold text-sm py-2 px-4 md:px-3 mr-3 rounded-full hover:bg-[#f5c869] active:scale-95 transition-all duration-200 whitespace-nowrap"
                    >
                      Berlangganan
                    </button>
                  </div>
                </form>
                <p className="text-[#00b8a9] text-[11px] sm:text-xs md:text-[14px] leading-relaxed mt-2 sm:mt-1.5 md:mt-2.5">
                  Anda dapat berhenti berlangganan kapan saja.
                  <span className="hidden sm:inline">
                    <br />
                  </span>{" "}
                  Baca kebijakan privasi kami{" "}
                  <a href="#" className="text-[#ffde7d] underline hover:text-[#f5c869] transition-colors">
                    di sini
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer section */}
      <section className="bg-[#00b8a9] text-white grow">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10 2xl:px-40 py-8 sm:py-12 md:py-15 pt-12 sm:pt-16 md:pt-20 lg:pt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 md:gap-4 lg:gap-5 xl:gap-4 mt-6 sm:mt-8 md:mt-10">
            {/* Company info */}
            <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
              <div className="flex items-center -ml-2 sm:-ml-4 md:-ml-7">
                <img
                  src={honeyLogo}
                  alt="Logo Madu Margo Lestari - UMKM madu murni asli dari Lampung Selatan"
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                />
                <h3 className="text-[#ffde7d] text-xl sm:text-2xl font-bold mt-2 -ml-2 sm:-ml-3">
                  Madu Margo Lestari
                </h3>
              </div>
              <p className="text-xs sm:text-sm mt-6 sm:mt-8 md:mt-12 pr-2 sm:pr-3 md:pr-4">
                UMKM Lebah Madu Margolestari merupakan usaha mikro, kecil, dan
                menengah yang berfokus pada budidaya lebah madu dan produksi
                madu murni berkualitas tinggi.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="https://www.facebook.com/madumargolestari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ffde7d] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/madumargolestari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ffde7d] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.youtube.com/@madumargolestari" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#ffde7d] transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#ffde7d] transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com/madumargolestari" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#ffde7d] transition-colors"
                  aria-label="X"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.727l-5.1-6.664-5.834 6.664H2.561l7.746-8.868L1.236 2.25h6.886l4.612 6.1L17.9 2.25zM16.856 18.75h1.83L7.01 3.99H5.08l11.776 14.76z"/>
                  </svg>
                </a>
              </div>
            </div>
            {/* Navigation Links - Horizontal */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-[#ffde7d] text-base sm:text-lg lg:text-xl font-medium underline">
                Navigasi
              </h4>
              <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-[15px]">
                <Link 
                  to="/" 
                  className="relative group transition-all duration-300"
                >
                  Beranda
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link 
                  to="/product" 
                  className="relative group transition-all duration-300"
                >
                  Produk
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link 
                  to="/article" 
                  className="relative group transition-all duration-300"
                >
                  Artikel
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link 
                  to="/about" 
                  className="relative group transition-all duration-300"
                >
                  Tentang Kami
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
            </div>
            {/* Bantuan dan Informasi - Grid Horizontal */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-2">
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-[#ffde7d] text-base sm:text-lg lg:text-xl font-medium underline">
                  Bantuan
                </h4>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-[15px]">
                  <li>
                    <Link to="/about" className="hover:underline">
                      Hubungi Kami
                    </Link>
                  </li>
                  <li>
                    <a href="#faq" className="hover:underline">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#cara-pemesanan" className="hover:underline">
                      Cara Pemesanan
                    </a>
                  </li>
                  <li>
                    <a href="#pengiriman" className="hover:underline">
                      Info Pengiriman
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-[#ffde7d] text-base sm:text-lg lg:text-xl font-medium underline">
                  Informasi
                </h4>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-[15px]">
                  <li>
                    <Link to="/about" className="hover:underline">
                      Tentang Kami
                    </Link>
                  </li>
                  <li>
                    <a href="#lokasi" className="hover:underline">
                      Lokasi
                    </a>
                  </li>
                  <li>
                    <a href="#jam-operasional" className="hover:underline">
                      Jam Operasional
                    </a>
                  </li>
                  <li>
                    <a href="#testimoni" className="hover:underline">
                      Testimoni
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="xl:col-span-3 space-y-3 sm:space-y-4">
              <h4 className="text-[#ffde7d] text-base sm:text-lg lg:text-xl font-medium underline">
                Kontak Kami
              </h4>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 items-start sm:items-center">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="text-xs sm:text-sm lg:text-[15px] line-clamp-1">
                    Margo Lestari, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35365
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0" />
                  <a href="tel:+6281234567890" className="hover:underline text-xs sm:text-sm lg:text-[15px] whitespace-nowrap">
                    +62 812-3456-7890
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0" />
                  <a href="mailto:info@lebahmadu.co.id" className="hover:underline text-xs sm:text-sm lg:text-[15px] whitespace-nowrap">
                    info@lebahmadu.co.id
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span className="text-xs sm:text-sm lg:text-[15px] whitespace-nowrap">Senin - Sabtu: 08:00 - 17:00 WIB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t-2 sm:border-t-4 border-white w-full shadow-[0_5px_5px_rgba(0,0,0,0.4)]"></div>
        {/* Copyright */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-40 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 text-xs sm:text-sm">
            <div className="flex items-center">
              <span className="text-center sm:text-left">
                © {new Date().getFullYear()} Madu Margo Lestari. All rights
                reserved.
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-16">
              <a
                href="#kebijakan-privasi"
                className="hover:underline whitespace-nowrap"
              >
                Kebijakan Privasi
              </a>
              <a
                href="#syarat-ketentuan"
                className="hover:underline whitespace-nowrap"
              >
                Syarat & Ketentuan
              </a>
              <a href="#legal" className="hover:underline whitespace-nowrap">
                Legal
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
