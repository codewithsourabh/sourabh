import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getWordPressPosts, getWordPressPostBySlug, getFeaturedImageUrl, getAuthorName, getExcerpt, getWordPressCategories, getWordPressPostsByCategory, extractHeadings, getAuthorImage, calculateReadingTime } from "./wordpress";
import { z } from "zod";

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
          title: post.title.rendered,
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
          title: post.title.rendered,
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
          title: post.title.rendered,
          slug: post.slug,
          excerpt: getExcerpt(post),
          date: post.date,
          featuredImage: getFeaturedImageUrl(post),
          author: getAuthorName(post),
        }));
      }),
    
    summarizePost: publicProcedure
      .input(z.object({ title: z.string(), content: z.string() }))
      .mutation(async ({ input }) => {
        try {
          const { invokeLLM } = await import("./_core/llm");
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant that summarizes blog posts concisely in 2-3 sentences.",
              },
              {
                role: "user",
                content: `Please summarize this blog post in 2-3 sentences:\n\nTitle: ${input.title}\n\nContent: ${input.content}`,
              },
            ],
          });
          return response.choices[0]?.message?.content || "Unable to generate summary";
        } catch (error) {
          console.error("Error generating summary:", error);
          throw new Error("Failed to generate summary");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
