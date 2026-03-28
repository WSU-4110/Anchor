import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, Button, View } from "react-native";
import React, { useState } from "react";
import type { EmailCodeFactor } from "@clerk/types";
import { ArrowBigLeft } from "lucide-react-native";
import { TTextInput } from "@/components/themedComponents/themed-textInput";
import { TView } from "@/components/themedComponents/themed-view";
import { TButton } from "@/components/themedComponents/themed-button";
import { TText } from "@/components/themedComponents/themed-text";
import LottieView from "lottie-react-native";
import ErrorDisplay from "@/components/error-display";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [showEmailCode, setShowEmailCode] = React.useState(false);
  const [error, setError] = useState<string>();
  const [isError, setIsError] = useState<boolean>(false);

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;
    if (!emailAddress || !password) {
      setError("Please fill out email and password");
      setIsError(true);
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
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
      } else if (signInAttempt.status === "needs_second_factor") {
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
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      setError("There was an error logging in");
      setIsError(true);
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
          style={{
            color: "white",
          }}
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
      {error && isError && (
        <ErrorDisplay
          errorMessage={error}
          setOnClose={setIsError}
          onClose={isError}
        />
      )}
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
          style={{
            color: "white",
          }}
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
