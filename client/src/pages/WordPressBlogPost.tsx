import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Streamdown } from "streamdown";

interface BlogPostDetail {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  featuredImage: string | null;
  author: string;
}

export default function WordPressBlogPost() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/blog/:slug");
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slug = params?.slug as string;

  // Fetch post by slug
  const { data: fetchedPost, isLoading: isFetching, error: fetchError } = trpc.wordpress.postBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  useEffect(() => {
    if (isFetching) {
      setIsLoading(true);
    } else if (fetchError) {
      setError("Failed to load article");
      setIsLoading(false);
    } else if (fetchedPost) {
      setPost(fetchedPost);
      setError(null);
      setIsLoading(false);
    } else if (!isFetching && !fetchedPost) {
      setError("Article not found");
      setIsLoading(false);
    }
  }, [fetchedPost, isFetching, fetchError]);

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
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-slate-600 dark:text-slate-300">Loading article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container py-12">
          <Button
            variant="ghost"
            className="mb-8 text-cyan-600 hover:text-cyan-700"
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
      {/* Back Button */}
      <div className="container py-6">
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
        <div className="w-full aspect-video overflow-hidden bg-slate-200 dark:bg-slate-700">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="py-12 md:py-20">
        <div className="container max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 pb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose dark:prose-invert max-w-none">
            <Streamdown>{post.content}</Streamdown>
          </div>
        </div>
      </article>
    </div>
  );
}
