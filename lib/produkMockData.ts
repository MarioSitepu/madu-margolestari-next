// Mock data for the product page

// Data passed as props to the root component
export const mockRootProps = {
  heroSection: {
    title: "Rasakan Madu Asli Dari",
    highlightedWord: "Sumbernya",
    description: "Rasakan alami di Madu Marles, tempat di mana kualitas bertemu dengan kualitas terbaik. Madu kami dihasilkan oleh lebah yang dipelihara dengan penuh perhatian, memastikan setiap tetes madu yang Anda nikmati adalah murni dan penuh manfaat. Dengan komitmen kami terhadap keberlanjutan dan kesehatan, kami menghadirkan madu yang tidak hanya lezat, tetapi juga mendukung gaya hidup sehat Anda.",
    ctaText: "Beli Sekarang",
    backgroundImage: "/images/hero-honey-jar.png" as const
  },
  bestsellerSection: {
    title: "Produk Paling Banyak",
    highlightedWord: "Terjual",
    productName: "Lebah Cerana",
    productDescription: "Madu yang dihasilkan oleh lebah Cerana memiliki kualitas yang sangat baik, dengan rasa yang lebih lembut dan aroma yang khas, serta kandungan nutrisi yang lebih kaya.",
    price: 50000,
    productImage: "/images/marles-honey-bottle.png" as const,
    honeyJarImage: "/images/hero-honey-jar.png" as const,
    honeycombImage: "/images/marles-honey-bottle.png" as const
  },
  products: [
    {
      id: 1,
      name: "Lebah Cerana",
      description: "Madu yang dihasilkan oleh lebah Cerana memiliki kualitas yang sangat baik, dengan rasa yang lebih lembut dan aroma yang khas, serta kandungan nutrisi yang lebih kaya.",
      price: 50000,
      image: "/images/marles-honey-bottle.png" as const
    },
    {
      id: 2,
      name: "Lebah Cerana",
      description: "Madu yang dihasilkan oleh lebah Cerana memiliki kualitas yang sangat baik, dengan rasa yang lebih lembut dan aroma yang khas, serta kandungan nutrisi yang lebih kaya.",
      price: 50000,
      image: "/images/marles-honey-bottle.png" as const
    },
    {
      id: 3,
      name: "Lebah Cerana",
      description: "Madu yang dihasilkan oleh lebah Cerana memiliki kualitas yang sangat baik, dengan rasa yang lebih lembut dan aroma yang khas, serta kandungan nutrisi yang lebih kaya.",
      price: 50000,
      image: "/images/marles-honey-bottle.png" as const
    }
  ],
  funfactSection: {
    title: "Apakah Kamu",
    highlightedWord: "Tahu?",
    facts: [
      "Madu telah dikenal dan digunakan oleh manusia sejak zaman purba. Bukti penggunaan madu ditemukan dalam lukisan gua di Spanyol yang diperkirakan berusia lebih dari 8.000 tahun. Di banyak budaya kuno, madu bukan hanya dianggap sebagai pemanis alami, tetapi juga sebagai obat dan simbol keabadian. Masyarakat Mesir kuno, misalnya, menggunakan madu untuk pengobatan luka dan sebagai bahan dalam proses pembalseman.",
      "Seiring waktu, madu semakin dihargai karena kandungan nutrisinya yang kaya dan manfaat kesehatannya yang luar biasa. Hingga kini, madu terus menjadi bagian penting dari diet sehat, tidak hanya karena rasanya yang lezat tetapi juga karena sifat penyembuhannya yang telah terbukti."
    ]
  },
  documentationSection: {
    title: "Lihat Dokumentasi Pengerjaan Dan Artikel Kami",
    ctaText: "Kunjungi Sekarang",
    backgroundImage: "/images/beekeeper-documentation.png" as const
  },
  whyUsSection: {
    title: "Kenapa Harus Madu",
    highlightedWord: "Marles",
    benefits: [
      {
        id: 1,
        title: "100% Madu Murni",
        description: "Madu kami 100% alami tanpa campuran gula atau bahan pengawet, memastikan kualitas dan manfaat kesehatan terbaik."
      },
      {
        id: 2,
        title: "Sumber Terpercaya",
        description: "Diperoleh dari peternakan lebah ramah lingkungan, menjamin madu yang kami tawarkan berasal dari sumber yang berkelanjutan."
      },
      {
        id: 3,
        title: "Rasa Khas dan Manfaat Kesehatan",
        description: "Nikmati rasa madu yang unik, kaya akan antioksidan, vitamin, dan mineral untuk mendukung kesehatan tubuh Anda."
      }
    ]
  },
  newsletterSection: {
    title: "Berlangganan ke web kami untuk mendapatkan pembaruan tentang penawaran menarik dari kami",
    subtitle: "Dapatkan diskon 20% untuk pembelian pertama Anda hanya dengan berlangganan newsletter kami.",
    placeholder: "Masukkan email Anda",
    ctaText: "Berlangganan",
    disclaimer: "Anda dapat berhenti berlangganan kapan saja. Baca kebijakan privasi kami di sini.",
    honeycombImage: "/images/honeycomb-dripping.png" as const
  },
  footer: {
    brandName: "Madu Marles",
    brandDescription: "UMKM Lebah Madu Margolestari merupakan usaha mikro, kecil, dan menengah yang berfokus pada budidaya lebah madu dan produksi madu murni berkualitas tinggi.",
    logoImage: "/images/honeycomb-transparent.png" as const,
    sections: [
      {
        title: "Code",
        links: ["About Us", "Services", "Community", "Testimonal"]
      },
      {
        title: "Support",
        links: ["Help Center", "Tweet @Us", "Webians", "Feedback"]
      },
      {
        title: "Links",
        links: ["Courses", "Become 5Teacher", "Services", "All In One"]
      }
    ],
    contact: {
      title: "Contact Us",
      phone: "081262143242412",
      email: "Support@dfwff.com"
    },
    copyright: "Copyright By CodeUI.All right Reserved",
    legalLinks: ["Privacy Policy", "Terms Of Use", "Legal"]
  }
};