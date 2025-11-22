import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
  nofollow?: boolean;
  breadcrumbs?: Array<{ name: string; url: string }>;
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
  products?: Array<{
    name: string;
    description: string;
    image: string;
    price: number;
    url: string;
  }>;
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
  noindex = false,
  nofollow = false,
  breadcrumbs,
  article,
  product,
  products
}: SEOProps) {
  // Ensure URL ends with / for homepage, remove trailing slash for other pages
  const canonicalUrl = url === BASE_URL || url === `${BASE_URL}/` 
    ? `${BASE_URL}/` 
    : url.replace(/\/$/, '');
  
  const fullTitle = title.includes('Madu Margo Lestari') 
    ? title 
    : `${title} | Madu Margo Lestari`;

  // Ensure image URL is absolute
  const imageUrl = image.startsWith('http') ? image : `${BASE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  // Robots meta
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
    'max-image-preview:large',
    'max-snippet:-1',
    'max-video-preview:-1'
  ].join(', ');

  // Generate structured data
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : type === 'Product' ? 'Product' : 'WebPage',
    name: fullTitle,
    description,
    url: canonicalUrl,
    image: imageUrl,
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

  // Breadcrumb Structured Data
  const breadcrumbStructuredData = breadcrumbs && breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  } : null;

  // Product ItemList Structured Data (for Product page)
  const productListStructuredData = products && products.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Produk Madu Margo Lestari',
    description: 'Koleksi produk madu murni berkualitas tinggi',
    itemListElement: products.map((prod, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: prod.name,
        description: prod.description,
        image: prod.image,
        offers: {
          '@type': 'Offer',
          price: prod.price,
          priceCurrency: 'IDR',
          availability: 'https://schema.org/InStock',
          url: prod.url
        }
      }
    }))
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Madu Margo Lestari" />
      <meta name="robots" content={robotsContent} />
      <meta name="language" content="Indonesian" />
      <meta name="revisit-after" content="7 days" />
      <meta name="geo.region" content="ID-LA" />
      <meta name="geo.placename" content="Margo Lestari, Jati Agung, Lampung Selatan" />
      <meta name="geo.position" content="-5.350000;105.250000" />
      <meta name="ICBM" content="-5.350000, 105.250000" />
      
      {/* Canonical URL - Critical for SEO */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook - Enhanced */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content="Madu Margo Lestari" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter Card - Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={fullTitle} />
      <meta name="twitter:site" content="@madumargolestari" />
      <meta name="twitter:creator" content="@madumargolestari" />

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

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#00b8a9" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Madu Margo Lestari" />
      
      {/* Performance & Resource Hints */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      
      {/* Structured Data - Main Page */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Breadcrumb Structured Data */}
      {breadcrumbStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      )}

      {/* Product List Structured Data */}
      {productListStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(productListStructuredData)}
        </script>
      )}
    </Helmet>
  );
}

