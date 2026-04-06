import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/*
  Business table queries and mutations in convex
 */

export const createBusinessHandler = async (ctx, args) => {
  const id = await ctx.db.insert("businesses", {
    businessName: args.businessName,
    businessId: args.businessId,
    businessLocation: args.businessLocation,
    created_by: args.created_by,
  });
  return id;
};

export const updateBusinessHandler = async (ctx, args) => {
  const business = await ctx.db
    .query("businesses")
    .withIndex("created_by")
    .filter((q) => q.eq(q.field("created_by"), args.created_by))
    .unique();
  if (business && business.created_by === args.created_by) {
    await ctx.db.patch(business._id, {
      businessName: args.businessName,
      businessLocation: args.businessLocation,
      businessLogo: args.businessLogo,
    });
  }
};

export const queryBusinessWithIdHandler = async (ctx, args) => {
  const business = await ctx.db
    .query("businesses")
    .withIndex("created_by")
    .filter((q) => q.eq(q.field("created_by"), args.userId))
    .unique();
  if (business && business.created_by === args.userId) {
    return business;
  }
};

export const queryBusinessesHandler = async (ctx, args) => {
  const businesses = await ctx.db.query("businesses").collect();
  return businesses;
};

export const createBusiness = mutation({
  args: {
    businessName: v.string(),
    businessLocation: v.string(),
    businessId: v.string(),
    created_by: v.string(),
  },
  handler: createBusinessHandler,
});

export const updateBusiness = mutation({
  args: {
    businessName: v.string(),
    businessLocation: v.string(),
    businessId: v.string(),
    created_by: v.string(),
    businessLogo: v.optional(v.string()),
  },
  handler: updateBusinessHandler,
});

export const queryBusinessWithId = query({
  args: {
    userId: v.string(),
  },
  handler: queryBusinessWithIdHandler,
});

/*
 * Currently we are querying all businesses, without any filter
 * */
export const queryBusinesses = query({
  args: {},
  handler: queryBusinessesHandler,
});
