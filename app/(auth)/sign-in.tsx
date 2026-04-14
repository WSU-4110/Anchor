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

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    if (!emailAddress.trim() || !password.trim()) {
      setError("Please fill out email and password");
      setIsError(true);
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress.trim().toLowerCase(),
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(auth)");
        return;
      }

      if (signInAttempt.status === "needs_second_factor") {
        const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
          (factor): factor is EmailCodeFactor =>
            factor.strategy === "email_code"
        );

        if (emailCodeFactor) {
          await signIn.prepareSecondFactor({
            strategy: "email_code",
            emailAddressId: emailCodeFactor.emailAddressId,
          });
          setShowEmailCode(true);
          return;
        }
      }

      setError("Unable to sign in with these credentials.");
      setIsError(true);
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "There was an error logging in";

      setError(message);
      setIsError(true);
    }
  }, [isLoaded, emailAddress, password, signIn, setActive, router]);

  const onVerifyPress = React.useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code: code.trim(),
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(auth)");
        return;
      }

      setError("Invalid verification code. Please try again.");
      setIsError(true);
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "There was an error verifying your code";

      setError(message);
      setIsError(true);
    }
  }, [isLoaded, code, signIn, setActive, router]);

  if (showEmailCode) {
    return (
      <TView className="flex-1 items-center justify-center">
        {error && isError && (
          <ErrorDisplay
            errorMessage={error}
            setOnClose={setIsError}
            onClose={isError}
          />
        )}
        <Text>Verify your email</Text>
        <Text>A verification code has been sent to your email.</Text>
        <TTextInput
          type="default"
          className="w-1/2"
          value={code}
          style={{ color: "white" }}
          placeholder="Enter verification code"
          placeholderTextColor="#666666"
          onChangeText={setCode}
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
        <ArrowBigLeft color="white" onPress={() => router.back()} />
        <TText type="title">Login</TText>
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
          type="default"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#666666"
          onChangeText={setEmailAddress}
        />

        <TTextInput
          className="w-full"
          type="default"
          style={{ color: "white" }}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#666666"
          secureTextEntry={true}
          onChangeText={setPassword}
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