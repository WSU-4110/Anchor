import {
  internalMutation,
  mutation,
  query,
  QueryCtx,
} from "./_generated/server";
import { v } from "convex/values";

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() },
  handler: async (ctx, { data }) => {
    const clerkUserId = data.id;
    const email = data.email_addresses?.[0]?.email_address ?? "";
    const firstName = data.first_name ?? data.firstName ?? null;
    const lastName = data.last_name ?? data.lastName ?? null;
    const imageUrl = data.image_url ?? data.imageUrl ?? null;
    const following = data.unsafe_metadata?.following ?? [];
    const role = data.unsafe_metadata?.role ?? data.public_metadata?.role;

    const existingUser = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
      .unique();

    const userProps = {
      email,
      clerkUserId,
      firstName,
      lastName,
      imageUrl,
      role,
      following,
    };

    if (existingUser) {
      await ctx.db.patch(existingUser._id, userProps);
    } else {
      await ctx.db.insert("users", userProps);
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByExternalId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
    }
  },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByExternalId(ctx, identity.subject);
}

async function userByExternalId(ctx: QueryCtx, clerkUserId: string) {
  return await ctx.db
    .query("users")
    .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
    .unique();
}

export const getUsersByRole = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").withIndex("by_role").collect();
  },
});

export const followBusiness = mutation({
  args: {
    userId: v.string(),
    businessName: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", args.userId))
      .unique();

    if (!user) return null;

    if (user.following.includes(args.businessName)) {
      return user._id;
    }

    await ctx.db.patch(user._id, {
      following: [...user.following, args.businessName],
    });

    return user._id;
  },
});

export const unFollowBusiness = mutation({
  args: {
    userId: v.string(),
    businessName: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", args.userId))
      .unique();

    if (!user) return null;

    await ctx.db.patch(user._id, {
      following: user.following.filter(
        (businessName) => businessName !== args.businessName,
      ),
    });

    return user._id;
  },
});
