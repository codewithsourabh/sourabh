import { Helmet } from 'react-helmet-async';

interface SEOMetaTagsProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  articlePublishedTime?: string;
  articleAuthor?: string;
  aioseo?: {
    available?: boolean;
    rendered_title?: string;
    rendered_description?: string;
    og_image_custom_url?: string;
    og_image_url?: string;
    canonical_url?: string;
    robots_noindex?: boolean;
    robots_nofollow?: boolean;
    robots_noarchive?: boolean;
    [key: string]: any;
  };
}

export default function SEOMetaTags(props: SEOMetaTagsProps) {
  const aioseo = props.aioseo;
  
  const finalMeta = {
    title: props.title || aioseo?.rendered_title || aioseo?.title || 'Sourabh | Software Engineer Portfolio',
    description: props.description || aioseo?.rendered_description || aioseo?.description || 'CRM & Automation Expert. HubSpot, WordPress, and workflow automation specialist building scalable digital solutions.',
    canonicalUrl: props.canonicalUrl || aioseo?.canonical_url || (typeof window !== 'undefined' ? window.location.href : ''),
    ogImage: props.ogImage || aioseo?.og_image_custom_url || aioseo?.og_image_url || '',
    robots: buildRobotsTag(aioseo),
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalMeta.title}</title>
      <meta name="description" content={finalMeta.description} />
      {finalMeta.robots && <meta name="robots" content={finalMeta.robots} />}
      {finalMeta.canonicalUrl && <link rel="canonical" href={finalMeta.canonicalUrl} />}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={finalMeta.title} />
      <meta property="og:description" content={finalMeta.description} />
      {finalMeta.ogImage && <meta property="og:image" content={finalMeta.ogImage} />}
      <meta property="og:type" content="article" />
      {finalMeta.canonicalUrl && <meta property="og:url" content={finalMeta.canonicalUrl} />}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalMeta.title} />
      <meta name="twitter:description" content={finalMeta.description} />
      {finalMeta.ogImage && <meta name="twitter:image" content={finalMeta.ogImage} />}
      
      {/* Article Specific Tags */}
      {props.articlePublishedTime && (
        <meta property="article:published_time" content={props.articlePublishedTime} />
      )}
      {props.articleAuthor && (
        <meta property="article:author" content={props.articleAuthor} />
      )}
    </Helmet>
  );
}

function buildRobotsTag(aioseo?: any): string {
  if (!aioseo?.available) {
    return 'index, follow';
  }

  const directives: string[] = [];
  
  if (aioseo.robots_noindex) {
    directives.push('noindex');
  } else {
    directives.push('index');
  }
  
  if (aioseo.robots_nofollow) {
    directives.push('nofollow');
  } else {
    directives.push('follow');
  }
  
  if (aioseo.robots_noarchive) {
    directives.push('noarchive');
  }
  
  return directives.join(', ');
}
