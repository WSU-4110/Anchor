import { Post, PostViewFullProps, PostViewSmallProps } from "@/constants/types";
import {
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react-native";
import PostViewSmall from "../../components/posts/postSmall";
import PostViewFull from "@/components/posts/postViewFull";

jest.mock("../../lib/helpers", () => ({
  handleShare: jest.fn(),
}));
import { handleShare } from "@/lib/helpers";

describe("Post components", () => {
  /*
   *
   * Small size post component
   *
   */

  describe("<PostViewSmall/>", () => {
    const mockSetChangeView = jest.fn(); //Mock the setState function
    const props: PostViewSmallProps = {
      imageUrl: "https://google.com/images/some-logo",
      setChangeView: mockSetChangeView,
      changeView: false,
    };
    it("should render PostViewSmall with correct imageUrl", () => {
      render(
        <PostViewSmall
          imageUrl={props.imageUrl}
          setChangeView={props.setChangeView}
          changeView={props.changeView}
        />,
      );
      const imageElement = screen.getByTestId("image-test-id");
      expect(imageElement).toBeOnTheScreen();
      expect(imageElement.props.source[0].uri).toEqual(props.imageUrl);
    });
    it("should change states when TouchableOpacity is pressed", () => {
      const { getByTestId } = render(
        <PostViewSmall
          imageUrl={props.imageUrl}
          setChangeView={props.setChangeView}
          changeView={props.changeView}
        />,
      );
      fireEvent.press(getByTestId("change-view"));
      expect(mockSetChangeView).toHaveBeenCalled();
    });
  });

  /*
   *
   * Full size post component
   *
   */
  describe("<PostViewFull/>", () => {
    const post: Post = {
      authorId: "1",
      authorName: "Anchor",
      title: "Cool Post",
      body: "Here is a cool post",
      createdAt: "3-31-26",
      updatedAt: "3-31-26",
      imageUrl: "https://google.com/images/some-logo",
    };
    const mockSetOnChange = jest.fn();
    const props: PostViewFullProps = {
      width: 100,
      height: 100,
      post: post,
      setChangeView: mockSetOnChange,
      changeView: false,
    };

    it("should render PostViewFull with correct imageUrl", () => {
      render(
        <PostViewFull
          height={props.height}
          width={props.width}
          post={props.post}
          setChangeView={props.setChangeView}
          changeView={props.changeView}
        />,
      );
      const imageElement = screen.getByTestId("image-test-full-id");
      expect(imageElement).toBeOnTheScreen();
      expect(imageElement.props.source[0].uri).toEqual(props.post.imageUrl);
    });
    it("should change states when TouchableOpacity is pressed", () => {
      const { getByTestId } = render(
        <PostViewFull
          height={props.height}
          width={props.width}
          post={props.post}
          setChangeView={props.setChangeView}
          changeView={props.changeView}
        />,
      );
      fireEvent.press(getByTestId("change-view-full"));
      expect(mockSetOnChange).toHaveBeenCalled();
    });
    it("should render post details", () => {
      const { getByText } = render(
        <PostViewFull
          height={props.height}
          width={props.width}
          post={props.post}
          setChangeView={props.setChangeView}
          changeView={props.changeView}
        />,
      );
      const postAuthorName = getByText("Anchor");
      const postBody = getByText("Here is a cool post");

      expect(postAuthorName).toBeOnTheScreen();
      expect(postBody).toBeOnTheScreen();
    });
    it("should change colors of heart icon when liking post", () => {
      const { getByTestId } = render(
        <PostViewFull
          height={props.height}
          width={props.width}
          post={props.post}
          setChangeView={props.setChangeView}
          changeView={props.changeView}
        />,
      );
      fireEvent.press(getByTestId("share-post"));
      fireEvent.press(getByTestId("share-post-container"));
      const heartIcon = getByTestId("heart-icon");

      expect(heartIcon).toBeDefined();
      expect(heartIcon.props.children.props.fill).toBe("red");
      expect(handleShare).toHaveBeenCalled();
    });
  });
});
