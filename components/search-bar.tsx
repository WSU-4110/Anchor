import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
} from "react-native";
import { Search } from "lucide-react-native";
import { Business } from "@/constants/types";
import { useState } from "react";
import { Image } from "expo-image";
import { TView } from "./themedComponents/themed-view";
import { TText } from "./themedComponents/themed-text";

type SearchBarProps = {
  searchQuery: string;
  onChangeText: (text: string) => void;
  data: Business[];
};

export default function SearchBar({
  searchQuery,
  onChangeText,
  data,
}: SearchBarProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [businessName, setBusinessName] = useState<string>("");
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginVertical: 12,
        }}
      >
        <View
          style={{
            flex: 1,
            height: 40,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "rgba(45, 212, 191, 0.4)",
            backgroundColor: "rgba(19, 78, 74, 0.1)",
            paddingHorizontal: 12,
          }}
        >
          <Search size={16} color="#4dd9ac" style={{ marginRight: 6 }} />
          <TextInput
            value={searchQuery}
            onChangeText={onChangeText}
            placeholder="Search"
            placeholderTextColor="#6b7280"
            returnKeyType="search"
            style={{ flex: 1, height: 40, color: "#f0fdf4" }}
          />
        </View>

        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            borderRadius: 12,
            backgroundColor: "#74b890",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Search size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-col gap-2">
        {data.map((item) => (
          <TouchableOpacity
            onPress={() => {
              if (item.businessName) {
                setBusinessName(item.businessName);
                setOpen(!open);
              }
            }}
            className="w-full bg-[#74b890] gap-2 rounded-3xl p-4"
            key={item.businessId}
          >
            <Text>{item.businessName || "Waiting for Input..."}</Text>
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
                <View
                  onTouchEnd={() => {
                    setOpen(!open);
                  }}
                  className="flex-1 pt-24 px-8 items-center border-1 border-black rounded-3xl w-full"
                >
                  <View className="p-5 rounded-3xl bg-black/10 border border-white/15 bg-white w-[300px]">
                    <View className="flex-col items-center justify-center mb-2  gap-2">
                      <View className="w-24 h-24 rounded-full border-1 border-teal-500/30 items-center justify-center bg-teal-800/20 mb-4 ">
                        <Image
                          source={item.businessLogo || ""}
                          className="object-cover rounded-full"
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: 40,
                          }}
                        />
                      </View>
                      <Text className="text-2xl font-bold">{businessName}</Text>
                    </View>
                    <View className="flex flex-row gap-4 items-center justify-center ">
                      <View className="flex flex-row  gap-8">
                        <View className="flex flex-col items-center">
                          <TText>1</TText>
                          <TText>Posts</TText>
                        </View>
                        <View className="flex flex-col items-center">
                          <TText>20</TText>

                          <TText>Followers</TText>
                        </View>
                        <View className="flex flex-col items-center">
                          <TText>0</TText>
                          <TText>Events</TText>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
