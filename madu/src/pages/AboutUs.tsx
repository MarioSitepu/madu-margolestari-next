import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, Award, Users, Heart, Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      <section className="relative min-h-[70vh] overflow-hidden bg-linear-to-br from-[#f4d58d] to-[#ffde7d] text-black lg:min-h-[80vh]">
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
                <h1 className="font-display text-4xl font-black leading-tight text-black sm:text-5xl lg:mb-6 lg:text-7xl">
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
                <Button className="rounded-xl bg-black px-8 py-6 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-black/80" size="lg">
                  Hubungi Kami
                </Button>
                <Button
                  className="rounded-xl border border-black/30 bg-white px-8 py-6 text-base font-semibold text-black transition-all duration-300 hover:bg-black/5"
                  size="lg"
                  variant="outline"
                >
                  Lihat Produk
                </Button>
              </div>
            </div>

            {/* Right Content - Honey Image Placeholder */}
            <div
              className={`relative transition-all duration-1000 delay-200 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            >
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/40 bg-white/40 shadow-2xl backdrop-blur lg:aspect-4/5">
                {/* Honey drip effect - using gradient to simulate honey */}
                <div className="absolute inset-0 bg-linear-to-b from-[#ffde7d] via-[#f4d58d] to-[#f1bc64] opacity-90" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="space-y-4 p-8 text-center">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm">
                      <Sparkles className="h-12 w-12 text-[#00b8a9]" />
                    </div>
                    <p className="text-lg font-medium text-black/80">Madu Murni Berkualitas</p>
                  </div>
                </div>
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
                <div className="mb-2 text-3xl font-display font-black text-[#00b8a9] lg:text-5xl">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-black/60 lg:text-base">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-linear-to-b from-white to-[#fff5d6] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center lg:mb-16">
            <Badge className="mb-4 border-[#00b8a9]/40 bg-white/70 px-4 py-2 text-[#00b8a9] shadow">
              Keunggulan Kami
            </Badge>
            <h2 className="font-display text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
              Mengapa Memilih <span className="text-[#00b8a9]">Kami?</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-black/70 lg:text-lg">
              Sebagai UMKM yang berbasis di lokasi strategis, kami bekerja sama dengan peternak lebah lokal
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group border border-[#00b8a9]/20 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl lg:p-8"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00b8a9] shadow-md transition-transform duration-300 group-hover:scale-110 lg:mb-6 lg:h-16 lg:w-16">
                    <Icon className="h-7 w-7 text-white lg:h-8 lg:w-8" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-black lg:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-black/65 lg:text-base">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative overflow-hidden bg-[#fff5d6] py-16 lg:py-24">
        {/* Decorative Background */}
        <div className="absolute right-10 top-10 h-64 w-64 rounded-full bg-white/60 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-[#f4d58d]/40 blur-3xl" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center lg:mb-16">
            <Badge className="mb-4 border-[#ffde7d]/50 bg-white/70 px-4 py-2 text-[#00b8a9] shadow">
              Testimonial
            </Badge>
            <h2 className="font-display text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
              Apa Kata{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#00b8a9]">Mereka?</span>
                <span className="absolute bottom-1 left-0 h-2 w-full bg-[#ffde7d]/70" />
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-black/70 lg:text-lg">
              Kepuasan pelanggan adalah prioritas utama kami
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border border-[#00b8a9]/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl lg:p-8"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-[#ffde7d]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-6 text-sm italic leading-relaxed text-black/65 lg:text-base">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00b8a9] text-lg font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-black">{testimonial.name}</div>
                    <div className="text-sm text-black/60">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="bg-linear-to-br from-[#00b8a9] via-[#00a399] to-[#007f7a] py-16 text-white lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6 lg:space-y-8">
              <div>
                <Badge className="mb-4 border-white/30 bg-white/20 px-4 py-2 text-white">
                  Lokasi Kami
                </Badge>
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
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
              <h3 className="font-display text-xl font-bold text-black lg:text-2xl">
                Temukan Lokasi Kami
              </h3>
              <p className="mb-6 text-sm text-black/65 lg:text-base">
                Kunjungi farm kami dan lihat langsung proses pembuatan madu berkualitas tinggi
              </p>
              <Button className="w-full rounded-xl bg-[#00b8a9] py-6 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#009c91]">
                Buka di Google Maps
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#00b8a9] py-12 text-white lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-display text-2xl font-bold lg:text-3xl">
              UMKM <span className="text-[#ffde7d]">Lebah Madu</span>
            </h3>
            <p className="mx-auto mb-8 max-w-2xl text-white/80">
              Menyediakan madu murni berkualitas tinggi untuk kesehatan keluarga Indonesia
            </p>
            <div className="mb-8 flex justify-center gap-4">
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-colors duration-300 hover:bg-[#ffde7d]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-colors duration-300 hover:bg-[#ffde7d]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-colors duration-300 hover:bg-[#ffde7d]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
            <div className="border-t border-white/30 pt-8">
              <p className="text-sm text-white/70">© 2024 UMKM Lebah Madu. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;

