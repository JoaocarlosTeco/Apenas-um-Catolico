import React from 'react';
import { Helmet } from 'react-helmet';
import { BaseComponentProps, BreadcrumbItem } from '../types';

interface ArticleData {
  title: string;
  description: string;
  image?: string;
  author?: string;
  about?: string;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

interface SaintData {
  name: string;
  description: string;
  birthDate?: string;
  deathDate?: string;
  birthPlace?: string;
  nationality?: string;
  canonizationDate?: string;
  feastDay?: string;
  patronOf?: string[];
  image?: string;
  externalLinks?: string[];
  attributes?: string[];
}

interface PrayerData {
  title: string;
  description: string;
  text: string;
  author?: string;
  dateCreated?: string;
}

interface SEOProps extends BaseComponentProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  structuredData?: Record<string, any> | null;
  breadcrumbs?: BreadcrumbItem[];
  article?: ArticleData | null;
  saint?: SaintData | null;
  prayer?: PrayerData | null;
  publishedTime?: string | null;
  modifiedTime?: string | null;
  category?: string | null;
  tags?: string[];
}

const SEO: React.FC<SEOProps> = ({ 
  title = "Apenas um Católico - Evangelização e Devoção",
  description = "Site católico dedicado à evangelização e devoção aos santos. Conheça a história dos santos, orações e reflexões espirituais.",
  keywords = "católico, santos, orações, evangelização, fé, devoção, religião, cristianismo",
  image = "/images/logos/Logo tipo apenas um catolico.png",
  url = "https://apenas-um-catolico.vercel.app",
  type = "website",
  author = "Apenas um Católico",
  structuredData = null,
  breadcrumbs = [],
  article = null,
  saint = null,
  prayer = null,
  publishedTime = null,
  modifiedTime = null,
  category = null,
  tags = []
}) => {
  const siteTitle = "Apenas um Católico";
  const fullTitle = title === siteTitle ? title : `${title} - ${siteTitle}`;

  // Structured Data para o site
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteTitle,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": siteTitle,
      "url": url,
      "logo": {
        "@type": "ImageObject",
        "url": `${url}${image}`,
        "width": 512,
        "height": 512
      },
      "sameAs": [
        "https://www.facebook.com/apenasumcatolico",
        "https://www.instagram.com/apenasumcatolico"
      ]
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${url}/buscar?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // Structured Data para organização religiosa
  const religiousOrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "ReligiousOrganization",
    "name": siteTitle,
    "description": "Plataforma digital católica dedicada à evangelização, educação religiosa e devoção aos santos",
    "url": url,
    "religion": "Christianity",
    "denomination": "Catholic",
    "founder": author,
    "foundingDate": "2023",
    "mission": "Evangelizar através da tecnologia, compartilhando a vida dos santos e ensinamentos católicos",
    "serviceArea": {
      "@type": "Country",
      "name": "Brasil"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Catholics, Christians, Faith seekers"
    }
  };

  // Breadcrumbs Schema
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${url}${item.url}`
    }))
  } : null;

  // Schema para artigo/blog post
  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": `${url}${article.image || image}`,
    "author": {
      "@type": "Person",
      "name": article.author || author
    },
    "publisher": {
      "@type": "Organization",
      "name": siteTitle,
      "logo": {
        "@type": "ImageObject",
        "url": `${url}${image}`
      }
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": tags.join(", "),
    "articleSection": category,
    "about": article.about || "Catholic faith, spirituality, saints"
  } : null;

  // Schema específico para santos
  const saintSchema = saint ? {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": saint.name,
    "description": saint.description,
    "birthDate": saint.birthDate,
    "deathDate": saint.deathDate,
    "birthPlace": saint.birthPlace,
    "nationality": saint.nationality,
    "religion": "Christianity",
    "denomination": "Catholic",
    "canonizationDate": saint.canonizationDate,
    "feastDay": saint.feastDay,
    "patronOf": saint.patronOf,
    "image": `${url}${saint.image || image}`,
    "sameAs": saint.externalLinks || [],
    "knowsAbout": saint.attributes || [],
    "worksFor": {
      "@type": "ReligiousOrganization",
      "name": "Catholic Church"
    },
    "additionalType": "Saint",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  } : null;

  // Schema para orações
  const prayerSchema = prayer ? {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": prayer.title,
    "description": prayer.description,
    "text": prayer.text,
    "inLanguage": "pt-BR",
    "genre": "Prayer",
    "author": prayer.author || "Catholic Tradition",
    "publisher": {
      "@type": "Organization",
      "name": siteTitle
    },
    "dateCreated": prayer.dateCreated,
    "audience": {
      "@type": "Audience",
      "audienceType": "Catholics"
    },
    "about": {
      "@type": "Thing",
      "name": "Catholic Prayer",
      "description": "Traditional Catholic prayer for spiritual devotion"
    },
    "isPartOf": {
      "@type": "Collection",
      "name": "Catholic Prayers Collection"
    }
  } : null;

  // FAQ Schema (se aplicável)
  const faqSchema = article?.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Combinar todos os schemas
  const allSchemas = [
    websiteSchema,
    religiousOrganizationSchema,
    breadcrumbSchema,
    articleSchema,
    saintSchema,
    prayerSchema,
    faqSchema,
    structuredData
  ].filter(Boolean);

  return (
    <Helmet>
      {/* Título da página */}
      <title>{fullTitle}</title>
      
      {/* Meta tags básicas */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index,follow" />
      <meta name="language" content="Portuguese" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${url}${image}`} />
      
      {/* Article specific meta tags */}
      {article && (
        <>
          <meta property="article:author" content={article.author || author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {category && <meta property="article:section" content={category} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* PWA Meta tags */}
      <meta name="theme-color" content="#1B3358" />
      <meta name="msapplication-navbutton-color" content="#1B3358" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      {allSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;

// Componente auxiliar para Breadcrumbs
interface BreadcrumbsProps extends BaseComponentProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className={className}>
      <ol style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
            {index > 0 && <span style={{ margin: '0 0.5rem' }}>/</span>}
            {index === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <a href={item.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}; 