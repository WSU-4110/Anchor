import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SignUpFormContainer from "@/components/sign-up-container";

// mock themed components
jest.mock("@/components/themedComponents/themed-view", () => ({
  TView: ({ children, ...props }: any) => {
    const { View } = require("react-native");
    return <View {...props}>{children}</View>;
  },
}));

jest.mock("@/components/themedComponents/themed-textInput", () => ({
  TTextInput: (props: any) => {
    const { TextInput } = require("react-native");
    return <TextInput {...props} />;
  },
}));

jest.mock("@/components/themedComponents/themed-button", () => ({
  TButton: ({ children, onPress }: any) => {
    const { TouchableOpacity } = require("react-native");
    return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
  },
}));

jest.mock("@/components/themedComponents/themed-text", () => ({
  TText: ({ children }: any) => {
    const { Text } = require("react-native");
    return <Text>{children}</Text>;
  },
}));

jest.mock("@react-navigation/native", () => ({
  Link: ({ children, href }: any) => {
    const { TouchableOpacity } = require("react-native");
    return <TouchableOpacity accessibilityLabel={href}>{children}</TouchableOpacity>;
  },
}));

const baseAccount = {
  emailAddress: "",
  password: "",
};

const baseProps = {
  type: "personal",
  account: baseAccount,
  setAccount: jest.fn(),
  onSignUpPress: jest.fn().mockResolvedValue(undefined),
};

beforeEach(() => {
  jest.clearAllMocks();
});

// tests
describe("SignUpFormContainer", () => {
	
	describe("personal type", () => {
		it("renders the personal email placeholder", () => {
      const { getByPlaceholderText } = render(<SignUpFormContainer {...baseProps} />);
      expect(getByPlaceholderText("Enter Email")).toBeTruthy();
    });

    it("renders the password input", () => {
      const { getByPlaceholderText } = render(<SignUpFormContainer {...baseProps} />);
      expect(getByPlaceholderText("Enter password")).toBeTruthy();
    });

    it("renders the Register button for personal type", () => {
      const { getByText } = render(<SignUpFormContainer {...baseProps} />);
      expect(getByText("Register")).toBeTruthy();
    });

		it("calls onSignUpPress when Register is pressed", () => {
      const { getByText } = render(<SignUpFormContainer {...baseProps} />);
      fireEvent.press(getByText("Register"));
      expect(baseProps.onSignUpPress).toHaveBeenCalledTimes(1);
    });
	});

	describe("input interactions", () => {
		it("calls setAccount with updated email on email change", () => {
      const setAccount = jest.fn();
      const { getByPlaceholderText } = render(
        <SignUpFormContainer {...baseProps} setAccount={setAccount} />
      );

      fireEvent.changeText(getByPlaceholderText("Enter Email"), "test@example.com");

      expect(setAccount).toHaveBeenCalledWith({
        ...baseAccount,
        emailAddress: "test@example.com",
      });
    });

    it("calls setAccount with updated password on password change", () => {
      const setAccount = jest.fn();
      const { getByPlaceholderText } = render(
        <SignUpFormContainer {...baseProps} setAccount={setAccount} />
      );

      fireEvent.changeText(getByPlaceholderText("Enter password"), "secret123");

      expect(setAccount).toHaveBeenCalledWith({
        ...baseAccount,
        password: "secret123",
      });
    });

    it("reflects current account values in inputs", () => {
      const filledAccount = { emailAddress: "hello@test.com", password: "pass99" };
      const { getByPlaceholderText } = render(
        <SignUpFormContainer {...baseProps} account={filledAccount} />
      );

      expect(getByPlaceholderText("Enter Email").props.value).toBe("hello@test.com");
      expect(getByPlaceholderText("Enter password").props.value).toBe("pass99");
    });
	});
	
});