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
  authorName: string;
  authorId: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
};
