import { useState } from "react";
import { TView } from "../themedComponents/themed-view";
import {
  Ban,
  ImageIcon,
  Pencil,
  PlusIcon,
  UploadIcon,
} from "lucide-react-native";
import {
  Alert,
  Modal,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { TText } from "../themedComponents/themed-text";
import { TTextInput } from "../themedComponents/themed-textInput";
import { TButton } from "../themedComponents/themed-button";

export default function AddPost() {
  const [open, setOpen] = useState<boolean>(false);
  const colorScheme = useColorScheme();
  return (
    <TView className="flex">
      <View className="flex flex-row items-center justify-center gap-4 ">
        <PlusIcon
          onPress={() => {
            setOpen(!open);
          }}
          color={colorScheme === "dark" ? "#aac7b6" : "#061f20"}
        />
      </View>
      {open && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={open}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setOpen(!open);
          }}
        >
          <View className="flex-1 pt-24 px-8  items-center justify-center border-1 border-black rounded-3xl w-auto">
            <View className="p-5 rounded-3xl bg-black/10 border border-white/15 bg-white">
              <View className="flex flex-row gap-2 items-center mb-4">
                <Pencil size={18} color={"black"} />
                <TText
                  type="secondary"
                  className="font-bold uppercase tracking-widest text-xs"
                >
                  Create New Post
                </TText>
              </View>

              <View>
                <TText
                  type="secondary"
                  style={{
                    fontSize: 12,
                  }}
                >
                  Post Title
                </TText>
                <View className="flex-row items-center justify-center mb-6 gap-2">
                  <TTextInput
                    className="w-full"
                    type={"default"}
                    autoCapitalize="none"
                    placeholder="Fun Event"
                    placeholderTextColor="#666666"
                  />
                </View>
              </View>

              <View>
                <TText
                  type="secondary"
                  style={{
                    fontSize: 12,
                  }}
                >
                  Post Description
                </TText>
                <View>
                  <TTextInput
                    className="w-full"
                    type={"default"}
                    autoCapitalize="none"
                    placeholder="Here is the description for a really cool event"
                    placeholderTextColor="#666666"
                  />
                </View>
              </View>
              <View className="mt-4">
                <TText
                  type="secondary"
                  style={{
                    fontSize: 12,
                  }}
                >
                  Post Image
                </TText>
                <TButton
                  type="outline"
                  style={{
                    width: 120,
                    backgroundColor:
                      colorScheme === "dark" ? "#aac7b6" : "#061f20",
                  }}
                  onPress={() => {}}
                >
                  <View className="flex flex-row items-center gap-2">
                    <ImageIcon
                      size={20}
                      color={colorScheme === "dark" ? "#666666" : "#666666"}
                    />
                    <Text className="text-sm text-[#666666]">Add Image</Text>
                  </View>
                </TButton>
              </View>

              <View className="flex flex-row items-center justify-center gap-2">
                <TouchableOpacity
                  onPress={() => {
                    setOpen(!open);
                  }}
                  className="mt-6 p-3  w-1/2 flex items-center border p-2 border-black rounded-3xl "
                >
                  <View className="flex flex-row gap-2">
                    <Ban />
                    <TText type="secondary">Cancel</TText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      colorScheme === "dark" ? "#aac7b6" : "#061f20",
                  }}
                  className="mt-6 w-1/2 flex items-center border p-3 border-black rounded-3xl "
                >
                  <View className="flex flex-row gap-2">
                    <UploadIcon
                      color={colorScheme === "dark" ? "#061f20" : "#aac7b6"}
                    />
                    <TText
                      style={{
                        color: colorScheme === "dark" ? "#061f20" : "#aac7b6",
                      }}
                      type="secondary"
                    >
                      Upload
                    </TText>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </TView>
  );
}
