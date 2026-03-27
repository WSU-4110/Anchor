import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

/**
 * FR-8 Display consumer feed
 * Returns newest posts first (simple in-memory sort for Sprint 1).
 * Paginated results, where we pass a limit to the function i.e 5.
 */
export const getFeed = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("posts")
      .order("desc") // descending order
      .paginate(args.paginationOpts);
    return posts;
  },
});

/**
 * FR-9 View post details
 */
export const getById = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

/**
 * FR-11 Create post
 */
export const create = mutation({
  args: {
    authorName: v.optional(v.string()),
    title: v.string(),
    body: v.string(),
    authorId: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const authorName = (args.authorName ?? "Anonymous").trim() || "Anonymous";
    const authorId = args.authorId;
    const title = args.title.trim();
    const body = args.body.trim();
    const imageUrl = args.imageUrl;

    if (!title) throw new Error("Title is required");
    if (!body) throw new Error("Body is required");

    const id = await ctx.db.insert("posts", {
      authorName,
      authorId,
      title,
      body,
      imageUrl,
      createdAt: now,
      updatedAt: now,
    });

    return id;
  },
});

/**
 * FR-11 Edit post (partial updates allowed)
 */
export const update = mutation({
  args: {
    id: v.id("posts"),
    title: v.optional(v.string()),
    body: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("Post not found");

    const patch: Record<string, unknown> = {
      updatedAt: Date.now(),
    };

    if (args.title !== undefined) {
      const t = args.title.trim();
      if (!t) throw new Error("Title cannot be empty");
      patch.title = t;
    }

    if (args.body !== undefined) {
      const b = args.body.trim();
      if (!b) throw new Error("Body cannot be empty");
      patch.body = b;
    }

    await ctx.db.patch(args.id, patch);
    return true;
  },
});

/**
 * FR-11 Delete post
 * Also cleans up saved references (fine for Sprint 1 scale).
 */
export const remove = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) return false;

    // Clean up savedPosts referencing this post
    const saves = await ctx.db.query("savedPosts").collect();
    for (const s of saves) {
      if (s.postId === args.id) {
        await ctx.db.delete(s._id);
      }
    }

    await ctx.db.delete(args.id);
    return true;
  },
});

export const queryOwnBusinessPosts = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("authorId", (q) => q.eq("authorId", args.id))
      .order("desc")
      .collect();
  },
});
