import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getWordPressPosts, getWordPressPostBySlug, getFeaturedImageUrl, getAuthorName, getExcerpt, getWordPressCategories, getWordPressPostsByCategory, extractHeadings, getAuthorImage, calculateReadingTime } from "./wordpress";
import { getBlogSummary, saveBlogSummary } from "./db";
import { z } from "zod";

// Decode HTML entities
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&#038;': '&',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&apos;': "'",
  };
  
  let decoded = text;
  for (const [entity, char] of Object.entries(entities)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  }
  return decoded;
}

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  wordpress: router({
    posts: publicProcedure
      .input(z.object({ page: z.number().default(1), perPage: z.number().default(10) }).optional())
      .query(async ({ input }) => {
        const page = input?.page || 1;
        const perPage = input?.perPage || 10;
        const posts = await getWordPressPosts(page, perPage);
        
        return posts.map((post) => ({
          id: post.id,
          title: decodeHtmlEntities(post.title.rendered),
          slug: post.slug,
          excerpt: getExcerpt(post),
          date: post.date,
          featuredImage: getFeaturedImageUrl(post),
          author: getAuthorName(post),
        }));
      }),
    
    postBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const post = await getWordPressPostBySlug(input.slug);
        
        if (!post) {
          return null;
        }
        
        const headings = extractHeadings(post.content.rendered);
        const readingTime = calculateReadingTime(post.content.rendered);
        const authorImage = getAuthorImage(post);
        
        return {
          id: post.id,
          title: decodeHtmlEntities(post.title.rendered),
          slug: post.slug,
          content: post.content.rendered,
          excerpt: getExcerpt(post),
          date: post.date,
          featuredImage: getFeaturedImageUrl(post),
          author: getAuthorName(post),
          authorImage: authorImage,
          readingTime: readingTime,
          headings: headings,
        };
      }),
    
    categories: publicProcedure
      .query(async () => {
        return await getWordPressCategories();
      }),
    
    postsByCategory: publicProcedure
      .input(z.object({ categoryId: z.number(), perPage: z.number().default(10) }))
      .query(async ({ input }) => {
        const posts = await getWordPressPostsByCategory(input.categoryId, input.perPage);
        
        return posts.map((post) => ({
          id: post.id,
          title: decodeHtmlEntities(post.title.rendered),
          slug: post.slug,
          excerpt: getExcerpt(post),
          date: post.date,
          featuredImage: getFeaturedImageUrl(post),
          author: getAuthorName(post),
        }));
      }),
    
    summarizePost: publicProcedure
      .input(z.object({ title: z.string(), content: z.string(), slug: z.string() }))
      .mutation(async ({ input }) => {
        try {
          // Check if summary is already cached
          const cachedSummary = await getBlogSummary(input.slug);
          if (cachedSummary) {
            console.log(`[Cache HIT] Summary for ${input.slug}`);
            return cachedSummary.summary;
          }

          console.log(`[Cache MISS] Generating summary for ${input.slug}`);
          
          // Clean and truncate content to avoid token limits
          // Remove HTML tags and limit to first 2000 characters
          const cleanContent = input.content
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/&[a-z]+;/g, '') // Remove HTML entities
            .substring(0, 2000);
          
          const { invokeLLM } = await import("./_core/llm");
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant that summarizes blog posts concisely in 2-3 sentences.",
              },
              {
                role: "user",
                content: `Please summarize this blog post in 2-3 sentences:\n\nTitle: ${input.title}\n\nContent: ${cleanContent}`,
              },
            ],
          });
          
          const summaryContent = response.choices[0]?.message?.content;
          if (!summaryContent) {
            console.error("No summary content received from LLM");
            throw new Error("No summary content received");
          }
          
          const summary = typeof summaryContent === 'string' ? summaryContent : "Unable to generate summary";
          
          // Save to cache
          await saveBlogSummary({
            postSlug: input.slug,
            postTitle: input.title,
            summary: summary,
          });
          
          console.log(`[Success] Summary generated for ${input.slug}`);
          return summary;
        } catch (error) {
          console.error("Error generating summary:", error instanceof Error ? error.message : String(error));
          throw new Error(`Failed to generate summary: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        try {
          const formData = new FormData();
          formData.append("sureforms_form_submit", "7a9423dfb7");
          formData.append("_wp_http_referer", "/form/newsletter-form/");
          formData.append("form-id", "2716");
          formData.append("srfm-sender-email-field", "");
          formData.append("srfm-honeypot-field", "");
          formData.append("srfm-email-feda2b5b-lbl-RW1haWwgQWRkcmVzcyo-email-address", input.email);

          const response = await fetch(
            "https://whitesmoke-cormorant-464905.hostingersite.com/wp-json/sureforms/v1/submit-form",
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("[Newsletter] Subscription successful:", input.email);
          return { success: true, data };
        } catch (error) {
          console.error("[Newsletter] Subscription error:", error instanceof Error ? error.message : String(error));
          throw new Error(`Failed to subscribe: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
