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

// business related follower mutations
export function useGetFollowed() {
  const mutationFn = useConvexMutation(api.businesses.followBusiness);
  return useMutation({ mutationFn });
}

export function useGetUnFollowed() {
  const mutationFn = useConvexMutation(api.businesses.unFollowBusiness);
  return useMutation({ mutationFn });
}

// personal user related follower mutations
export function useFollowBusiness() {
  const mutationFn = useConvexMutation(api.users.followBusiness);
  return useMutation({ mutationFn });
}

export function useUnFollowBusiness() {
  const mutationFn = useConvexMutation(api.users.unFollowBusiness);
  return useMutation({ mutationFn });
}

// save posts functions
export function useSave() {
  const mutationFn = useConvexMutation(api.saves.save);
  return useMutation({ mutationFn});
}

export function useUnsave() {
  const mutationFn = useConvexMutation(api.saves.unsave);
  return useMutation({ mutationFn});
}


