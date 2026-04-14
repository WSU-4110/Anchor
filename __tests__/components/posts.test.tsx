import { Post, PostViewFullProps, PostViewSmallProps } from "@/constants/types";
import { fireEvent, render, screen } from "@testing-library/react-native";
import PostViewSmall from "../../components/posts/postSmall";
import PostViewFull from "@/components/posts/postViewFull";

jest.mock("../../lib/helpers", () => ({
  handleShare: jest.fn(),
}));
import { handleShare } from "@/lib/helpers";

jest.mock("@clerk/clerk-expo", () => ({
  useUser: () => ({
    user: {
      id: "user-123",
    },
  }),
}));

jest.mock("@/convex/mutations", () => ({
  useToggleLikePost: () => ({
    mutateAsync: jest.fn().mockResolvedValue(1),
  }),
  useSavePost: () => ({
    mutateAsync: jest.fn().mockResolvedValue(undefined),
  }),
  useUnsavePost: () => ({
    mutateAsync: jest.fn().mockResolvedValue(undefined),
  }),
}));

jest.mock("@/convex/queries", () => ({
  useIsSavedPost: () => ({
    data: false,
  }),
}));

jest.mock("lucide-react-native", () => {
  const { Text } = require("react-native");

  return {
    Building2: () => <Text testID="building-icon">building</Text>,
    Bookmark: (props: any) => (
      <Text testID="bookmark-icon">{props.fill ?? ""}</Text>
    ),
    Heart: (props: any) => (
      <Text testID="heart-icon">{props.fill ?? ""}</Text>
    ),
    Share2: () => <Text testID="share-icon">share</Text>,
  };
});
describe("Post components", () => {
  describe("<PostViewSmall/>", () => {
    const mockSetChangeView = jest.fn();
    const props: PostViewSmallProps = {
      imageUrl: "https://google.com/images/some-logo",
      setChangeView: mockSetChangeView,
      changeView: false,
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

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

  describe("<PostViewFull/>", () => {
    const post: Post = {
      _id: "demo-post" as any,
      authorId: "1",
      authorName: "Anchor",
      title: "Cool Post",
      body: "Here is a cool post",
      createdAt: "3-31-26",
      updatedAt: "3-31-26",
      imageUrl: "https://google.com/images/some-logo",
      likes: [],
    };

    const mockSetOnChange = jest.fn();

    const props: PostViewFullProps = {
      width: 100,
      height: 100,
      post,
      setChangeView: mockSetOnChange,
      changeView: false,
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

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

      expect(getByText("Anchor")).toBeOnTheScreen();
      expect(getByText("Here is a cool post")).toBeOnTheScreen();
    });

    it("should call handleShare when share is pressed", () => {
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

      expect(handleShare).toHaveBeenCalledWith(
        "Cool Post",
        "Here is a cool post",
      );
    });

    it("should render the heart icon", () => {
      const { getByTestId } = render(
        <PostViewFull
          height={props.height}
          width={props.width}
          post={props.post}
          setChangeView={props.setChangeView}
          changeView={props.changeView}
        />,
      );

      expect(getByTestId("heart-icon")).toBeTruthy();
    });
  });
});