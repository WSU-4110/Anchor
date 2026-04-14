import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  useColorScheme,
} from "react-native";
import { ImageIcon, Plus, X } from "lucide-react-native";
import { TButton } from "../themedComponents/themed-button";
import { TText } from "../themedComponents/themed-text";
import { TView } from "../themedComponents/themed-view";
import { useCreatePost } from "@/convex/mutations";
import * as ImagePicker from "expo-image-picker";
import { Post } from "@/constants/types";

type AddPostProps = {
  authorName: string;
  authorId: string;
};

export default function AddPost({ authorName, authorId }: AddPostProps) {
  const createPost = useCreatePost();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const colorScheme = useColorScheme();

  const [post, setPost] = useState<Post>({
    authorId: authorId,
    authorName: authorName,
    createdAt: "",
    updatedAt: "",
    title: "",
    body: "",
    imageUrl: "",
  });

  const clearFields = () => {
    setPost({
      authorId: authorId,
      authorName: authorName,
      createdAt: "",
      updatedAt: "",
      title: "",
      body: "",
      imageUrl: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
    clearFields();
  };

  const handleImageUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        setPost({ ...post, imageUrl: result.assets[0].uri });
      }
    } catch (err) {
      console.log("There was an error uploading new image", err);
    }
  };

  const handleOnCreate = () => {
    if (!post.imageUrl) {
      console.warn("No Image set for post");
    }

    try {
      createPost.mutate({
        imageUrl: post.imageUrl,
        title: post.title,
        authorName: post.authorName,
        authorId: post.authorId,
        body: post.body,
      });
      setOpen(!open);
      clearFields();
    } catch (err) {
      console.log(`There was an error creating a post: ${err}`);
    }
  };

  return (
    <>
      <Pressable onPress={() => setOpen(true)}>
        <TView className="flex-row items-center gap-2 px-4 py-2 rounded-2xl bg-teal-700/20 border border-teal-500/30">
          <Plus size={16} color="white" />
          <TText>Create Post</TText>
        </TView>
      </Pressable>

      <Modal visible={open} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 bg-black/70 justify-end">
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
            >
              <View className="max-h-[95%] rounded-t-3xl bg-[#062b2d] px-5 pt-5 pb-8">
                <View className="flex-row items-center justify-between mb-4">
                  <TText type="title">Create Post</TText>
                  <Pressable onPress={handleClose}>
                    <X size={22} color="white" />
                  </Pressable>
                </View>

                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{ paddingBottom: 24 }}
                  showsVerticalScrollIndicator={false}
                >
                  <TText className="mb-2">Title</TText>
                  <TextInput
                    value={post.title}
                    onChangeText={(e) => {
                      setPost({ ...post, title: e });
                    }}
                    placeholder="Post title"
                    placeholderTextColor="#9ca3af"
                    style={{
                      color: "white",
                      borderWidth: 1,
                      borderColor: "#4b5563",
                      borderRadius: 12,
                      paddingHorizontal: 14,
                      paddingVertical: 12,
                      marginBottom: 16,
                    }}
                  />

                  <TText className="mb-2">Body</TText>
                  <TextInput
                    value={post.body}
                    onChangeText={(e) => {
                      setPost({ ...post, body: e });
                    }}
                    placeholder="Write your post"
                    placeholderTextColor="#9ca3af"
                    multiline
                    textAlignVertical="top"
                    style={{
                      color: "white",
                      borderWidth: 1,
                      borderColor: "#4b5563",
                      borderRadius: 12,
                      paddingHorizontal: 14,
                      paddingVertical: 12,
                      minHeight: 140,
                      marginBottom: 16,
                    }}
                  />

                  <View className="mb-8">
                    <TText className="mb-2">Image URL</TText>
                    <TButton
                      type="outline"
                      style={{
                        width: 120,
                        backgroundColor:
                          colorScheme === "dark" ? "#aac7b6" : "#061f20",
                      }}
                      onPress={handleImageUpload}
                    >
                      <View className="flex flex-row items-center gap-2  ">
                        <ImageIcon
                          size={20}
                          color={colorScheme === "dark" ? "#666666" : "#666666"}
                        />
                        <Text className="text-sm text-[#666666]">
                          Add Image
                        </Text>
                      </View>
                    </TButton>
                  </View>

                  {error && (
                    <Text
                      style={{
                        color: "red",
                        marginBottom: 16,
                        textAlign: "center",
                      }}
                    >
                      {error}
                    </Text>
                  )}

                  <View className="flex items-center justify-center mb-4">
                    <TButton type="primary" onPress={handleOnCreate}>
                      <TText type="secondary">
                        {isSubmitting ? "Posting..." : "Post"}
                      </TText>
                    </TButton>
                  </View>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
