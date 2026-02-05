/**
 * WordPress API Helper
 * Fetches blog posts from WordPress REST API
 */

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
    return "Unknown Author";
  }

  return post._embedded.author[0]?.name || "Unknown Author";
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
