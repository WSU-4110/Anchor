import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    // Later we can change this to authorId: v.string() and pass Clerk userId.
    authorName: v.string(),
    title: v.string(),
    body: v.string(),
    createdAt: v.number(), // Date.now()
    updatedAt: v.number(), // Date.now()
    authorId: v.string(),
    imageUrl: v.string(),
  })
    .index("by_createdAt", ["createdAt"])
    .index("authorId", ["authorId"]),

  users: defineTable({
    email: v.string(),
    clerkUserId: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  }).index("byClerkUserId", ["clerkUserId"]),

  savedPosts: defineTable({
    userKey: v.string(), // later: Clerk userId
    postId: v.id("posts"),
    createdAt: v.number(),
  })
    .index("by_userKey", ["userKey"])
    .index("by_userKey_postId", ["userKey", "postId"]),
});
