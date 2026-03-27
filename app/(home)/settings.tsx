import { TText } from "@/components/themedComponents/themed-text";
import { TView } from "@/components/themedComponents/themed-view";
import {
  Ban,
  ChevronRight,
  LogOut,
  Settings2,
  Trash2,
  User,
} from "lucide-react-native";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import AccountFormContainer from "@/components/clerk/AccountFormContainer";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { TScrollView } from "@/components/themedComponents/themed-scrollView";
import { useState } from "react";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

export default function SettingsScreen() {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteUser = async () => {
    try {
      await user?.delete().then(() => {
        setIsDeleted(!isDeleted);
        handleSignOut();
      });
    } catch (err) {
      console.log(`there was an error deleteing user: ${err}`);
    }
  };
  const handleSignOut = async () => {
    try {
      await signOut();
      router.dismissAll();
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  const handleImageSelector = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        const base64 = result.assets[0].base64;
        const mimeType = result.assets[0].mimeType;
        const image = `data:${mimeType};base64,${base64}`;

        if (user) {
          await user.setProfileImage({ file: image });
          await user.reload();
        }
      }
    } catch (err) {
      console.log("There was an error uploading new image", err);
    }
  };
  return (
    <TScrollView className="flex-1">
      {/* Header with Background Accent */}
      <TView className="pt-16 pb-8 px-6 items-center justify-center">
        {user && (
          <TView className="w-24 h-24 rounded-full border-4 border-teal-500/30 items-center justify-center bg-teal-800/20 mb-4 ">
            <TouchableOpacity onPress={handleImageSelector}>
              <Image
                source={user.imageUrl}
                className="object-cover rounded-full"
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 40,
                }}
              />
            </TouchableOpacity>
          </TView>
        )}
        <TText type="title" className="text-2xl font-bold">
          Account Settings
        </TText>
        <TText className="opacity-60 text-sm">
          Update your personal information
        </TText>
      </TView>

      <TView className="px-5 gap-6">
        <TView className="p-5 rounded-3xl bg-black/10 border border-white/15">
          <TView className="flex-row items-center mb-6 gap-2">
            <Settings2 size={18} color="#aac7b6" />
            <TText className="font-bold uppercase tracking-widest text-xs">
              Profile Details
            </TText>
          </TView>

          {user && isLoaded && (
            <AccountFormContainer accountType="user" user={user} />
          )}
        </TView>

        <View className="flex flex-row gap-2 items-center justify-center ">
          <TouchableOpacity
            onPress={handleSignOut}
            className="flex-row items-center justify-between p-5 rounded-2xl bg-red-900/30 border border-red-900/20"
          >
            <View className="flex-row items-center gap-3 bg-none ">
              <LogOut size={20} color="#ff6b6b" />
              <Text className="text-red-400 font-medium">Log Out</Text>
            </View>
            <ChevronRight size={16} color="#ff6b6b" opacity={0.5} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsDeleted(!isDeleted);
            }}
            className="flex-row items-center justify-between p-5 rounded-2xl bg-red-900/30 border border-red-900/20"
          >
            <View className="flex-row items-center gap-3 bg-none ">
              <User size={20} color="#ff6b6b" />
              <Text className="text-red-400 font-medium">Delete Account</Text>
            </View>
            <ChevronRight size={16} color="#ff6b6b" opacity={0.5} />
          </TouchableOpacity>
        </View>
      </TView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleted}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsDeleted(!isDeleted);
        }}
      >
        <View className="flex-1 pt-24 px-8 items-center justify-center border-1 border-black rounded-3xl w-auto">
          <View className="p-5 rounded-3xl bg-black/10 border border-white/15 bg-white">
            <View className="flex-row items-center justify-center mb-6 gap-2">
              <Trash2 size={18} color="#aac7b6" />
              <TText className="font-bold uppercase tracking-widest text-xs">
                Delete your account?
              </TText>
            </View>
            <TText type="secondary">
              This action is{" "}
              <Text className="font-bold underline">NOT REVERSABLE</Text>, we
              will delete your account and{" "}
              <TText className="font-bold underline">ALL</TText> associated data
            </TText>
            <View className="flex flex-row gap-2 items-center justify-center pt-4">
              <TouchableOpacity
                onPress={() => {
                  setIsDeleted(!isDeleted);
                }}
                className="flex-row items-center justify-between p-5 rounded-2xl bg-blue-600 border border-blue-900/20"
              >
                <View className="flex-row items-center gap-3 bg-none ">
                  <Ban size={20} color="white" />
                  <Text className="text-blue-200 font-medium">Cancel</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  handleDeleteUser();
                }}
                className="flex-row items-center justify-between p-5 rounded-2xl bg-red-600 border border-red-900/20"
              >
                <View className="flex-row items-center gap-3 bg-none ">
                  <User size={20} color="white" />
                  <Text className="text-red-200 font-medium">
                    Delete Account
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </TScrollView>
  );
}
