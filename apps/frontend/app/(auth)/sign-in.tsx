import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button, View } from "react-native";
import React from "react";
import type { EmailCodeFactor } from "@clerk/types";
import { ArrowBigLeft } from "lucide-react-native";
import { TTextInput } from "@/components/themedComponents/themed-textInput";
import { TView } from "@/components/themedComponents/themed-view";
import { TButton } from "@/components/themedComponents/themed-button";
import { TText } from "@/components/themedComponents/themed-text";
import LottieView from "lottie-react-native";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [showEmailCode, setShowEmailCode] = React.useState(false);

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
              console.log(session?.currentTask);
              return;
            }
            const user = session.user;
            const memberships = user?.organizationMemberships || [];
            if (memberships.length > 0) {
              router.replace("/(business)");
            } else {
              router.replace("/(home)");
            }
          },
        });
      } else if (signInAttempt.status === "needs_second_factor") {
        // Check if email_code is a valid second factor
        // This is required when Client Trust is enabled and the user
        // is signing in from a new device.
        // See https://clerk.com/docs/guides/secure/client-trust
        const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
          (factor): factor is EmailCodeFactor =>
            factor.strategy === "email_code",
        );

        if (emailCodeFactor) {
          await signIn.prepareSecondFactor({
            strategy: "email_code",
            emailAddressId: emailCodeFactor.emailAddressId,
          });
          setShowEmailCode(true);
        }
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  // Handle the submission of the email verification code
  const onVerifyPress = React.useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code,
      });

      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }
            const user = session.user;
            const memberships = user?.organizationMemberships || [];
            if (memberships.length > 0) {
              router.replace("/(business)");
            } else {
              router.replace("/(home)");
            }
          },
        });
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, code]);

  // Display email code verification form
  if (showEmailCode) {
    return (
      <TView className="flex-1 items-center justify-center">
        <Text>Verify your email</Text>
        <Text>A verification code has been sent to your email.</Text>
        <TTextInput
          type="default"
          className="w-1/2"
          value={code}
          placeholder="Enter verification code"
          placeholderTextColor="#666666"
          onChangeText={(code) => setCode(code)}
        />
        <Button title="Verify" onPress={onVerifyPress} />
      </TView>
    );
  }

  return (
    <TView className="flex-1 p-12">
      <TView className="flex flex-row gap-24 mb-8 mt-4">
        <ArrowBigLeft
          color="white"
          onPress={() => {
            router.back();
          }}
        />
        <TText className="" type="title">
          Login
        </TText>
      </TView>

      <TView className="gap-4 flex items-center min-h-screen w-full">
        <View className="h-80 w-80">
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
        </View>

        <TTextInput
          className="w-full"
          type={"default"}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#666666"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />

        <TTextInput
          className="w-full"
          type={"default"}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#666666"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <TButton type="secondary" onPress={onSignInPress}>
          <TText type="secondary">Login</TText>
        </TButton>
        <TView className="flex flex-row items-center gap-2">
          <TText type="default">Forgot to Register?</TText>
          <Link href="./sign-up">
            <TText type="link">Sign up</TText>
          </Link>
        </TView>
      </TView>
    </TView>
  );
}
