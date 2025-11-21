import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, Award, Users, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
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
      {/* Hero Section with Honey Image */}
      <section className="relative min-h-[70vh] overflow-hidden bg-[#ffde7d] text-black lg:min-h-[80vh]">
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
          <div className="grid min-h-[70vh] items-center gap-8 py-12 lg:min-h-[80vh] lg:grid-cols-2 lg:gap-12 lg:py-20">
            {/* Left Content */}
            <div
              className={`z-10 space-y-6 transition-all duration-1000 lg:space-y-8 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <Badge className="border-[#00b8a9]/40 bg-white/70 px-4 py-2 text-sm text-[#00b8a9] shadow hover:bg-white sm:text-base">
                <Sparkles className="mr-2 h-4 w-4" />
                UMKM Terpercaya
              </Badge>

              <div>
                <h1 
                  className="text-4xl font-black leading-tight text-black sm:text-5xl lg:mb-6 lg:text-7xl"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  Tentang{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#00b8a9]">Kami</span>
                    <span className="absolute bottom-1 left-0 h-2 w-full bg-[#00b8a9]/30" />
                  </span>
                </h1>
                <p className="text-base leading-relaxed text-black/70 sm:text-lg lg:text-xl">
                  Selamat datang di <span className="font-semibold text-[#00b8a9]">UMKM Lebah Madu</span>, penyedia madu alami terbaik
                  yang berasal dari lebah pilihan.
                </p>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-black/70 sm:text-base lg:max-w-2xl lg:text-lg">
                <p>
                  Kami berkomitmen untuk menyediakan produk madu berkualitas tinggi, murni, dan kaya akan manfaat kesehatan.
                </p>
                <p>
                  Di lokasi kami, kami menjamin <span className="font-semibold text-[#00b8a9]">keberlanjutan dan kelestarian lebah</span>, memastikan bahwa setiap produk yang kami hasilkan berasal dari lingkungan alami dan ramah lingkungan.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Button 
                  className="rounded-xl bg-[#00b8a9] px-8 py-6 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#009a8d]" 
                  size="lg"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  Hubungi Kami
                </Button>
                <Link to="/product">
                  <Button
                    className="rounded-xl border-2 border-[#00b8a9] bg-white px-8 py-6 text-base font-semibold text-[#00b8a9] transition-all duration-300 hover:bg-[#00b8a9]/10 hover:border-[#009a8d]"
                    size="lg"
                    variant="outline"
                    style={{ fontFamily: 'Nort, sans-serif' }}
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
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/40 bg-white/40 shadow-2xl backdrop-blur lg:aspect-4/5">
                <img 
                  src={marlesHoney} 
                  alt="Madu Margo Lestari" 
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient untuk efek */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                {/* Decorative elements */}
                <div className="absolute right-10 top-10 h-20 w-20 animate-float rounded-full bg-white/40 blur-2xl" />
                <div
                  className="absolute left-10 bottom-20 h-32 w-32 animate-float rounded-full bg-white/30 blur-3xl"
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
              <span className="text-[#00b8a9] relative">
                Kami?
                <span className="absolute bottom-0 left-0 w-full h-1 bg-[#00b8a9]"></span>
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
          <img src={honeyBg} alt="Honey drip background" className="object-cover w-full h-full opacity-30" />
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
      <section className="relative w-full overflow-hidden bg-[#00b8a9] py-16 text-white lg:py-24">
        {/* Background image */}
        <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
          <img src={honeyBg} alt="Honey drip background" className="object-cover w-full h-full opacity-20" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h2 
                  className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
                  style={{ fontFamily: 'Nort, sans-serif' }}
                >
                  Kunjungi{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#ffde7d]">Kami</span>
                    <span className="absolute bottom-1 left-0 h-2 w-full bg-[#ffde7d]/60" />
                  </span>
                </h2>
                <p className="text-base leading-relaxed text-white/80 lg:text-lg">
                  Ayo kunjungi kami di tempat ini untuk melihat proses pengerjaan serta melihat langsung dari sarangnya
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ffde7d]">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <div className="mb-1 font-semibold">Alamat</div>
                    <div className="text-sm text-white/80">Jl. Lebah Madu No. 123, Kota Bandung, Jawa Barat 40123</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ffde7d]">
                    <Phone className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <div className="mb-1 font-semibold">Telepon</div>
                    <div className="text-sm text-white/80">+62 812-3456-7890</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ffde7d]">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <div className="mb-1 font-semibold">Email</div>
                    <div className="text-sm text-white/80">info@lebahmadu.co.id</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ffde7d]">
                    <Clock className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <div className="mb-1 font-semibold">Jam Operasional</div>
                    <div className="text-sm text-white/80">Senin - Sabtu: 08:00 - 17:00 WIB</div>
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
              <p className="mb-6 text-sm text-black/65 lg:text-base">
                Kunjungi farm kami dan lihat langsung proses pembuatan madu berkualitas tinggi
              </p>
              <Button 
                className="w-full rounded-xl bg-[#00b8a9] py-6 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#009a8d]"
                style={{ fontFamily: 'Nort, sans-serif' }}
              >
                Buka di Google Maps
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;

