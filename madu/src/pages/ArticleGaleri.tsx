import { Footer } from "@/components/Footer";
import marlesHoney from "@/assets/marles-honey.png";

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
}

export function ArticleGaleri() {
  const postDate = "11 Agustus 2025";
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
    <div className="bg-[#ffde7d] min-h-screen relative">
      {/* posting date top-right */}
      <div className="absolute top-6 right-6 text-right">
        <p className="text-sm text-gray-700 font-bold">
          Diposting Pada{" "}
          <span className="text-[#00b8a9] font-semibold">{postDate}</span>
        </p>
      </div>

      {/* Header Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            Madu Marles Berhasil Memenangkan Laga
          </h1>

          {/* Main Image */}
          <div className="mb-8">
            <div className="border-4 border-[#00b8a9] rounded-lg overflow-hidden">
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
      <div className="w-full bg-white relative overflow-visible py-7">
        <div className="max-w-6xl mx-auto py-5 px-6 md:px-12 relative flex items-center justify-between">
          {/* Image positioned absolute so it can "pop out" of the white section */}
          <div className="absolute left-6 top-0 -translate-y-1/2 z-30 pointer-events-none">
            <img
              src={marlesHoney}
              alt="Madu Marles Honey"
              className="w-28 md:w-36 lg:w-25 object-contain drop-shadow-2xl"
            />
          </div>

          {/* Content (give left padding so image doesn't overlap text) */}
          <div className="flex items-center gap-4 pl-28 md:pl-40">
            <div>
              <p className="text-[#00b8a9] md:text-lg lg:text-xl font-[600] leading-snug">
                Jangan lewatkan kesempatan untuk merasakan kelezatannya
                <br />
                Kunjungi toko kami dan beli sekarang juga di{" "}
                <a href="#" className="text-[#ffde7d] font-bold underline">
                  sini!
                </a>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <button
              className="
                rounded
                bg-[#ffde7d]
                text-white
                font-bold
                px-4
                py-2
                flex
                items-center
                justify-center
                gap-3
                shadow-[0_5px_7px_rgba(0,0,0,0.4)]
                hover:bg-[#f5c869]
                transition
            "
            >
              Kunjungi Sekarang <span className="ml-2">↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* Article Gallery Section */}
      <section className="py-40 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-[800] text-center mb-12">
            Lihat Artikel{" "}
            <span className="text-[#00b8a9] underline decoration-[black] decoration-5">
              Lainnya
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg overflow-hidden shadow-xl transform hover:-translate-y-1 transition"
              >
                <div className="overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-44 object-cover"
                  />
                </div>

                <div className="bg-[#00b8a9] text-white p-5 flex flex-col justify-between h-[200px]">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-sm leading-relaxed opacity-95">
                      {article.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm opacity-95 text-[#ffde7d]">
                      {/* lokasi icon */}
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                      >
                        <path
                          d="M12 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                          stroke="#ffde7d"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.5 10.5c0 6-7.5 11.25-7.5 11.25S4.5 16.5 4.5 10.5a7.5 7.5 0 1115 0z"
                          stroke="#ffde7d"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Marles</span>
                    </div>

                    <button className="bg-white text-[#00b8a9] font-semibold px-4 py-2 rounded shadow-sm flex items-center gap-2 ">
                      <span>Lihat Galeri</span>
                      {/* panah */}
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                      >
                        <path
                          d="M5 12h14"
                          stroke="#00b8a9"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 5l7 7-7 7"
                          stroke="#00b8a9"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ArticleGaleri;
