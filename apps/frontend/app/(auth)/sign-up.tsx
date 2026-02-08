import * as React from "react";
import { Text, TextInput, Button } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { TView } from "@/components/themedComponents/themed-view";
import { ArrowBigLeft } from "lucide-react-native";
import { TText } from "@/components/themedComponents/themed-text";
import LottieView from "lottie-react-native";
import SignUpFormContainer from "@/components/sign-up-container";
import { Account } from "@/constants/types";
import "../../global.css"
import { TTextInput } from "@/components/themedComponents/themed-textInput";
import { TButton } from "@/components/themedComponents/themed-button";
export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string }>();

  const [account, setAccount] = React.useState<Account>({
    emailAddress : "",
    password : ""
  })
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    const {emailAddress, password} = account;
    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
        unsafeMetadata: {
            initialRole: type,
          },
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
              await setActive({
                session: signUpAttempt.createdSessionId,
                navigate: async ({ session }) => {
                  if (session?.currentTask) {
                    // Check for tasks and navigate to custom UI to help users resolve them
                    // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                    console.log(session?.currentTask)
                    return
                  }
                  if(type==="business"){
                    router.replace("/(auth-business)")
                  }else{
                    router.replace("/(home)")

                  }
                },
              })
            }else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <TView className="flex-1 justify-center items-center">
        <TText type="default" className="mt-24">Verify your email</TText>
        <TTextInput
        type="default"
        className="w-1/2"
          style={{
            color: "white",
          }}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#666666"
          onChangeText={(code) => setCode(code)}
        />
        <Button title="Verify" onPress={onVerifyPress} />
      </TView>
    );
  }

  return (
    <TView className="flex-1 p-12">
      <TView className="flex flex-row  mb-8 mt-4 ">
        <TView className="flex align-start">
          <ArrowBigLeft
            color="white"
            onPress={() => {
              router.back();
            }}
          />
        </TView>

        <TView className="flex flex-row justify-center items-center w-full pr-12">
          <TText type="title">Register</TText>
        </TView>
        <TView />
      </TView>
      <TView className="gap-4 flex items-center min-h-screen w-full">
        <LottieView
          source={require("../../assets/animations/lottie-animation.json")}
          autoPlay
          loop
          style={{
            width: 300,
            height: 300,
            borderColor: "#FFF",
          }}
        />
        <SignUpFormContainer type={type} account={account} setAccount={setAccount} onSignUpPress={onSignUpPress}/>
      </TView>
    </TView>
  );
}
