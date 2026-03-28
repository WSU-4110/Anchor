import { internalMutation, query, QueryCtx } from "./_generated/server";
import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() }, // Clerk's webhook data is complex, so v.any() is easiest here
  handler: async (ctx, { data }) => {
    const clerkUserId = data.id;
    const email = data.email_addresses[0]?.email_address;
    const firstName = data.first_name;
    const lastName = data.last_name;
    const imageUrl = data.image_url;

    // Extract the custom field from unsafe_metadata
    const role = data.unsafe_metadata?.role;

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
      role, // This will now be "business" or whatever was passed from the frontend
    };
    console.log(userProps);

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
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`,
      );
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
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .withIndex("by_role")
      .order("desc");

    return users;
  },
});
