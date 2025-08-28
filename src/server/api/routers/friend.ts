import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { friends } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";

export const friendRouter = createTRPCRouter({
  addFriend: protectedProcedure
    .input(z.object({ friendId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Prevent adding self as friend
      if (ctx.session.user.id === input.friendId) {
        throw new Error("Cannot add yourself as a friend");
      }

      // Check if friendship already exists (either direction)
      const existingFriendship = await ctx.db.query.friends.findFirst({
        where: and(
          eq(friends.userId, ctx.session.user.id),
          eq(friends.friendId, input.friendId)
        ),
      });

      const existingFriendshipReverse = await ctx.db.query.friends.findFirst({
        where: and(
          eq(friends.userId, input.friendId),
          eq(friends.friendId, ctx.session.user.id)
        ),
      });

      if (existingFriendship || existingFriendshipReverse) {
        throw new Error("Friendship already exists");
      }

      // Add friendship (one-way for now, can be extended to mutual)
      await ctx.db.insert(friends).values({
        userId: ctx.session.user.id,
        friendId: input.friendId,
      });

      return { success: true };
    }),

  getFriends: protectedProcedure.query(async ({ ctx }) => {
    const userFriends = await ctx.db.query.friends.findMany({
      where: eq(friends.userId, ctx.session.user.id),
      with: {
        friend: true, // Fetch friend's user details
      },
    });

    const friendsOfUser = await ctx.db.query.friends.findMany({
      where: eq(friends.friendId, ctx.session.user.id),
      with: {
        user: true, // Fetch user's details (who added current user as friend)
      },
    });

    // Combine and deduplicate friends, returning user details
    const allFriends = [
      ...userFriends.map((f) => f.friend),
      ...friendsOfUser.map((f) => f.user),
    ];

    const uniqueFriends = Array.from(new Map(allFriends.map(item => [item.id, item])).values());

    return uniqueFriends;
  }),
});
