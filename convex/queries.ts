import { useQuery } from "convex/react";
import { api } from "./_generated/api";

export function useGetOwnBusinessPosts(id: string) {
  const data = useQuery(api.posts.queryOwnBusinessPosts, { id });

  return {
    data,
    isLoading: data === undefined,
    isError: false,
    error: null,
  };
}

export function useGetBusiness(userId: string) {
  const data = useQuery(api.businesses.queryBusinessWithId, { userId });

  return {
    data,
    isLoading: data === undefined,
    isError: false,
    error: null,
  };
}

export function useGetAllBusinesses() {
  const data = useQuery(api.businesses.queryBusinesses, {});

  return {
    data,
    isLoading: data === undefined,
    isError: false,
    error: null,
  };
}

export function useGetBusinessPosts(businessName: string) {
  const data = useQuery(api.posts.queryBusinessPosts, { businessName });

  return {
    data,
    isLoading: data === undefined,
    isError: false,
    error: null,
  };
}

export function useGetUser() {
  const data = useQuery(api.users.current, {});

  return {
    data,
    isLoading: data === undefined,
    isError: false,
    error: null,
  };
}

export function useGetSavedPosts(userKey?: string) {
  const data = useQuery(api.saves.getSaved, { userKey });

  return {
    data,
    isLoading: data === undefined,
    isError: false,
    error: null,
  };
}

export function useIsSavedPost(postId?: any, userKey?: string) {
  const data = useQuery(
    api.saves.isSaved,
    postId ? { postId, userKey } : "skip",
  );

  return {
    data,
    isLoading: data === undefined && !!postId,
    isError: false,
    error: null,
  };
}
