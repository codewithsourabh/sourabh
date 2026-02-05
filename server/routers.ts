import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getWordPressPosts, getWordPressPostBySlug, getFeaturedImageUrl, getAuthorName, getExcerpt } from "./wordpress";
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
        
        return {
          id: post.id,
          title: post.title.rendered,
          slug: post.slug,
          content: post.content.rendered,
          excerpt: getExcerpt(post),
          date: post.date,
          featuredImage: getFeaturedImageUrl(post),
          author: getAuthorName(post),
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
