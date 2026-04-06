import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ErrorDisplay from "@/components/error-display";

jest.mock("@/components/themedComponents/themed-text", () => ({
  TText: ({ children }: { children: React.ReactNode }) => {
    const { Text } = require("react-native");
    return <Text>{children}</Text>;
  },
}));

const baseProps = {
  errorMessage: "Something went wrong",
  onClose: true,
  setOnClose: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ErrorDisplay", () => {
  it("renders the error message when visible", () => {
    const { getByText } = render(<ErrorDisplay {...baseProps} />);
    expect(getByText("Something went wrong")).toBeTruthy();
  });

  it("does not show modal content when onClose is false", () => {
    const { queryByText } = render(
      <ErrorDisplay {...baseProps} onClose={false} />
    );
    expect(queryByText("Something went wrong")).toBeNull();
  });

  it("calls setOnClose with toggled value when Close button is pressed", () => {
    const setOnClose = jest.fn();
    const { getByText } = render(
      <ErrorDisplay {...baseProps} setOnClose={setOnClose} />
    );

    fireEvent.press(getByText("Close"));

    expect(setOnClose).toHaveBeenCalledWith(false);
  });

});