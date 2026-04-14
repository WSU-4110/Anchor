import { UserResource } from "@clerk/types";

export type Account = {
  emailAddress: string;
  password: string;
};
export type BusinessAccount = {
  logo: string;
  businessName: string;
};

export type UserAccount = {
  firstName: string;
  lastName: string;
  userName: string;
};

export type SignUpFormProps = {
  setAccount: React.Dispatch<React.SetStateAction<Account>>;
  account: Account;
};

export type BusinessAccountFormProps = {
  user: UserResource;
  data: Business;
};
export type PersonalAccountFormProps = {
  user: UserResource;
};

// Post record stored in Convex. `_id` is included when retrieved through queries.
export type Post = {
  _id?: string;
  authorName: string;
  authorId: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  // Array of user IDs who liked this post. Provided by Convex.
  likes?: string[];
};

export type Business = {
  businessName: string;
  businessId: string;
  businessLocation: string;
  created_by: string;
  businessLogo?: string;
  businessFollowers: string[];
};

/**
 * Props for the small post view used in grids on the business page.
 *
 * - `imageUrl` is the URL of the post image.
 * - `likesCount` is the number of likes on this post; used to display a count overlay.
 * - `setChangeView` toggles between the small and full post view.
 * - `changeView` indicates whether the modal should display the full view.
 */
export type PostViewSmallProps = {
  imageUrl: string;
  likesCount?: number;
  setChangeView: React.Dispatch<React.SetStateAction<boolean>>;
  changeView: boolean;
};
export type PostViewFullProps = {
  // Post object including optional likes and _id. When retrieved from queries, `post._id` and `post.likes` will be defined.
  post: Partial<Post>;
  setChangeView: React.Dispatch<React.SetStateAction<boolean>>;
  changeView: boolean;
  width: number;
  height: number;
};
