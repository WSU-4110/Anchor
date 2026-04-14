import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createBusinessHandler = async (ctx: any, args: any) => {
  const existingBusiness = await ctx.db
    .query("businesses")
    .withIndex("businessId")
    .filter()
    .unique();

  if (existingBusiness) {
    return existingBusiness._id;
  }

  return await ctx.db.insert("businesses", {
    businessName: args.businessName,
    businessId: args.businessId,
    businessLocation: args.businessLocation,
    created_by: args.created_by,
    businessFollowers: args.businessFollowers ?? [],
    ...(args.businessLogo !== undefined
      ? { businessLogo: args.businessLogo }
      : {}),
  });
};

export const updateBusinessHandler = async (ctx: any, args: any) => {
  const business = await ctx.db
    .query("businesses")
    .withIndex("businessId")
    .filter()
    .unique();

  if (!business) {
    return undefined;
  }

  await ctx.db.patch(business._id, {
    ...(args.businessName !== undefined
      ? { businessName: args.businessName }
      : {}),
    ...(args.businessLocation !== undefined
      ? { businessLocation: args.businessLocation }
      : {}),
    ...(args.businessLogo !== undefined
      ? { businessLogo: args.businessLogo }
      : {}),
    ...(args.businessFollowers !== undefined
      ? { businessFollowers: args.businessFollowers }
      : {}),
  });

  return business._id;
};

export const queryBusinessWithIdHandler = async (ctx: any, args: any) => {
  const business = await ctx.db
    .query("businesses")
    .withIndex("created_by")
    .filter()
    .unique();

  return business ?? undefined;
};

export const queryBusinessesHandler = async (ctx: any) => {
  return await ctx.db.query("businesses").collect();
};

export const queryBusinessWithId = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const business = await ctx.db
      .query("businesses")
      .withIndex("created_by", (q) => q.eq("created_by", args.userId))
      .unique();

    return business ?? null;
  },
});

export const queryBusinesses = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("businesses").collect();
  },
});

export const createBusiness = mutation({
  args: {
    businessId: v.string(),
    businessName: v.string(),
    businessLocation: v.string(),
    created_by: v.string(),
    businessLogo: v.optional(v.string()),
    businessFollowers: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const existingBusiness = await ctx.db
      .query("businesses")
      .withIndex("businessId", (q) => q.eq("businessId", args.businessId))
      .unique();

    if (existingBusiness) {
      return existingBusiness._id;
    }

    return await ctx.db.insert("businesses", {
      businessId: args.businessId,
      businessName: args.businessName,
      businessLocation: args.businessLocation,
      created_by: args.created_by,
      businessLogo: args.businessLogo,
      businessFollowers: args.businessFollowers ?? [],
    });
  },
});

export const updateBusiness = mutation({
  args: {
    businessId: v.string(),
    businessName: v.optional(v.string()),
    businessLocation: v.optional(v.string()),
    created_by: v.optional(v.string()),
    businessLogo: v.optional(v.string()),
    businessFollowers: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const business = await ctx.db
      .query("businesses")
      .withIndex("businessId", (q) => q.eq("businessId", args.businessId))
      .unique();

    if (!business) {
      throw new Error("Business not found");
    }

    const patch: {
      businessName?: string;
      businessLocation?: string;
      businessLogo?: string;
      businessFollowers?: string[];
    } = {};

    if (args.businessName !== undefined) patch.businessName = args.businessName;
    if (args.businessLocation !== undefined)
      patch.businessLocation = args.businessLocation;
    if (args.businessLogo !== undefined) patch.businessLogo = args.businessLogo;
    if (args.businessFollowers !== undefined)
      patch.businessFollowers = args.businessFollowers;

    await ctx.db.patch(business._id, patch);
    return business._id;
  },
});

export const followBusiness = mutation({
  args: {
    businessId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const business = await ctx.db
      .query("businesses")
      .withIndex("businessId", (q) => q.eq("businessId", args.businessId))
      .unique();

    if (!business) {
      throw new Error("Business not found");
    }

    if (business.businessFollowers.includes(args.userId)) {
      return business._id;
    }

    await ctx.db.patch(business._id, {
      businessFollowers: [...business.businessFollowers, args.userId],
    });

    return business._id;
  },
});

export const unfollowBusiness = mutation({
  args: {
    businessId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const business = await ctx.db
      .query("businesses")
      .withIndex("businessId", (q) => q.eq("businessId", args.businessId))
      .unique();

    if (!business) {
      throw new Error("Business not found");
    }

    await ctx.db.patch(business._id, {
      businessFollowers: business.businessFollowers.filter(
        (id) => id !== args.userId,
      ),
    });

    return business._id;
  },
});
