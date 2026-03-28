import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const DEFAULT_USER_KEY = "local-dev";

/**
 * FR-2 Save posts (list saved)
 * Returns posts saved by a userKey.
 */
export const getSaved = query({
  args: { userKey: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const userKey = (args.userKey ?? DEFAULT_USER_KEY).trim() || DEFAULT_USER_KEY;

    const saves = await ctx.db
      .query("savedPosts")
      .withIndex("by_userKey", (q) => q.eq("userKey", userKey))
      .collect();

    const posts = [];
    for (const s of saves) {
      const post = await ctx.db.get(s.postId);
      if (post) posts.push(post);
    }

    posts.sort((a, b) => b.createdAt - a.createdAt);
    return posts;
  },
});

/**
 * FR-2 Save a post (idempotent)
 */
export const save = mutation({
  args: { postId: v.id("posts"), userKey: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const userKey = (args.userKey ?? DEFAULT_USER_KEY).trim() || DEFAULT_USER_KEY;

    const existing = await ctx.db
      .query("savedPosts")
      .withIndex("by_userKey_postId", (q) =>
        q.eq("userKey", userKey).eq("postId", args.postId)
      )
      .unique();

    if (existing) return true;

    await ctx.db.insert("savedPosts", {
      userKey,
      postId: args.postId,
      createdAt: Date.now(),
    });

    return true;
  },
});

/**
 * FR-2 Unsave a post
 */
export const unsave = mutation({
  args: { postId: v.id("posts"), userKey: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const userKey = (args.userKey ?? DEFAULT_USER_KEY).trim() || DEFAULT_USER_KEY;

    const existing = await ctx.db
      .query("savedPosts")
      .withIndex("by_userKey_postId", (q) =>
        q.eq("userKey", userKey).eq("postId", args.postId)
      )
      .unique();

    if (!existing) return false;

    await ctx.db.delete(existing._id);
    return true;
  },
});

/**
 * Optional helper for UI: check if a post is saved
 */
export const isSaved = query({
  args: { postId: v.id("posts"), userKey: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const userKey = (args.userKey ?? DEFAULT_USER_KEY).trim() || DEFAULT_USER_KEY;

    const existing = await ctx.db
      .query("savedPosts")
      .withIndex("by_userKey_postId", (q) =>
        q.eq("userKey", userKey).eq("postId", args.postId)
      )
      .unique();

    return !!existing;
  },
});
