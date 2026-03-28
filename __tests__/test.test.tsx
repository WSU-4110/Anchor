import { render } from "@testing-library/react-native";
import { Text, View } from "react-native";

const Foo = () => {
  return (
    <View>
      <Text>Welcome</Text>
    </View>
  );
};
describe("Testing for PR", () => {
  it("should render component with text", () => {
    const { getByText } = render(<Foo />);

    getByText("Welcome");
  });
});
