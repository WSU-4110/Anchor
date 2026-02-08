export type Account = {
  emailAddress: string;
  password: string;
};
export type BusinessAccount = Account & {
  logo: string;
  businessName: string;
};

export type UserAccount = Account & {
  firstName: string;
  lastName: string;
};

export type SignUpFormProps = {
  setAccount: React.Dispatch<React.SetStateAction<Account>>;
  account: Account;
};
