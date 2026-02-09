/**
 * WordPress API Helper with AIOSEO Support
 * Fetches blog posts and SEO data from WordPress REST API
 */

import crypto from "crypto";

const WORDPRESS_URL = "https://cdn.sourabhsaini.com";
const WORDPRESS_API = `${WORDPRESS_URL}/wp-json/wp/v2`;
const AIOSEO_API = `${WORDPRESS_URL}/wp-json/aioseo/v1`;

export interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  featured_media: number;
  meta?: Record<string, any>;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{
      name: string;
      avatar_urls?: {
        "96": string;
      };
    }>;
  };
}

export interface AIOSEOData {
  title?: string;
  description?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  canonical_url?: string;
  keywords?: string;
  robots_default?: boolean;
  robots_noindex?: boolean;
  robots_nofollow?: boolean;
}

export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
}

/**
 * Parse AIOSEO data from post meta fields
 */
export function parseAIOSEOMetaData(meta?: Record<string, any>): AIOSEOData | null {
  if (!meta) return null;

  try {
    // Try to parse AIOSEO meta data
    const seoTitle = meta._aioseo_title || null;
    const seoDescription = meta._aioseo_description || null;
    const seoKeywords = meta._aioseo_keywords || null;
    
    // Try to parse AIOSEO JSON if available
    let aioseoData: any = null;
    if (meta._aioseo_settings) {
      try {
        aioseoData = typeof meta._aioseo_settings === 'string' 
          ? JSON.parse(meta._aioseo_settings) 
          : meta._aioseo_settings;
      } catch (e) {
        console.warn("Failed to parse AIOSEO settings:", e);
      }
    }

    // Return parsed data with fallbacks
    const result: AIOSEOData = {
      title: seoTitle,
      description: seoDescription,
      og_title: aioseoData?.openGraph?.title || null,
      og_description: aioseoData?.openGraph?.description || null,
      og_image: aioseoData?.openGraph?.image || null,
      twitter_title: aioseoData?.twitter?.title || null,
      twitter_description: aioseoData?.twitter?.description || null,
      twitter_image: aioseoData?.twitter?.image || null,
      canonical_url: aioseoData?.canonical || null,
      keywords: seoKeywords,
      robots_default: aioseoData?.robots?.default !== false,
      robots_noindex: aioseoData?.robots?.noindex === true,
      robots_nofollow: aioseoData?.robots?.nofollow === true,
    };

    // Check if any data was found
    const hasData = Object.values(result).some(v => v !== null && v !== false && v !== true);
    return hasData ? result : null;
  } catch (error) {
    console.error("Error parsing AIOSEO meta data:", error);
    return null;
  }
}

/**
 * Fetch AIOSEO data for a specific post
 */
export async function getAIOSEOData(postId: number, post?: WordPressPost): Promise<AIOSEOData | null> {
  try {
    // First try to parse from meta fields if post is provided
    if (post?.meta) {
      const metaData = parseAIOSEOMetaData(post.meta);
      if (metaData) {
        console.log(`[AIOSEO] Found SEO data in post meta for post ${postId}`);
        return metaData;
      }
    }

    // Try the AIOSEO REST API endpoint
    const response = await fetch(
      `${AIOSEO_API}/post/${postId}`,
      {
        headers: {
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.warn(`AIOSEO API returned ${response.status} for post ${postId}`);
      return null;
    }

    const data = await response.json();
    console.log(`[AIOSEO] Fetched SEO data for post ${postId}:`, JSON.stringify(data, null, 2));
    
    return {
      title: data.title || null,
      description: data.description || null,
      og_title: data.og_title || null,
      og_description: data.og_description || null,
      og_image: data.og_image_url || null,
      twitter_title: data.twitter_title || null,
      twitter_description: data.twitter_description || null,
      twitter_image: data.twitter_image_url || null,
      canonical_url: data.canonical_url || null,
      keywords: data.keyphrases?.focus?.keyphrase || null,
      robots_default: data.robots_default !== false,
      robots_noindex: data.robots_noindex === true,
      robots_nofollow: data.robots_nofollow === true,
    };
  } catch (error) {
    console.error("Error fetching AIOSEO data for post", postId, ":", error);
    return null;
  }
}

/**
 * Fetch all published posts from WordPress
 */
export async function getWordPressPosts(page = 1, perPage = 10): Promise<WordPressPost[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API}/posts?status=publish&per_page=${perPage}&page=${page}&_embed`,
      {
        headers: {
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const posts: WordPressPost[] = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching WordPress posts:", error);
    return [];
  }
}

/**
 * Fetch a single post by slug
 */
export async function getWordPressPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    // Fetch with context=edit to get all fields including meta
    const response = await fetch(
      `${WORDPRESS_API}/posts?slug=${slug}&_embed&context=edit`,
      {
        headers: {
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const posts: WordPressPost[] = await response.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error("Error fetching WordPress post by slug:", error);
    return null;
  }
}

/**
 * Get featured image URL from post
 */
export function getFeaturedImageUrl(post: WordPressPost): string | null {
  if (!post._embedded || !post._embedded["wp:featuredmedia"]) {
    return null;
  }

  const media = post._embedded["wp:featuredmedia"][0];
  return media?.source_url || null;
}

/**
 * Get author name from post
 */
export function getAuthorName(post: WordPressPost): string {
  if (!post._embedded || !post._embedded.author) {
    return "Sourabh Saini";
  }

  return post._embedded.author[0]?.name || "Sourabh Saini";
}

/**
 * Clean HTML content (remove tags, decode entities)
 */
export function cleanHtmlContent(html: string): string {
  return html
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

/**
 * Extract excerpt from post
 */
export function getExcerpt(post: WordPressPost): string {
  const excerpt = post.excerpt?.rendered || "";
  return cleanHtmlContent(excerpt).substring(0, 160);
}

/**
 * Fetch categories from WordPress
 */
export async function getWordPressCategories(): Promise<Array<{ id: number; name: string; slug: string }>> {
  try {
    const response = await fetch(`${WORDPRESS_API}/categories`, {
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Error fetching WordPress categories:", error);
    return [];
  }
}

/**
 * Fetch posts by category
 */
export async function getWordPressPostsByCategory(categoryId: number, perPage = 10): Promise<WordPressPost[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API}/posts?categories=${categoryId}&status=publish&per_page=${perPage}&_embed`,
      {
        headers: {
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const posts: WordPressPost[] = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching WordPress posts by category:", error);
    return [];
  }
}

/**
 * Extract headings from HTML content for table of contents
 */
export function extractHeadings(html: string): Array<{ id: string; text: string; level: number }> {
  const headings: Array<{ id: string; text: string; level: number }> = [];
  const headingRegex = /<h([1-6])(?:[^>]*)>([^<]+)<\/h\1>/gi;
  let match;
  let headingCount = 0;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = cleanHtmlContent(match[2]);
    const id = `heading-${headingCount}`;
    headings.push({ id, text, level });
    headingCount++;
  }

  return headings;
}


/**
 * Get author image from WordPress or Gravatar
 */
export function getAuthorImage(post: WordPressPost): string | null {
  // Try to get from WordPress embedded author data
  if (post._embedded && post._embedded.author && post._embedded.author[0]?.avatar_urls) {
    return post._embedded.author[0].avatar_urls["96"] || null;
  }

  // Fallback to Gravatar using MD5 hash of email
  const email = "sainisourav7900@gmail.com";
  const hash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?s=96&d=identicon`;
}

/**
 * Calculate reading time in minutes
 */
export function calculateReadingTime(htmlContent: string): number {
  const cleanText = cleanHtmlContent(htmlContent);
  const wordCount = cleanText.split(/\s+/).length;
  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, minutes);
}