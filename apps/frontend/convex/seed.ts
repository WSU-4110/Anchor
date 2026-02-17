import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    await ctx.db.insert("posts", {
      authorName: "Anchor Team",
      title: "Welcome to Anchor",
      body: "Seeded post for Sprint 1 demo.",
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("posts", {
      authorName: "Local Farmer",
      title: "Fresh produce available",
      body: "We have greens and eggs this week. Come by!",
      createdAt: now - 60_000,
      updatedAt: now - 60_000,
    });

    return true;
  },
});