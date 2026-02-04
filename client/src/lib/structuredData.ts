/**
 * Utility functions for generating JSON-LD structured data for SEO
 */

export interface PersonSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  sameAs: string[];
  jobTitle: string;
  description: string;
  image?: string;
}

export interface ArticleSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
  };
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Generate Person schema for portfolio owner
 */
export const generatePersonSchema = (): PersonSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sourabh Saini',
    url: 'https://sourabh-portfolio.manus.space',
    sameAs: [
      'https://github.com/sourabh',
      'https://linkedin.com/in/sourabh',
    ],
    jobTitle: 'CRM & Automation Expert',
    description: 'Specializing in HubSpot, WordPress, and workflow automation. I build scalable digital solutions that streamline data flows, reduce manual effort, and drive business outcomes through intelligent integrations.',
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/108200144/NafzeXOPnwSlPkbM.webp',
  };
};

/**
 * Generate Article schema for blog posts
 */
export const generateArticleSchema = (
  headline: string,
  description: string,
  image: string,
  datePublished: string
): ArticleSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image,
    datePublished,
    author: {
      '@type': 'Person',
      name: 'Sourabh Saini',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sourabh Saini Portfolio',
    },
  };
};

/**
 * Generate Breadcrumb schema for navigation
 */
export const generateBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>
): BreadcrumbSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

/**
 * Inject JSON-LD script into document head
 */
export const injectStructuredData = (schema: object): void => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};
