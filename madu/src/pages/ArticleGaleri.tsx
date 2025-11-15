import { Footer } from "@/components/Footer";

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
}

export function ArticleGaleri() {
  const articles: Article[] = [
    {
      id: 1,
      title: "Pengambilan Madu",
      description:
        "Madu asam di kaya akan antioksidasi, vitamin, dan mineral yang baik untuk kesehatan dan meningkatkan daya tahan tubuh.",
      image: "/images/beekeeper1.jpg",
    },
    {
      id: 2,
      title: "Pengambilan Madu",
      description:
        "Madu asam di kaya akan antioksidasi, vitamin, dan mineral yang baik untuk kesehatan dan meningkatkan daya tahan tubuh.",
      image: "/images/beekeeper2.jpg",
    },
    {
      id: 3,
      title: "Pengambilan Madu",
      description:
        "Madu asam di kaya akan antioksidasi, vitamin, dan mineral yang baik untuk kesehatan dan meningkatkan daya tahan tubuh.",
      image: "/images/beekeeper3.jpg",
    },
  ];

  return (
    <div className="bg-[#ffde7d] min-h-screen">
      {/* Header Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            Madu Marles Berhasil Memenangkan Laga
          </h1>

          {/* Main Image */}
          <div className="mb-8">
            <div className="border-4 border-cyan-500 rounded-lg overflow-hidden">
              <img
                src="/images/beekeeper-main.jpg"
                alt="Beekeeper with honeycomb"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Description Text */}
          <div className="space-y-4 mb-8 text-center">
            <p className="text-sm text-gray-800 leading-relaxed">
              Lorem Ipsum (Up iam "in sam/ LOR=en iP sam) is a dummy or
              placeholder text commonly used in graphic designs, publishing, and
              web development. The purpose is to permit a page layout to be
              designed, independently of the copy that will subsequently
              populate it, or to demonstrate what the visual layout of a page
              will look like if it is populated with text of a typeface without
              meaningful text that could be distracting.
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">
              Lorem Ipsum is typically a corrupted version of De finibus bonorum
              et malorum, a 1st-century BC text by the Roman statesman and
              philosopher Cicero, with words altered, added, and removed to make
              it nonsensical and improper Latin. The first two words are the
              truncation of dolorem ipsum ("Pain itself").
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">
              Versions of the Lorem Ipsum text have been used in typesetting
              since the 1960s, when advertisements for Letraset transfer sheets
              popularized it. It was introduced to the digital world in the
              mid-1980s, when Aldus employed it in graphic and word-processing
              templates for its desktop publishing program PageMaker.
            </p>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <div className="w-full bg-white p-8 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6 px-8">
        <div className="flex items-center gap-4">
          <img
            src="/images/honey-bottle.png"
            alt="Madu Marles Honey"
            className="w-24 h-32 object-contain"
          />
          <div>
            <p className="text-gray-800">
              Jangan lewatkan kesempatan untuk merasakan kelezatannya. Kunjungi
              toko kami dan beli sekarang juga di
              <a href="#" className="text-cyan-500 font-semibold ml-1">
                sini!
              </a>
            </p>
          </div>
        </div>

        <button
          className="
            w-full
            bg-[#ffde7d]
            text-white
            font-bold
            px-2
            py-1
            flex
            items-center
            justify-center
            gap-3
            shadow-[0_10px_15px_rgba(0,0,0,0.4)]
            hover:bg-[#f5c869]
            transition
        "
        >
          Kunjungi Sekarang
          <span className="text-2xl">↗</span>
        </button>
      </div>

      {/* Article Gallery Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Lihat Artikel <span className="text-cyan-500">Lainnya</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="bg-cyan-500 text-white p-4">
                  <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                  <p className="text-sm mb-4 leading-relaxed">
                    {article.description}
                  </p>
                  <button className="bg-white text-cyan-500 px-4 py-2 rounded font-semibold text-sm hover:bg-gray-100 transition">
                    Lihat Galeri
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ArticleGaleri;
