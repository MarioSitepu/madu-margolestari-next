import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  product?: {
    price?: number;
    currency?: string;
    availability?: string;
    brand?: string;
  };
}

const BASE_URL = 'https://madumargolestari.vercel.app';
const DEFAULT_TITLE = 'Madu Margo Lestari - Madu Murni Berkualitas Tinggi | E-Commerce UMKM';
const DEFAULT_DESCRIPTION = 'Madu Margo Lestari - Platform E-Commerce Modern untuk UMKM Madu dengan Produk Berkualitas Tinggi. Dapatkan madu murni 100% asli, dipanen langsung dari peternakan lebah alami tanpa campuran bahan apapun. Kaya akan manfaat kesehatan dan rasa khas yang autentik.';
const DEFAULT_KEYWORDS = 'madu margo lestari, madu murni, madu asli, madu berkualitas, madu kesehatan, e-commerce madu, umkm madu, produk madu, madu lampung, madu lampung selatan, madu jati agung, madu indonesia, jual madu, beli madu online, madu alami, madu organik';
const DEFAULT_IMAGE = `${BASE_URL}/marles-honey.png`;

export function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = 'website',
  article,
  product
}: SEOProps) {
  const fullTitle = title.includes('Madu Margo Lestari') 
    ? title 
    : `${title} | Madu Margo Lestari`;

  // Generate structured data
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : type === 'Product' ? 'Product' : 'WebPage',
    name: fullTitle,
    description,
    url,
    image,
    publisher: {
      '@type': 'Organization',
      name: 'Madu Margo Lestari',
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_IMAGE
      }
    }
  };

  if (article) {
    structuredData.datePublished = article.publishedTime;
    structuredData.dateModified = article.modifiedTime;
    structuredData.author = {
      '@type': 'Person',
      name: article.author || 'Madu Margo Lestari'
    };
    structuredData.articleSection = article.section;
    structuredData.keywords = article.tags?.join(', ');
  }

  if (product) {
    structuredData.offers = {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'IDR',
      availability: product.availability || 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Madu Margo Lestari'
      }
    };
    structuredData.brand = {
      '@type': 'Brand',
      name: product.brand || 'Madu Margo Lestari'
    };
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Madu Margo Lestari" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Article specific meta tags */}
      {article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

