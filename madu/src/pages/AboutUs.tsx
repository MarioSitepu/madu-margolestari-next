import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, Award, Users, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import marlesHoney from "@/assets/marles-honey.png";
import honeyBg from "@/assets/honey-bg-6badc9.png";

export const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Award,
      title: "Kualitas Terjamin",
      description: "Produk madu berkualitas tinggi dan murni",
    },
    {
      icon: Users,
      title: "Berpengalaman",
      description: "Lebih dari 10 tahun di industri madu",
    },
    {
      icon: Heart,
      title: "Ramah Lingkungan",
      description: "Dipanen dengan standar kebersihan ketat",
    },
    {
      icon: Sparkles,
      title: "Manfaat Kesehatan",
      description: "Kaya akan manfaat untuk kesehatan",
    },
  ];

  const testimonials = [
    {
      name: "Ibu Siti",
      role: "Pelanggan Setia",
      quote: "Madu dari UMKM ini benar-benar murni dan berkualitas. Anak-anak saya sangat suka!",
      rating: 5,
    },
    {
      name: "Pak Ahmad",
      role: "Pemilik Toko",
      quote: "Sudah 5 tahun saya menjual produk mereka. Pelanggan selalu puas dengan kualitasnya.",
      rating: 5,
    },
    {
      name: "Ibu Maya",
      role: "Konsumen",
      quote: "Rasanya autentik dan manfaatnya terasa. Sangat recommended untuk kesehatan keluarga!",
      rating: 5,
    },
  ];

  const stats = [
    { value: "10+", label: "Tahun Berpengalaman" },
    { value: "5000+", label: "Pelanggan Puas" },
    { value: "100%", label: "Madu Murni" },
    { value: "50+", label: "Mitra Peternak" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEO 
        title="Tentang Kami - Madu Margo Lestari | Profil UMKM Madu Terpercaya"
        description="Kenali Madu Margo Lestari - UMKM madu terpercaya dengan lebih dari 10 tahun pengalaman. Kami menyediakan madu murni 100% asli dari peternakan lebah terbaik di Margo Lestari, Jati Agung, Lampung Selatan. Komitmen kami adalah memberikan produk berkualitas tinggi dengan standar kebersihan ketat. Lebih dari 5000 pelanggan puas dan 50+ mitra peternak."
        keywords="tentang madu margo lestari, profil perusahaan madu, sejarah madu margo lestari, visi misi madu, umkm madu lampung, peternakan lebah lampung selatan, madu jati agung, profil umkm madu, sejarah madu margo lestari, komitmen kualitas madu"
        url="https://madumargolestari.vercel.app/about"
        image="https://madumargolestari.vercel.app/marles-honey.png"
        breadcrumbs={[
          { name: 'Beranda', url: 'https://madumargolestari.vercel.app/' },
          { name: 'Tentang Kami', url: 'https://madumargolestari.vercel.app/about' }
        ]}
      />
      {/* Hero Section with Honey Image */}
      <section className="relative min-h-[50vh] overflow-hidden bg-[#ffde7d] text-black lg:min-h-[60vh]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container relative mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[50vh] items-center gap-6 py-12 sm:py-16 lg:min-h-[60vh] lg:grid-cols-2 lg:gap-8 lg:py-20">
            {/* Left Content */}
            <div
              className={`z-10 space-y-6 transition-all duration-1000 lg:space-y-7 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="space-y-4 lg:space-y-5">
                <h1 
                  className="text-3xl font-black leading-tight text-black sm:text-4xl lg:mb-4 lg:text-5xl"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  Tentang{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#00b8a9]">Kami</span>
                    {/* Underline matching home page style */}
                    <span 
                      className="absolute left-0 bg-black"
                      style={{ 
                        width: 'clamp(80px, 12vw, 150px)', 
                        height: 'clamp(6px, 0.6vw, 9px)',
                        bottom: 'clamp(-6px, -0.6vw, -9px)'
                      }}
                    ></span>
                  </span>
                </h1>
                <p className="text-sm leading-relaxed text-black/70 sm:text-base lg:text-lg">
                  Selamat datang di <span className="font-semibold text-[#00b8a9]">UMKM Lebah Madu</span>, penyedia madu alami terbaik
                  yang berasal dari lebah pilihan.
                </p>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-black/70 sm:text-sm lg:max-w-2xl lg:text-base">
                <p>
                  Kami berkomitmen untuk menyediakan produk madu berkualitas tinggi, murni, dan kaya akan manfaat kesehatan.
                </p>
                <p>
                  Di lokasi kami, kami menjamin <span className="font-semibold text-[#00b8a9]">keberlanjutan dan kelestarian lebah</span>, memastikan bahwa setiap produk yang kami hasilkan berasal dari lingkungan alami dan ramah lingkungan.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-4 sm:pt-6 sm:flex-row">
                <Button 
                  className="bg-[#00B8A9] text-white hover:bg-[#009a8d] font-bold rounded-none px-10 py-4 text-sm flex-1 sm:flex-none"
                  style={{ 
                    fontFamily: 'Nort, sans-serif',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)',
                    fontSize: '12px',
                    lineHeight: '1.342'
                  }}
                >
                  Hubungi Kami
                </Button>
                <Link to="/product" className="flex-1 sm:flex-none">
                  <Button
                    className="bg-white text-[#00B8A9] hover:bg-gray-50 font-bold rounded-none px-10 py-4 text-sm w-full sm:w-auto"
                    style={{ 
                      fontFamily: 'Nort, sans-serif',
                      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)',
                      fontSize: '12px',
                      lineHeight: '1.342'
                    }}
                  >
                    Lihat Produk
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Honey Image */}
            <div
              className={`relative transition-all duration-1000 delay-200 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/40 bg-white/40 shadow-xl backdrop-blur lg:aspect-4/5 max-w-md mx-auto">
                <img 
                  src={marlesHoney} 
                  alt="Madu murni asli dari peternakan lebah Madu Margo Lestari di Jati Agung, Lampung Selatan - Produk madu berkualitas tinggi 100% alami" 
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient untuk efek */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/20" />
                {/* Decorative elements */}
                <div className="absolute right-6 top-6 h-12 w-12 animate-float rounded-full bg-white/40 blur-xl" />
                <div
                  className="absolute left-6 bottom-12 h-20 w-20 animate-float rounded-full bg-white/30 blur-2xl"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="border border-[#00b8a9]/20 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:p-8"
              >
                <div 
                  className="mb-2 text-3xl font-black text-[#00b8a9] lg:text-5xl"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-sm font-medium text-gray-700 lg:text-base"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#ffde7d] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center lg:mb-16">
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-10 md:mb-12"
              style={{ fontFamily: 'Nort, sans-serif' }}
            >
              Mengapa Memilih{" "}
              <span className="text-[#00b8a9] relative inline-block">
                Kami?
                {/* Underline matching home page style */}
                <span 
                  className="absolute left-0 bg-black"
                  style={{ 
                    width: 'clamp(100px, 15vw, 200px)', 
                    height: 'clamp(8px, 0.77vw, 11.02px)',
                    bottom: 'clamp(-8px, -0.77vw, -11.02px)'
                  }}
                ></span>
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-4 md:mb-5 shadow-xl border-4 border-white">
                    <Icon size={56} stroke="#00b8a9" strokeWidth={2.5} />
                  </div>
                  <h3 
                    className="text-xl md:text-2xl font-black mb-2 md:mb-3"
                    style={{ fontFamily: 'Nort, sans-serif' }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-xs md:text-sm leading-relaxed text-gray-800"
                    style={{ fontFamily: 'Nort, sans-serif' }}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative w-full overflow-hidden bg-[#00b8a9] py-16 md:py-24">
        {/* Background image */}
        <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
          <img src={honeyBg} alt="Background tetesan madu alami dari peternakan lebah Madu Margo Lestari - Visualisasi madu murni berkualitas" className="object-cover w-full h-full opacity-30" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="mb-12 text-center lg:mb-16">
            <div className="flex flex-wrap justify-center items-baseline mb-8">
              <h2 
                className="text-4xl md:text-5xl font-bold text-white mr-3"
                style={{ fontFamily: 'Nort, sans-serif' }}
              >
                Apa Kata
              </h2>
              <div className="flex flex-col">
                <h2 
                  className="text-4xl md:text-5xl font-bold text-[#ffde7d]"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  Mereka?
                </h2>
                <div className="h-1 bg-white w-full mt-2"></div>
              </div>
            </div>
            <p className="mx-auto max-w-2xl text-base text-white/90 lg:text-lg">
              Kepuasan pelanggan adalah prioritas utama kami
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border border-white/20 bg-white/95 backdrop-blur-sm p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl lg:p-8"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-[#ffde7d]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p 
                  className="mb-6 text-sm italic leading-relaxed text-gray-700 lg:text-base"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00b8a9] text-lg font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div 
                      className="font-semibold text-gray-900"
                      style={{ fontFamily: 'Nort, sans-serif' }}
                    >
                      {testimonial.name}
                    </div>
                    <div 
                      className="text-sm text-gray-600"
                      style={{ fontFamily: 'Nort, sans-serif' }}
                    >
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="relative w-full overflow-hidden bg-[#ffde7d] py-16 text-black lg:py-24">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h2 
                  className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  Kunjungi{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#00b8a9]">Kami</span>
                    {/* Underline matching home page style */}
                    <span 
                      className="absolute left-0 bg-black"
                      style={{ 
                        width: 'clamp(80px, 12vw, 150px)', 
                        height: 'clamp(6px, 0.6vw, 9px)',
                        bottom: 'clamp(-6px, -0.6vw, -9px)'
                      }}
                    ></span>
                  </span>
                </h2>
                <p className="text-base leading-relaxed text-black lg:text-lg">
                  Ayo kunjungi kami di tempat ini untuk melihat proses pengerjaan serta melihat langsung dari sarangnya
                </p>
              </div>

              <div className="space-y-4">
                <div 
                  className="flex items-start gap-4 rounded-none bg-[#00B8A9] p-4"
                  style={{ 
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)'
                  }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white">
                    <MapPin className="h-6 w-6 text-[#00b8a9]" />
                  </div>
                  <div>
                    <div className="mb-1 font-semibold text-white">Alamat</div>
                    <div className="text-sm text-white">Margo Lestari, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35365</div>
                  </div>
                </div>

                <div 
                  className="flex items-start gap-4 rounded-none bg-[#00B8A9] p-4"
                  style={{ 
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)'
                  }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white">
                    <Phone className="h-6 w-6 text-[#00b8a9]" />
                  </div>
                  <div>
                    <div className="mb-1 font-semibold text-white">Telepon</div>
                    <div className="text-sm text-white">+62 812-3456-7890</div>
                  </div>
                </div>

                <div 
                  className="flex items-start gap-4 rounded-none bg-[#00B8A9] p-4"
                  style={{ 
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)'
                  }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white">
                    <Mail className="h-6 w-6 text-[#00b8a9]" />
                  </div>
                  <div>
                    <div className="mb-1 font-semibold text-white">Email</div>
                    <div className="text-sm text-white">info@lebahmadu.co.id</div>
                  </div>
                </div>

                <div 
                  className="flex items-start gap-4 rounded-none bg-[#00B8A9] p-4"
                  style={{ 
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)'
                  }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white">
                    <Clock className="h-6 w-6 text-[#00b8a9]" />
                  </div>
                  <div>
                    <div className="mb-1 font-semibold text-white">Jam Operasional</div>
                    <div className="text-sm text-white">Senin - Sabtu: 08:00 - 17:00 WIB</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-0 bg-white p-6 text-left text-black shadow-2xl lg:p-8">
              <div className="mb-6 flex aspect-video items-center justify-center rounded-xl bg-linear-to-br from-[#ffde7d] to-[#f4d58d]">
                <MapPin className="h-16 w-16 text-[#00b8a9]" />
              </div>
              <h3 
                className="text-xl font-bold text-black lg:text-2xl"
                style={{ fontFamily: 'Nort, sans-serif' }}
              >
                Temukan Lokasi Kami
              </h3>
              <p className="mb-6 text-sm text-black lg:text-base">
                Kunjungi farm kami dan lihat langsung proses pembuatan madu berkualitas tinggi
              </p>
              <Button 
                className="w-full bg-[#00B8A9] text-white hover:bg-[#009a8d] font-bold rounded-none py-6"
                style={{ 
                  fontFamily: 'Nort, sans-serif',
                  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 1)',
                  fontSize: '14px',
                  lineHeight: '1.342'
                }}
              >
                Buka di Google Maps
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default AboutUs;

