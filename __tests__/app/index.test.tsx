import ModalScreen from "../../app/index";
import { fireEvent, render, screen } from "@testing-library/react-native";

jest.mock("../../lib/helpers", () => ({
  handleNavigation: jest.fn(),
}));
import { handleNavigation } from "@/lib/helpers";

describe("ModalScreen", () => {
  it("should render modalScreen with greeting message", () => {
    const { getByText } = render(<ModalScreen />);
    getByText("Welcome to Anchor");
  });
  it("should contain custom text to navigate to sign-in page", () => {
    const { getByText } = render(<ModalScreen />);
    getByText("Sign in");
  });
  it("should use handleNavigation inside modal screen component", () => {
    render(<ModalScreen />);
    const personalNavigation = screen.getByTestId("personal-navigation");
    fireEvent.press(personalNavigation);
    expect(handleNavigation).toHaveBeenCalled();
  });
});
