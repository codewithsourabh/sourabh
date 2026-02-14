import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, User, Search, X, Clock } from "lucide-react";
import { useLocation } from "wouter";
import { CircularProgress } from "@/components/CircularProgress";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage: string | null;
  author: string;
  content?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

const CATEGORY_MAP: Record<number, string> = {
  4: "AI",
  2: "HubSpot",
  5: "Integration",
  1: "Salesforce",
  3: "WordPress",
};

export default function WordPressBlog({ onContactClick }: { onContactClick?: () => void }) {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [progressComplete, setProgressComplete] = useState(false);

  // Fetch WordPress posts
  const { data: posts, isLoading, error } = trpc.wordpress.posts.useQuery({
    page: 1,
    perPage: 20,
  });

  // Fetch categories
  const { data: categories } = trpc.wordpress.categories.useQuery();

  // Fetch posts by category if selected
  const { data: categoryPosts, isLoading: isCategoryLoading } = trpc.wordpress.postsByCategory.useQuery(
    { categoryId: selectedCategory || 0, perPage: 20 },
    { enabled: selectedCategory !== null }
  );

  // Reset loader when category changes
  useEffect(() => {
    setLoadProgress(0);
    setProgressComplete(false);
  }, [selectedCategory]);

  // Filter posts based on search query and category
  useEffect(() => {
    let filtered = selectedCategory ? categoryPosts : posts;

    if (!filtered) {
      setFilteredPosts([]);
      return;
    }

    if (!searchQuery.trim()) {
      setFilteredPosts(filtered);
      return;
    }

    const query = searchQuery.toLowerCase();
    const result = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
    );
    setFilteredPosts(result);
  }, [posts, categoryPosts, searchQuery, selectedCategory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to strip HTML tags and count words
  const getWordCount = (htmlContent: string): number => {
    // Strip HTML tags
    const textContent = htmlContent.replace(/<[^>]*>/g, ' ');
    // Decode HTML entities
    const decodedText = textContent
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
    // Split by whitespace and filter out empty strings
    const words = decodedText.trim().split(/\s+/).filter(word => word.length > 0);
    return words.length;
  };

  // Calculate reading time in minutes
  const getReadingTime = (post: BlogPost): number => {
    const wordCount = post.content ? getWordCount(post.content) : getWordCount(post.excerpt);
    return Math.max(1, Math.ceil(wordCount / 200)); // 200 words per minute
  };

  // Circular progress animation from 0 to 100% - guaranteed completion
  useEffect(() => {
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
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []); // Empty dependency array - run once on mount

  // Separate effect to handle showing content when both animation and data are ready
  useEffect(() => {
    if (loadProgress >= 100 && !isLoading) {
      setProgressComplete(true);
    }
  }, [loadProgress, isLoading]);

  // Restart animation when category changes and data is loading
  useEffect(() => {
    if (selectedCategory !== null && isCategoryLoading) {
      // Start a new animation sequence
      let startTime = Date.now();
      let animationFrameId: number;
      const ANIMATION_DURATION = 2000;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / ANIMATION_DURATION) * 100, 100);
        
        setLoadProgress(progress);

        if (progress < 100) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [selectedCategory, isCategoryLoading]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Blog & <span className="text-cyan-600">Insights</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            Exploring HubSpot automation, WordPress optimization, and integration strategies to help you build scalable digital solutions.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 md:py-12 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Category Filter */}
            <div className="flex-1">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Filter by Category:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? "bg-cyan-600 text-white" : "hover:text-white transition-colors duration-300"}
              >
                All Posts
              </Button>
              {categories?.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-cyan-600 text-white" : "hover:text-white transition-colors duration-300"}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-auto">
              <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-20">
        <div className="container">
          {(isLoading || isCategoryLoading || (selectedCategory !== null && !progressComplete)) ? (
            <div className="flex justify-center py-20">
              <CircularProgress progress={loadProgress} />
            </div>
          ) : (error && !isLoading) ? (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400">Error loading articles. Please try again later.</p>
            </div>
          ) : (filteredPosts.length === 0 && !isLoading) ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-300">
                {searchQuery ? "No articles found matching your search." : "No articles available."}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  style={{paddingTop: '0px', paddingBottom: '2px'}}
                >
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <div className="aspect-video overflow-hidden bg-slate-200 dark:bg-slate-700">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getReadingTime(post)} min read
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Button
                      variant="ghost"
                      className="text-cyan-600 p-0 h-auto relative group hover:bg-transparent gap-1"
                      onClick={() => navigate(`/blog/${post.slug}`)}
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
          )}
        </div>
      </section>
    </div>
  );
}
