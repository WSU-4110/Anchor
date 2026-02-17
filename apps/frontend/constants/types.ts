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

export type AccountFormProps = {
  user: UserResource;
};

export type Post = {
  title: string;
  imageUrl?: string;
  postDescription: string;
  datePosted: string;
  author: string;
};
