import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../convex/_generated/api";

export function useGetOwnBusinessPosts(id: string) {
  const { data, isLoading, isError, error } = useQuery(
    convexQuery(api.posts.queryOwnBusinessPosts, { id: id }),
  );
  return { data, isLoading, isError, error };
}

export function useGetBusiness(userId: string) {
  const { data, isLoading, isError, error } = useQuery(
    convexQuery(api.businesses.queryBusinessWithId, { userId: userId }),
  );
  return { data, isLoading, isError, error };
}

export function useGetAllBusinesses() {
  const { data, isLoading, isError, error } = useQuery(
    convexQuery(api.businesses.queryBusinesses),
  );
  return { data, isLoading, isError, error };
}

export function useGetBusinessPosts(businessName: string) {
  const { data, isLoading, isError, error } = useQuery(
    convexQuery(api.posts.queryBusinessPosts, { businessName: businessName }),
  );
  return { data, isLoading, isError, error };
}

export function useGetUser() {
  const { data, isLoading, isError, error } = useQuery(
    convexQuery(api.users.current),
  );
  return { data, isLoading, isError, error };
}
