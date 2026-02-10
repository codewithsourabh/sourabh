import { useState, useEffect, useRef } from "react";
import { useRoute, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, ChevronRight, Sparkles, Clock, Facebook, Instagram, Linkedin, Twitter, Send, ArrowRight } from "lucide-react";
import { Streamdown } from "streamdown";
import { toast } from "sonner";
import SocialShareButtons from "@/components/SocialShareButtons";
import NewsletterForm from "@/components/NewsletterForm";


interface BlogPostDetail {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  featuredImage: string | null;
  author: string;
  authorImage?: string | null;
  readingTime?: number;
  headings?: Array<{ id: string; text: string; level: number }>;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage: string | null;
  author: string;
}

export default function WordPressBlogPost() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/blog/:slug");
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [progressComplete, setProgressComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Smooth progress animation from 0 to 100% - guaranteed completion
  useEffect(() => {
    // Start progress from 0
    setLoadProgress(0);
    setProgressComplete(false);

    // Use requestAnimationFrame for smooth animation
    let startTime = Date.now();
    let animationFrameId: number;
    const ANIMATION_DURATION = 2000; // 2 seconds minimum animation

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / ANIMATION_DURATION) * 100, 100);
      
      setLoadProgress(progress);

      if (progress < 100) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Mark progress as complete when reaching 100%
        setProgressComplete(true);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const slug = params?.slug as string;
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const tocContainerRef = useRef<HTMLDivElement>(null);
  const authorSectionRef = useRef<HTMLDivElement>(null);
  const tocSidebarRef = useRef<HTMLDivElement>(null);
  const [tocMaxHeight, setTocMaxHeight] = useState<string>('auto');

  // Auto-scroll TOC when active heading changes
  useEffect(() => {
    if (!tocContainerRef.current || !activeHeading) return;

    const activeElement = tocContainerRef.current.querySelector(
      `a[href="#${activeHeading}"]`
    );

    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeHeading]);

  // Calculate TOC sticky boundary (stop at author section)
  useEffect(() => {
    const handleScroll = () => {
      if (!authorSectionRef.current || !tocSidebarRef.current) return;

      const authorRect = authorSectionRef.current.getBoundingClientRect();
      const tocRect = tocSidebarRef.current.getBoundingClientRect();

      // If author section is visible in viewport, reduce TOC max height
      if (authorRect.top < window.innerHeight) {
        const distanceToAuthor = authorRect.top - tocRect.top;
        setTocMaxHeight(`${Math.max(100, distanceToAuthor - 24)}px`);
      } else {
        setTocMaxHeight('auto');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch post by slugg
  const { data: fetchedPost, isLoading: isFetching, error: fetchError } = trpc.wordpress.postBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  // Fetch all posts for related articles
  const { data: allPosts } = trpc.wordpress.posts.useQuery({ page: 1, perPage: 20 });

  // Generate AI summary
  const generateSummary = async () => {
    if (!post) return;
    
    setIsGeneratingSummary(true);
    try {
      const response = await fetch("/api/trpc/wordpress.summarizePost?batch=1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          0: {
            json: {
              title: post.title,
              content: post.content,
              slug: post.slug,
            },
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to generate summary");
      
      const data = await response.json();
      const summaryText = data[0]?.result?.data?.json;
      setSummary(summaryText);
      toast.success("Summary generated!");
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // Share article
  const shareArticle = (platform: "linkedin" | "twitter" | "email") => {
    const text = `Check out this article: ${post?.title}`;
    const url = currentUrl;

    let shareUrl = "";
    switch (platform) {
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(post?.title || "Check out this article")}&body=${encodeURIComponent(text + "\n" + url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  // Copy link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 2000);
  };



  useEffect(() => {
    if (isFetching) {
      setIsLoading(true);
    } else if (fetchError) {
      setError("Failed to load article");
      // Wait for progress animation to complete before showing error
      if (progressComplete) {
        setIsLoading(false);
      }
    } else if (fetchedPost) {
      setPost(fetchedPost);
      setError(null);
      // Wait for progress animation to complete before showing content
      if (progressComplete) {
        setIsLoading(false);
      }
    } else if (!isFetching && !fetchedPost) {
      setError("Article not found");
      if (progressComplete) {
        setIsLoading(false);
      }
    }
  }, [fetchedPost, isFetching, fetchError, progressComplete]);

  // Get related posts (exclude current post)
  useEffect(() => {
    if (allPosts && post) {
      const related = allPosts
        .filter((p) => p.slug !== post.slug)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [allPosts, post]);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);

      // Update active heading
      if (post?.headings) {
        for (const heading of post.headings) {
          const element = document.querySelector(`[data-heading-id="${heading.id}"]`);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100) {
              setActiveHeading(heading.id);
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!match) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6">
        <p className="text-slate-600 dark:text-slate-300 text-lg">Loading article...</p>
        <div className="flex flex-col items-center gap-3">
          <div className="w-64 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
            {Math.round(loadProgress)}%
          </p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container max-w-6xl mx-auto px-4">
          <Button
            variant="ghost"
            className="text-cyan-600 hover:text-cyan-700"
            onClick={() => navigate("/blog")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">{error || "Article not found"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back Button */}
      <div className="container max-w-6xl mx-auto px-4">
        <Button
          variant="ghost"
          className="text-cyan-600 hover:text-cyan-700"
          onClick={() => navigate("/blog")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="container max-w-6xl mx-auto px-4 mb-8 md:mb-12">
          <div className="aspect-video overflow-hidden bg-slate-200 dark:bg-slate-700 rounded-xl">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="py-12 md:py-20">
        <div className="container max-w-6xl mx-auto">
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                  {post.title}
                </h1>

                {/* Meta Information and Actions */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-6">
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      {post.authorImage && (
                        <img
                          src={post.authorImage}
                          alt={post.author}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      {!post.authorImage && <User className="w-4 h-4" />}
                      {post.author}
                    </div>
                    {post.readingTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {post.readingTime} min read
                      </div>
                    )}
                  </div>
                  
                  {/* Share and Summarize Buttons */}
                  <div className="flex flex-row gap-2 items-center">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-fit text-cyan-600 hover:text-white border-cyan-200 dark:border-cyan-800 hover:bg-cyan-600 transition-colors"
                      onClick={generateSummary}
                      disabled={isGeneratingSummary}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {isGeneratingSummary ? "Summarizing..." : "Summarize"}
                    </Button>
                    
                    <SocialShareButtons
                      title={post?.title || "Check out this article"}
                      url={currentUrl}
                      description={post?.excerpt}
                      layout="dropdown"
                    />
                  </div>
                </div>
              </header>

              {/* AI Summary (if generated) */}
              {summary && (
                <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-6 mb-8">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-cyan-900 dark:text-cyan-100 mb-2">AI Summary</h3>
                      <p className="text-cyan-800 dark:text-cyan-200 text-sm">{summary}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Content with Newsletter Injection Before Last H2 */}
              <div className="prose dark:prose-invert max-w-none mb-12">
                {(() => {
                  if (!post.content) return <Streamdown>{post.content}</Streamdown>;
                  const lastH2Index = post.content.lastIndexOf('<h2');
                  if (lastH2Index === -1) return <Streamdown>{post.content}</Streamdown>;
                  const beforeLastH2 = post.content.substring(0, lastH2Index);
                  const lastH2Onwards = post.content.substring(lastH2Index);
                  return (
                    <>
                      <Streamdown>{beforeLastH2}</Streamdown>
                      <NewsletterForm />
                      <Streamdown>{lastH2Onwards}</Streamdown>
                    </>
                  );
                })()}
              </div>

              {/* Author Box */}
              <div ref={authorSectionRef} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 mb-12 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">About the Author</h3>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {post.authorImage && (
                    <div className="border-4 border-cyan-500 rounded-full flex-shrink-0 mx-auto md:mx-0">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-24 h-24 rounded-full"
                      />
                    </div>
                  )}
                  <div className="flex-1 w-full">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-left">
                      <strong className="text-slate-900 dark:text-white text-base">{post.author}</strong> is a results-driven CRM & Automation Specialist with a proven track record of designing and implementing enterprise-level solutions for businesses across diverse industries. With over 5 years of hands-on experience in HubSpot administration, WordPress development, and workflow automation, Sourabh specializes in architecting scalable digital ecosystems that drive operational efficiency and measurable business growth.
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        <strong className="text-slate-900 dark:text-white">Follow Me On:</strong>
                      </p>
                      <div className="flex gap-4">
                      <a
                        href="https://facebook.com/sourabhxsaini"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-5 h-5" />
                      </a>
                      <a
                        href="https://instagram.com/sourabhxsaini"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a
                        href="https://linkedin.com/in/sourabhxsaini"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href="https://x.com/sourabhxsaini"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        aria-label="X (Twitter)"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



            </div>

            {/* Table of Contents Sidebar */}
            {post.headings && post.headings.length > 0 && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div ref={tocSidebarRef} className="sticky top-24 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700 h-96 flex flex-col" style={{maxHeight: tocMaxHeight}}>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 flex-shrink-0">
                    <ChevronRight className="w-4 h-4" />
                    On this page
                  </h3>
                  <nav className="space-y-2 overflow-y-auto flex-1 pr-2" ref={tocContainerRef}>
                    {post.headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.querySelector(`[data-heading-id="${heading.id}"]`);
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className={`block text-sm py-1 px-3 rounded transition-colors ${
                          activeHeading === heading.id
                            ? "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 font-semibold"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                        }`}
                        style={{ paddingLeft: `${12 + (heading.level - 1) * 12}px` }}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>

      {/* Related Articles - Full Width */}
      {relatedPosts.length > 0 && (
        <div className="w-full bg-slate-50 dark:bg-slate-900/50 py-6 md:py-8">
          <div className="container max-w-6xl mx-auto px-4">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                  style={{paddingTop: '0px', paddingBottom: '2px'}}
                >
                  {/* Featured Image */}
                  {relatedPost.featuredImage && (
                    <div className="aspect-video overflow-hidden bg-slate-200 dark:bg-slate-700">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white line-clamp-2">
                      {relatedPost.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(relatedPost.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {relatedPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.ceil(relatedPost.excerpt.split(' ').length / 200)} min read
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Button
                      variant="ghost"
                      className="text-cyan-600 p-0 h-auto relative group hover:bg-transparent gap-1"
                      onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                    >
                      <span className="relative inline-block">
                        Read More
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full" />
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
