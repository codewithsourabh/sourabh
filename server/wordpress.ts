/**
 * WordPress API Helper
 * Fetches blog posts from WordPress REST API
 */

import crypto from "crypto";

const WORDPRESS_URL = "https://whitesmoke-cormorant-464905.hostingersite.com";
const WORDPRESS_API = `${WORDPRESS_URL}/wp-json/wp/v2`;

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

export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
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
    const response = await fetch(
      `${WORDPRESS_API}/posts?slug=${slug}&_embed`,
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
