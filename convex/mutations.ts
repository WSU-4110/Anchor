import { useMutation } from "@tanstack/react-query";
import { api } from "./_generated/api";
import { useConvexMutation } from "@convex-dev/react-query";

export function useCreatePost() {
  const mutationFn = useConvexMutation(api.posts.create);
  return useMutation({ mutationFn });
}

export function useCreateBusiness() {
  const mutationFn = useConvexMutation(api.businesses.createBusiness);
  return useMutation({ mutationFn });
}

export function useUpdateBusiness() {
  const mutationFn = useConvexMutation(api.businesses.updateBusiness);
  return useMutation({ mutationFn });
}

export function useGetFollowed() {
  const mutationFn = useConvexMutation(api.businesses.followBusiness);
  return useMutation({ mutationFn });
}

export function useGetUnFollowed() {
  const mutationFn = useConvexMutation(api.businesses.unfollowBusiness);
  return useMutation({ mutationFn });
}

export function useDeletePost() {
  const mutationFn = useConvexMutation(api.posts.remove);
  return useMutation({ mutationFn });
}

export function useFollowBusiness() {
  const mutationFn = useConvexMutation(api.users.followBusiness);
  return useMutation({ mutationFn });
}

export function useUnFollowBusiness() {
  const mutationFn = useConvexMutation(api.users.unFollowBusiness);
  return useMutation({ mutationFn });
}

export function useToggleLikePost() {
  const mutationFn = useConvexMutation(api.posts.toggleLike);
  return useMutation({ mutationFn });
}

export function useSavePost() {
  const mutationFn = useConvexMutation(api.saves.save);
  return useMutation({ mutationFn });
}

export function useUnsavePost() {
  const mutationFn = useConvexMutation(api.saves.unsave);
  return useMutation({ mutationFn });
}
