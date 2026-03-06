import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image';
  schema?: object | object[];
  noIndex?: boolean;
}

const defaultOgImage = 'https://arkup.com/og-image.jpg';
const siteUrl = 'https://arkup.com';
const siteName = 'Ark-Up';

export function SEOHead({
  title,
  description,
  canonical,
  ogImage = defaultOgImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  schema,
  noIndex = false,
}: SEOHeadProps) {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const updateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update link canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonicalUrl;

    // Basic meta tags
    updateMeta('description', description);
    updateMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', ogType, true);
    updateMeta('og:url', canonicalUrl, true);
    updateMeta('og:image', ogImage, true);
    updateMeta('og:site_name', siteName, true);
    updateMeta('og:locale', 'es_MX', true);

    // Twitter Cards
    updateMeta('twitter:card', twitterCard);
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);
    updateMeta('twitter:site', '@arkup');

    // Schema markup
    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      const existingScripts = document.querySelectorAll('script[data-schema]');
      existingScripts.forEach(s => s.remove());

      schemas.forEach((s, index) => {
        const script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-schema', `schema-${index}`);
        script.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          ...s,
        });
        document.head.appendChild(script);
      });
    }

    // Cleanup
    return () => {
      if (schema) {
        const scripts = document.querySelectorAll('script[data-schema]');
        scripts.forEach(s => s.remove());
      }
    };
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, twitterCard, schema, noIndex]);

  return null;
}

// Predefined schemas
export const organizationSchema = {
  '@type': 'Organization',
  name: 'Ark-Up',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: 'Educación financiera divertida y efectiva para niños y jóvenes en Latinoamérica.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ciudad de México',
    addressCountry: 'MX',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+52-1-234-567-890',
    contactType: 'customer service',
    availableLanguage: ['Spanish'],
  },
  sameAs: [
    'https://facebook.com/arkup',
    'https://instagram.com/arkup',
    'https://twitter.com/arkup',
    'https://linkedin.com/company/arkup',
  ],
};

export const websiteSchema = {
  '@type': 'WebSite',
  name: 'Ark-Up',
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/buscar?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const createCourseSchema = (course: {
  name: string;
  description: string;
  price: number;
  duration: string;
  ageRange: string;
}) => ({
  '@type': 'Course',
  name: course.name,
  description: course.description,
  provider: {
    '@type': 'Organization',
    name: 'Ark-Up',
    sameAs: siteUrl,
  },
  offers: {
    '@type': 'Offer',
    price: course.price,
    priceCurrency: 'MXN',
    availability: 'https://schema.org/InStock',
  },
  timeRequired: course.duration,
  educationalLevel: course.ageRange,
  inLanguage: 'es',
});

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const createProductSchema = (product: {
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
}) => ({
  '@type': 'Product',
  name: product.name,
  description: product.description,
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: 'MXN',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: product.rating,
    reviewCount: product.reviews,
  },
});
