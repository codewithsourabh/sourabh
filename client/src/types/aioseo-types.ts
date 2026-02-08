/**
 * TypeScript types for AIOSEO (All in One SEO) data
 */

export interface AIOSEOData {
  available: boolean;
  error?: string;
  
  // Basic SEO
  title?: string;
  description?: string;
  keywords?: string;
  canonical_url?: string;
  
  // Open Graph
  og_title?: string;
  og_description?: string;
  og_image_url?: string;
  og_image_custom_url?: string;
  og_object_type?: string;
  
  // Twitter Card
  twitter_use_og?: boolean;
  twitter_card?: 'summary' | 'summary_large_image';
  twitter_title?: string;
  twitter_description?: string;
  twitter_image_url?: string;
  
  // Robots
  robots_noindex?: boolean;
  robots_nofollow?: boolean;
  robots_noarchive?: boolean;
  robots_noimageindex?: boolean;
  robots_nosnippet?: boolean;
  
  // Metrics
  seo_score?: number;
  
  // Rendered values
  rendered_title?: string;
  rendered_description?: string;
}

/**
 * Extended blog post type with AIOSEO data
 */
export interface BlogPostWithSEO {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  featuredImage: string | null;
  author: string;
  aioseo?: AIOSEOData;
}
