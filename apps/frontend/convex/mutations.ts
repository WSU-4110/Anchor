import { useMutation } from "@tanstack/react-query";
import { api } from "./_generated/api";
import { useConvexMutation } from "@convex-dev/react-query";

export function useCreatePost() {
  const mutationFn = useConvexMutation(api.posts.create);
  return useMutation({ mutationFn });
}
