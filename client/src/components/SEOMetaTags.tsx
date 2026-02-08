import { useEffect } from 'react';

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
  useEffect(() => {
    const aioseo = props.aioseo;
    
    const finalMeta = {
      title: props.title || aioseo?.rendered_title || aioseo?.title || '',
      description: props.description || aioseo?.rendered_description || aioseo?.description || '',
      canonicalUrl: props.canonicalUrl || aioseo?.canonical_url || window.location.href,
      ogImage: props.ogImage || aioseo?.og_image_custom_url || aioseo?.og_image_url || '',
      robots: buildRobotsTag(aioseo),
    };

    // Set document title
    if (finalMeta.title) {
      document.title = finalMeta.title;
    }

    // Remove existing meta tags
    removeExistingMetaTags();

    // Create and append new meta tags
    const metaTags = [
      createMetaTag('description', finalMeta.description),
      finalMeta.robots && createMetaTag('robots', finalMeta.robots),
      finalMeta.canonicalUrl && createLinkTag('canonical', finalMeta.canonicalUrl),
      createMetaTag('og:title', finalMeta.title, 'property'),
      createMetaTag('og:description', finalMeta.description, 'property'),
      finalMeta.ogImage && createMetaTag('og:image', finalMeta.ogImage, 'property'),
      createMetaTag('og:type', 'article', 'property'),
      createMetaTag('twitter:card', 'summary_large_image', 'name'),
      createMetaTag('twitter:title', finalMeta.title, 'name'),
      createMetaTag('twitter:description', finalMeta.description, 'name'),
      finalMeta.ogImage && createMetaTag('twitter:image', finalMeta.ogImage, 'name'),
    ];

    metaTags.forEach(tag => {
      if (tag) {
        document.head.appendChild(tag);
      }
    });

    return () => {
      removeExistingMetaTags();
    };
  }, [props]);

  return null;
}

function createMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name'): HTMLMetaElement | null {
  if (!content) return null;
  
  const meta = document.createElement('meta');
  meta.setAttribute(attribute, name);
  meta.setAttribute('content', content);
  meta.setAttribute('data-seo-injected', 'true');
  return meta;
}

function createLinkTag(rel: string, href: string): HTMLLinkElement | null {
  if (!href) return null;
  
  const link = document.createElement('link');
  link.setAttribute('rel', rel);
  link.setAttribute('href', href);
  link.setAttribute('data-seo-injected', 'true');
  return link;
}

function removeExistingMetaTags() {
  const existingTags = document.querySelectorAll('[data-seo-injected="true"]');
  existingTags.forEach(tag => tag.remove());
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
