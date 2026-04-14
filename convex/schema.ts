import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    authorName: v.string(),
    title: v.string(),
    body: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    authorId: v.string(),
    imageUrl: v.string(),
    likes: v.optional(v.array(v.string())),
  })
    .index("by_createdAt", ["createdAt"])
    .index("authorId", ["authorId"])
    .index("authorName", ["authorName"]),

  businesses: defineTable({
    businessName: v.string(),
    businessId: v.string(),
    businessLocation: v.string(),
    businessLogo: v.optional(v.string()),
    businessFollowers: v.array(v.string()),
    created_by: v.string(),
  })
    .index("created_by", ["created_by"])
    .index("businessFollowers", ["businessFollowers"])
    .index("businessId", ["businessId"]),

  users: defineTable({
    email: v.string(),
    clerkUserId: v.string(),
    firstName: v.union(v.string(), v.null()),
    lastName: v.union(v.string(), v.null()),
    imageUrl: v.union(v.string(), v.null()),
    role: v.optional(v.string()),
    following: v.array(v.string()),
  })
    .index("byClerkUserId", ["clerkUserId"])
    .index("by_role", ["role"]),

  savedPosts: defineTable({
    userKey: v.string(),
    postId: v.id("posts"),
    createdAt: v.number(),
  })
    .index("by_userKey", ["userKey"])
    .index("by_userKey_postId", ["userKey", "postId"]),
});
