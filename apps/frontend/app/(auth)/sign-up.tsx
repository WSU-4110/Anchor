import * as React from "react";
import { Text, TextInput, Button, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { TView } from "@/components/themedComponents/themed-view";
import { ArrowBigLeft } from "lucide-react-native";
import { TText } from "@/components/themedComponents/themed-text";
import { TTextInput } from "@/components/themedComponents/themed-textInput";
import { TButton } from "@/components/themedComponents/themed-button";
import LottieView from "lottie-react-native";
export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({
          session: signUpAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
              console.log(session?.currentTask);
              return;
            }

            router.replace("/(home)");
          },
        });

        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <>
        <Text className="mt-24">Verify your email</Text>
        <TextInput
          style={{
            color: "white",
          }}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#666666"
          onChangeText={(code) => setCode(code)}
        />
        <Button title="Verify" onPress={onVerifyPress} />
      </>
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
        <TTextInput
          type="default"
          className="w-full"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#666666"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TTextInput
          type="default"
          className="w-full"
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#666666"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TButton type="secondary" onPress={onSignUpPress}>
          <TText type="secondary">Register</TText>
        </TButton>
        <TView className="flex flex-row items-center gap-2">
          <TText type="default">Have an account?</TText>
          <Link href="/sign-in">
            <TText type="link">Sign in</TText>
          </Link>
        </TView>
      </TView>
    </TView>
  );
}
