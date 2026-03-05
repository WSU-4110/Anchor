import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../convex/_generated/api";

export function useGetOwnBusinessPosts(id: string) {
  const { data, isLoading, isError, error } = useQuery(
    convexQuery(api.posts.queryOwnBusinessPosts, { id: id }),
  );
  return { data, isLoading, isError, error };
}
