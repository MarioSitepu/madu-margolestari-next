import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
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
          <div className="bg-white rounded-2xl max-w-6xl mx-auto -mb-12 sm:-mb-16 md:-mb-20 lg:-mb-24 xl:-mb-28 p-3 sm:p-5 md:p-6 lg:p-8 relative shadow-[0_4px_6px_rgba(0,0,0,0.8)] min-h-[180px] sm:min-h-[240px] md:min-h-[280px]">
            {/* Honeycomb image */}
            <div className="absolute -top-4 sm:-top-6 md:-top-8 lg:-top-10 xl:-top-12 left-0 md:-left-6 w-28 sm:w-40 md:w-56 lg:w-80 xl:w-96 hidden md:block">
              <img
                src={honeycomb}
                alt="Sarang lebah madu alami dari peternakan Madu Margo Lestari - Produk madu murni berkualitas tinggi"
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
                  <div className="bg-[#00b8a9] rounded-full p-1 flex flex-row items-center sm:items-center max-w-full sm:max-w-lg md:max-w-120 mt-3 sm:mt-4 md:mt-5 mb-1.5 sm:mb-2 md:mb-2.5">
                    <div className="flex items-center flex-1 pl-3 sm:pl-4">
                      <img
                        src="https://uploadthingy.s3.us-west-1.amazonaws.com/1Zxs7CjJ4YZ6xotFV6yEXr/3607decd973daa13410de1b04b7029e9e99f9fd5.svg"
                        alt=""
                        className="w-4 h-4 mr-2 shrink-0"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email Anda"
                        className="bg-transparent text-xs sm:text-sm text-black outline-none w-full"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="
                      bg-[#ffde7d] text-black font-medium 
                      text-xs sm:text-sm 
                      py-2 px-3 
                      sm:px-4 
                      md:px-3 
                      sm:mr-3 rounded-full 
                      hover:bg-[#f5c869] 
                      transition whitespace-nowrap
                      flex-shrink-0
                      "
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
                  <a href="#" className="text-[#ffde7d] underline">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-4 mt-6 sm:mt-8 md:mt-10">
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
              <p className="text-xs sm:text-sm mt-2 sm:mt-0 pr-2 sm:pr-3 md:pr-4">
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
                  href="https://twitter.com/madumargolestari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ffde7d] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            {/* Navigation Links */}
            <div className="space-y-3 sm:space-y-3">
              <h4 className="text-[#ffde7d] text-base sm:text-lg lg:text-xl font-medium underline">
                Navigasi
              </h4>
              <ul className="space-y-3 text-sm sm:text-[15px]">
                <li>
                  <Link to="/" className="hover:underline">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link to="/product" className="hover:underline">
                    Produk
                  </Link>
                </li>
                <li>
                  <Link to="/article" className="hover:underline">
                    Artikel
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:underline">
                    Tentang Kami
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3 sm:space-y-3">
              <h4 className="text-[#ffde7d] text-base sm:text-lg lg:text-xl font-medium underline">
                Bantuan
              </h4>
              <ul className="space-y-3 text-sm sm:text-[15px]">
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
            <div className="space-y-3 sm:space-y-3">
              <h4 className="text-[#ffde7d] text-base sm:text-lg lg:text-xl font-medium underline">
                Informasi
              </h4>
              <ul className="space-y-3 text-sm sm:text-[15px]">
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
            <div className="space-y-[18px] sm:space-y-[18px]">
              <h4 className="text-[#ffde7d] text-base sm:text-lg lg:text-xl font-medium underline">
                Kontak Kami
              </h4>
              <ul className="space-y-[18px] text-sm sm:text-[15px]">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span className="break-all">
                    Margo Lestari, Kec. Jati Agung, Kabupaten Lampung Selatan,
                    Lampung 35365
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0" />
                  <a
                    href="tel:+6281234567890"
                    className="hover:underline break-all"
                  >
                    +62 812-3456-7890
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0" />
                  <a
                    href="mailto:info@lebahmadu.co.id"
                    className="hover:underline break-all"
                  >
                    info@lebahmadu.co.id
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Senin - Sabtu: 08:00 - 17:00 WIB</span>
                </li>
              </ul>
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
