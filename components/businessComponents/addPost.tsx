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
} from "react-native";
import { Plus, X } from "lucide-react-native";
import { TButton } from "../themedComponents/themed-button";
import { TText } from "../themedComponents/themed-text";
import { TView } from "../themedComponents/themed-view";
import { useCreatePost } from "@/convex/mutations";

type AddPostProps = {
  authorName: string;
  authorId: string;
};

export default function AddPost({ authorName, authorId }: AddPostProps) {
  const createPost = useCreatePost();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTitle("");
    setBody("");
    setImageUrl("");
    setError(null);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleCreatePost = async () => {
    if (isSubmitting) return;

    if (!title.trim()) {
      setError("Post title is required.");
      return;
    }

    if (!body.trim()) {
      setError("Post body is required.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await createPost.mutateAsync({
        title: title.trim(),
        body: body.trim(),
        imageUrl: imageUrl.trim(),
        authorName,
        authorId,
      });

      handleClose();
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "There was an error creating the post.";

      setError(message);
      setIsSubmitting(false);
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
              <View className="max-h-[85%] rounded-t-3xl bg-[#062b2d] px-5 pt-5 pb-8">
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
                    value={title}
                    onChangeText={setTitle}
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
                    value={body}
                    onChangeText={setBody}
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

                  <TText className="mb-2">Image URL</TText>
                  <TextInput
                    value={imageUrl}
                    onChangeText={setImageUrl}
                    placeholder="Optional image URL"
                    placeholderTextColor="#9ca3af"
                    autoCapitalize="none"
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

                  <TButton type="primary" onPress={handleCreatePost}>
                    <TText type="secondary">
                      {isSubmitting ? "Posting..." : "Post"}
                    </TText>
                  </TButton>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}