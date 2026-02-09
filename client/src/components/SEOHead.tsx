import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  keywords?: string;
  noindex?: boolean;
  nofollow?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  type?: string;
}

export default function SEOHead({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonicalUrl,
  keywords,
  noindex = false,
  nofollow = false,
  author,
  publishedTime,
  modifiedTime,
  type = "article",
}: SEOHeadProps) {
  useEffect(() => {
    // Set document title
    if (title) {
      document.title = title;
    }

    // Function to update or create meta tag
    const setMetaTag = (property: string, content: string | null | undefined, isProperty = false) => {
      if (!content) {
        // Remove the meta tag if no content
        const attribute = isProperty ? "property" : "name";
        const meta = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;
        if (meta) {
          meta.remove();
        }
        return;
      }
      
      const attribute = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, property);
        document.head.appendChild(meta);
      }
      
      meta.content = content;
    };

    // Set link tag (canonical, etc.)
    const setLinkTag = (rel: string, href: string | null | undefined) => {
      if (!href) {
        // Remove the link tag if no href
        const link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
        if (link) {
          link.remove();
        }
        return;
      }
      
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      
      link.href = href;
    };

    // Basic meta tags
    if (description) setMetaTag("description", description);
    if (keywords) setMetaTag("keywords", keywords);
    if (author) setMetaTag("author", author);

    // Robots meta
    const robotsContent = [];
    if (noindex) robotsContent.push("noindex");
    if (nofollow) robotsContent.push("nofollow");
    if (robotsContent.length > 0) {
      setMetaTag("robots", robotsContent.join(", "));
    } else {
      // Remove robots meta if no restrictions
      setMetaTag("robots", null);
    }

    // Open Graph tags
    setMetaTag("og:type", type, true);
    if (ogTitle || title) setMetaTag("og:title", ogTitle || title || "", true);
    if (ogDescription || description) setMetaTag("og:description", ogDescription || description || "", true);
    if (ogImage) setMetaTag("og:image", ogImage, true);
    else setMetaTag("og:image", null, true);
    
    if (canonicalUrl) setMetaTag("og:url", canonicalUrl, true);
    if (publishedTime) setMetaTag("article:published_time", publishedTime, true);
    if (modifiedTime) setMetaTag("article:modified_time", modifiedTime, true);
    if (author) setMetaTag("article:author", author, true);

    // Twitter Card tags
    setMetaTag("twitter:card", "summary_large_image");
    if (twitterTitle || ogTitle || title) setMetaTag("twitter:title", twitterTitle || ogTitle || title || "");
    if (twitterDescription || ogDescription || description) {
      setMetaTag("twitter:description", twitterDescription || ogDescription || description || "");
    }
    if (twitterImage || ogImage) setMetaTag("twitter:image", twitterImage || ogImage || "");
    else setMetaTag("twitter:image", null);

    // Canonical URL
    if (canonicalUrl) setLinkTag("canonical", canonicalUrl);
    else setLinkTag("canonical", null);

    // Cleanup function (optional - if you want to remove tags when component unmounts)
    return () => {
      // You can optionally remove the meta tags here if needed
    };
  }, [
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    canonicalUrl,
    keywords,
    noindex,
    nofollow,
    author,
    publishedTime,
    modifiedTime,
    type,
  ]);

  return null; // This component doesn't render anything
}