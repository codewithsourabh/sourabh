import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, User, Search } from "lucide-react";
import { useLocation } from "wouter";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage: string | null;
  author: string;
}

export default function WordPressBlog({ onContactClick }: { onContactClick?: () => void }) {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  // Fetch WordPress posts
  const { data: posts, isLoading, error } = trpc.wordpress.posts.useQuery({
    page: 1,
    perPage: 20,
  });

  // Filter posts based on search query
  useEffect(() => {
    if (!posts) {
      setFilteredPosts([]);
      return;
    }

    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  }, [posts, searchQuery]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

      {/* Search Section */}
      <section className="py-8 md:py-12 bg-slate-50 dark:bg-slate-800/50">
        <div className="container">
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
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-20">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-300">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400">Error loading articles. Please try again later.</p>
            </div>
          ) : filteredPosts.length === 0 ? (
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
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-cyan-600 hover:text-cyan-700 p-0 h-auto"
                      onClick={() => navigate(`/blog/${post.slug}`)}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
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
