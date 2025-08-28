import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";

export const postRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			};
		}),

	create: protectedProcedure
		.input(z.object({ title: z.string().min(1), body: z.string().min(1) }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.insert(posts).values({
				title: input.title,
				body: input.body,
				createdById: ctx.session.user.id,
			});
		}),

	getLatest: protectedProcedure.query(async ({ ctx }) => {
		const post = await ctx.db.query.posts.findFirst({
			orderBy: (posts, { desc }) => [desc(posts.createdAt)],
		});

		return post ?? null;
	}),

	getMyPosts: protectedProcedure.query(async ({ ctx }) => {
		return ctx.db.query.posts.findMany({
			where: (posts, { eq }) => eq(posts.createdById, ctx.session.user.id),
			orderBy: (posts, { desc }) => [desc(posts.createdAt)],
		});
	}),

	getSecretMessage: protectedProcedure.query(() => {
		return "you can now see this secret message!";
	}),

	delete: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const result = await ctx.db.delete(posts).where(
				and(
					eq(posts.id, input.id),
					eq(posts.createdById, ctx.session.user.id)
				)
			);
			
			return { success: true };
		}),
});
