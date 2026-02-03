
import { Account } from "@/constants/types";
import { TView } from "./themedComponents/themed-view";
import { TTextInput } from "./themedComponents/themed-textInput";
import { TButton } from "./themedComponents/themed-button";
import { TText } from "./themedComponents/themed-text";
import { Link } from "@react-navigation/native";

export type SignUpFormContainerProps={
  type : string
  setAccount : React.Dispatch<React.SetStateAction<Account>>
  account : Account
  onSignUpPress :() => Promise<void>
}
export default function SignUpFormContainer({type, account, setAccount, onSignUpPress}: SignUpFormContainerProps){

  return(
    <TView className="flex  p-12 w-full">
      <TView className="gap-4 flex items-center ">
        <TTextInput
          type="default"
          className="w-full"
          autoCapitalize="none"
          value={account.emailAddress}
          placeholder={type==="personal"?"Enter Email":"Enter Business Email"}
          placeholderTextColor="#666666"
          onChangeText={(email) => setAccount({...account, emailAddress : email})}
        />
        <TTextInput
          type="default"
          className="w-full"
          value={account.password}
          placeholder="Enter password"
          placeholderTextColor="#666666"
          secureTextEntry={true}
          onChangeText={(password) => setAccount({...account, password: password})}
        />

       {type === "personal"? (
         <TButton type="secondary" onPress={onSignUpPress}>
           <TText type="secondary">
             Register
           </TText>
         </TButton>
       ):(
         <TButton type="secondary" onPress={onSignUpPress}>
           <TText type="secondary">
             Continue
           </TText>
         </TButton>
       )}
        <TView className="flex flex-row items-center gap-2">
          <TText type="default">Have an account?</TText>
          <Link href="/sign-in">
            <TText type="link">Sign in</TText>
          </Link>
        </TView>
      </TView>
    </TView>
  )
}
