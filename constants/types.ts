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

export type Post = {
  authorName: string;
  authorId: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
};

export type Business = {
  businessName: string;
  businessId: string;
  businessLocation: string;
  created_by: string;
  businessLogo?: string;
  businessFollowers: string[];
};

export type PostViewSmallProps = {
  imageUrl: string;
  setChangeView: React.Dispatch<React.SetStateAction<boolean>>;
  changeView: boolean;
};
export type PostViewFullProps = {
  post: Partial<Post>;
  setChangeView: React.Dispatch<React.SetStateAction<boolean>>;
  changeView: boolean;
  width: number;
  height: number;
};
