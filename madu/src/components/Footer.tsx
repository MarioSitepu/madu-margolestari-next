import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import honeyLogo from "@/assets/1.svg";
import honeycomb from "@/assets/2.png";

export function Footer() {
  const [email, setEmail] = useState("");
  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle subscription logic here
    alert("Terima kasih telah berlangganan!");
    setEmail("");
  };
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Top section with subscription form */}
      <section className="relative bg-[#ffde7d] w-full pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-0 sm:pb-0 relative">
          {/* White container with subscription form */}
          <div className="bg-white rounded-2xl max-w-6xl mx-auto -mb-12 sm:-mb-16 md:-mb-20 lg:-mb-24 xl:-mb-28 p-3 sm:p-5 md:p-6 lg:p-8 relative shadow-[0_4px_6px_rgba(0,0,0,0.8)] min-h-[180px] sm:min-h-[240px] md:min-h-[280px]">
            {/* Honeycomb image */}
            <div className="absolute -top-4 sm:-top-6 md:-top-8 lg:-top-10 xl:-top-12 left-0 md:-left-6 w-28 sm:w-40 md:w-56 lg:w-80 xl:w-96 hidden sm:block">
              <img
                src={honeycomb}
                alt="Honeycomb with honey"
                className="w-full h-auto"
              />
            </div>
            {/* Subscription content */}
            <div className="grid md:grid-cols-2 pt-6 sm:pt-8 md:pt-10 lg:pt-3 gap-4 md:gap-0 md:-ml-8 lg:-ml-12 xl:-ml-55">
              <div className="md:col-span-1 hidden md:block">
                {/* Empty column on mobile, image space on desktop */}
              </div>
              <div className="md:col-span-1 space-y-1.5 sm:space-y-2 md:space-y-1">
                <h2 className="text-[#00b8a9] text-lg sm:text-xl md:text-2xl lg:text-[27px] font-bold">
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
                <p className="text-[#00b8a9] text-xs sm:text-sm md:text-[14px] font-m">
                  Dapatkan{" "}
                  <span className="text-[#ffde7d] underline">diskon 20%</span>{" "}
                  untuk pembelian pertama Anda hanya dengan berlangganan
                  newsletter kami.
                </p>
                <form onSubmit={handleSubscribe} className="relative">
                  <div className="bg-[#00b8a9] rounded-full p-1 flex flex-col sm:flex-row items-stretch sm:items-center max-w-full sm:max-w-lg md:max-w-120 mt-3 sm:mt-4 md:mt-5 mb-1.5 sm:mb-2 md:mb-2.5">
                    <div className="flex items-center flex-1 pl-3 sm:pl-4 mb-2 sm:mb-0">
                      <Mail className="w-4 h-4 mr-2 flex-shrink-0 text-white" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email Anda"
                        className="bg-transparent text-xs sm:text-sm text-white placeholder-white/70 outline-none w-full"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#ffde7d] text-black font-medium text-xs sm:text-sm py-2 px-3 sm:px-4 md:px-3 sm:mr-3 rounded-full hover:bg-[#f5c869] transition whitespace-nowrap"
                    >
                      Berlangganan
                    </button>
                  </div>
                </form>
                <p className="text-[#00b8a9] text-xs sm:text-sm md:text-[14px]">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mt-6 sm:mt-8 md:mt-10">
            {/* Company info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <img
                  src={honeyLogo}
                  alt="Honeycomb logo"
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                />
                <h3 className="text-[#ffde7d] text-xl sm:text-2xl font-bold ml-2">
                  Madu Margo Lestari
                </h3>
              </div>
              <p className="text-sm sm:text-base leading-relaxed mb-4 text-white/90">
                UMKM Lebah Madu Margolestari merupakan usaha mikro, kecil, dan
                menengah yang berfokus pada budidaya lebah madu dan produksi
                madu murni berkualitas tinggi.
              </p>
              {/* Social Media Links */}
              <div className="flex gap-3 mt-6">
                <a
                  href="https://www.facebook.com/madumargolestari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#ffde7d] hover:text-[#00b8a9] flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/madumargolestari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#ffde7d] hover:text-[#00b8a9] flex items-center justify-center transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/madumargolestari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#ffde7d] hover:text-[#00b8a9] flex items-center justify-center transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            {/* Navigation Links */}
            <div className="space-y-4">
              <h4 className="text-[#ffde7d] text-lg sm:text-xl font-bold mb-4">
                Navigasi
              </h4>
              <ul className="space-y-3 text-sm sm:text-base">
                <li>
                  <Link to="/" className="hover:text-[#ffde7d] transition-colors inline-block">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link to="/product" className="hover:text-[#ffde7d] transition-colors inline-block">
                    Produk
                  </Link>
                </li>
                <li>
                  <Link to="/article" className="hover:text-[#ffde7d] transition-colors inline-block">
                    Artikel
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#ffde7d] transition-colors inline-block">
                    Tentang Kami
                  </Link>
                </li>
              </ul>
            </div>
            {/* Support & Info */}
            <div className="space-y-4">
              <h4 className="text-[#ffde7d] text-lg sm:text-xl font-bold mb-4">
                Informasi
              </h4>
              <ul className="space-y-3 text-sm sm:text-base">
                <li>
                  <a href="#" className="hover:text-[#ffde7d] transition-colors inline-block">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ffde7d] transition-colors inline-block">
                    Syarat & Ketentuan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ffde7d] transition-colors inline-block">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ffde7d] transition-colors inline-block">
                    Bantuan
                  </a>
                </li>
              </ul>
            </div>
            {/* Contact Us */}
            <div className="space-y-4">
              <h4 className="text-[#ffde7d] text-lg sm:text-xl font-bold mb-4">
                Hubungi Kami
              </h4>
              <ul className="space-y-4 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#ffde7d] flex-shrink-0 mt-0.5" />
                  <a href="tel:+6281234567890" className="hover:text-[#ffde7d] transition-colors">
                    +62 812-3456-7890
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#ffde7d] flex-shrink-0 mt-0.5" />
                  <a href="mailto:info@madumargolestari.com" className="hover:text-[#ffde7d] transition-colors break-all">
                    info@madumargolestari.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#ffde7d] flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">
                    Jl. Lebah Madu No. 123<br />
                    Bandung, Jawa Barat 40123
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-white/30 w-full mt-8 sm:mt-12"></div>
        {/* Copyright */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-40 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 text-sm sm:text-base">
            <div className="text-center md:text-left text-white/80">
              © {new Date().getFullYear()} <span className="text-[#ffde7d] font-semibold">Madu Margo Lestari</span>. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              <a href="#" className="hover:text-[#ffde7d] transition-colors whitespace-nowrap">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-[#ffde7d] transition-colors whitespace-nowrap">
                Syarat & Ketentuan
              </a>
              <a href="#" className="hover:text-[#ffde7d] transition-colors whitespace-nowrap">
                Legal
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
