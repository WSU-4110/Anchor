import * as React from "react";
import { Button, View, ActivityIndicator } from "react-native";
import { useSignUp, useSignIn } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TView } from "@/components/themedComponents/themed-view";
import { ArrowBigLeft } from "lucide-react-native";
import { TText } from "@/components/themedComponents/themed-text";
import LottieView from "lottie-react-native";
import SignUpFormContainer from "@/components/sign-up-container";
import { Account } from "@/constants/types";
import "../../global.css";
import { TTextInput } from "@/components/themedComponents/themed-textInput";
import ErrorDisplay from "@/components/error-display";

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type?: string }>();

  const [account, setAccount] = React.useState<Account>({
    emailAddress: "",
    password: "",
  });

  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState<string>();
  const [isError, setIsError] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(false);

  const resolvedType = type === "business" ? "business" : "personal";

  const routeAfterAuth = React.useCallback(() => {
    if (resolvedType === "business") {
      router.replace("/(auth-business)");
    } else {
      router.replace("/(home)");
    }
  }, [resolvedType, router]);

  const onSignUpPress = async () => {
    if (!isLoaded || !signUp || isSubmitting) return;

    if (!account.emailAddress.trim() || !account.password.trim()) {
      setError("Please fill out form");
      setIsError(true);
      return;
    }

    setIsSubmitting(true);
    setError(undefined);
    setIsError(false);

    try {
      await signUp.create({
        emailAddress: account.emailAddress.trim().toLowerCase(),
        password: account.password,
        username: account.emailAddress.split("@")[0],
        publicMetadata: {
          role: resolvedType,
        },
        unsafeMetadata: {
          role: resolvedType,
          following: [],
        },
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Signup failed";

      setError(message);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded || !signUp || isVerifying) return;

    const cleanCode = code.trim();

    if (!cleanCode) {
      setError("Enter code.");
      setIsError(true);
      return;
    }

    setIsVerifying(true);
    setError(undefined);
    setIsError(false);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: cleanCode,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({
          session: signUpAttempt.createdSessionId!,
        });
        routeAfterAuth();
        return;
      }

      setError("Verification failed. Try again.");
      setIsError(true);
    } catch (err: any) {
      const codeType = err?.errors?.[0]?.code;

      if (codeType === "verification_already_verified") {
        try {
          if (signIn) {
            const signInAttempt = await signIn.create({
              identifier: account.emailAddress.trim().toLowerCase(),
              password: account.password,
            });

            if (signInAttempt.status === "complete") {
              await setActive({
                session: signInAttempt.createdSessionId!,
              });
              routeAfterAuth();
              return;
            }
          }
        } catch {
          routeAfterAuth();
          return;
        }
      }

      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Verification failed";

      setError(message);
      setIsError(true);
    } finally {
      setIsVerifying(false);
    }
  };

  if (pendingVerification) {
    return (
      <TView className="flex-1 justify-center items-center p-8">
        {error && isError && (
          <ErrorDisplay
            errorMessage={error}
            onClose={isError}
            setOnClose={setIsError}
          />
        )}

        <TText type="title" className="mb-4">
          Verify your email
        </TText>

        <TText className="mb-6 text-center">
          Enter the verification code sent to your email.
        </TText>

        <TTextInput
          className="w-3/4"
          style={{ color: "white" }}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#666666"
          onChangeText={setCode}
          editable={!isVerifying}
        />

        <View style={{ marginTop: 16 }}>
          {isVerifying ? (
            <ActivityIndicator />
          ) : (
            <Button title="Verify" onPress={onVerifyPress} />
          )}
        </View>
      </TView>
    );
  }

  return (
    <TView className="flex-1 p-12">
      {error && isError && (
        <ErrorDisplay
          errorMessage={error}
          onClose={isError}
          setOnClose={setIsError}
        />
      )}

      <TView className="flex flex-row gap-[64px] mb-8 mt-4">
        <ArrowBigLeft color="white" onPress={() => router.back()} />
        <TText className="mr-32" type="title">
          Register
        </TText>
      </TView>

      <TView className="gap-4 flex items-center h-64 w-full">
        <View className="h-80 w-80">
          <LottieView
            source={require("../../assets/animations/lottie-animation.json")}
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          />
        </View>

        <SignUpFormContainer
          type={resolvedType}
          account={account}
          setAccount={setAccount}
          onSignUpPress={onSignUpPress}
        />
      </TView>
    </TView>
  );
}