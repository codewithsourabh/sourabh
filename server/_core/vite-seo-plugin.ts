import type { Plugin } from 'vite';
import { getWordPressPostBySlug } from '../wordpress';

interface MetaTags {
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl: string;
  ogType: string;
}

async function getMetaTagsForRoute(path: string, host: string): Promise<MetaTags> {
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  
  // Default meta tags
  const defaultMeta: MetaTags = {
    title: 'Sourabh Saini | CRM & Automation Expert',
    description: 'Sourabh Saini is a results-driven CRM & Automation Specialist with over 5 years of experience in HubSpot, WordPress, and workflow automation. Building scalable digital solutions that drive business growth.',
    canonicalUrl: baseUrl,
    ogType: 'website',
  };

  // Homepage
  if (path === '/' || path === '') {
    return defaultMeta;
  }

  // Blog listing page
  if (path === '/blog' || path === '/blog/') {
    return {
      title: 'Blog | Sourabh Saini - CRM & Automation Insights',
      description: 'Explore articles about HubSpot, WordPress, CRM automation, workflow optimization, and integration strategies. Expert insights from a CRM & Automation Specialist.',
      canonicalUrl: `${baseUrl}/blog`,
      ogType: 'website',
    };
  }

  // Individual blog post
  const blogPostMatch = path.match(/^\/blog\/([^\/]+)\/?$/);
  if (blogPostMatch) {
    const slug = blogPostMatch[1];
    try {
      const post = await getWordPressPostBySlug(slug);
      if (post && post.aioseo) {
        return {
          title: post.aioseo.rendered_title || post.title.rendered,
          description: post.aioseo.rendered_description || post.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 160) || '',
          ogImage: post.aioseo.og_image_custom_url || post.aioseo.og_image_url,
          canonicalUrl: post.aioseo.canonical_url || `${baseUrl}/blog/${slug}`,
          ogType: 'article',
        };
      } else if (post) {
        return {
          title: post.title.rendered,
          description: post.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 160) || '',
          ogImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
          canonicalUrl: `${baseUrl}/blog/${slug}`,
          ogType: 'article',
        };
      }
    } catch (error) {
      console.error(`[SEO Plugin] Error fetching post meta for slug ${slug}:`, error);
    }
  }

  // Default fallback
  return defaultMeta;
}

function injectMetaTags(html: string, meta: MetaTags): string {
  // Replace title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`
  );

  // Build meta tags
  const metaTags = `
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:type" content="${meta.ogType}" />
    <meta property="og:url" content="${escapeHtml(meta.canonicalUrl)}" />
    ${meta.ogImage ? `<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    ${meta.ogImage ? `<meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />` : ''}
    <link rel="canonical" href="${escapeHtml(meta.canonicalUrl)}" />
  `.trim();

  // Inject new meta tags before </head>
  html = html.replace('</head>', `${metaTags}\n  </head>`);

  return html;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export function viteSeoPlugin(): Plugin {
  return {
    name: 'vite-seo-plugin',
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // Only handle HTML requests (not API, assets, or HMR)
          if (
            req.method !== 'GET' ||
            !req.url ||
            req.url.startsWith('/api/') ||
            req.url.startsWith('/assets/') ||
            req.url.startsWith('/@') ||
            req.url.includes('.')
          ) {
            return next();
          }

          const url = new URL(req.url, `http://${req.headers.host}`);
          const path = url.pathname;

          // Store original methods
          const originalWrite = res.write.bind(res);
          const originalEnd = res.end.bind(res);
          let htmlChunks: Buffer[] = [];

          // Intercept write
          res.write = function(chunk: any, ...args: any[]): boolean {
            if (Buffer.isBuffer(chunk) || typeof chunk === 'string') {
              htmlChunks.push(Buffer.from(chunk));
              return true;
            }
            return originalWrite(chunk, ...args);
          };

          // Intercept end
          res.end = function(chunk: any, ...args: any[]): any {
            if (chunk) {
              htmlChunks.push(Buffer.from(chunk));
            }

            const html = Buffer.concat(htmlChunks).toString('utf8');

            // Only process HTML responses
            if (html.includes('<!doctype html>') || html.includes('<!DOCTYPE html>')) {
              getMetaTagsForRoute(path, req.headers.host || 'sourabhsaini.com')
                .then((meta) => {
                  const modifiedHtml = injectMetaTags(html, meta);
                  res.setHeader('Content-Length', Buffer.byteLength(modifiedHtml));
                  originalEnd(modifiedHtml);
                })
                .catch((error) => {
                  console.error('[SEO Plugin] Error:', error);
                  originalEnd(html);
                });
            } else {
              originalEnd(html);
            }
          };

          next();
        });
      };
    },
  };
}
