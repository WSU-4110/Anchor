import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Search } from "lucide-react-native";
import { Business } from "@/constants/types";
import { useState } from "react";
import PublicBusinessAccount from "./businessComponents/publicBusinessAccount";
import { useGetUser } from "@/convex/queries";
import Loader from "./loader";
import ErrorDisplay from "./error-display";

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
  const { data: user, isLoading, isError, error } = useGetUser();
  const [onClose, setOnClose] = useState<boolean>(false);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        errorMessage={String(error)}
        setOnClose={setOnClose}
        onClose={onClose}
      />
    );
  }

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
            {user && open && (
              <PublicBusinessAccount
                userId={user.clerkUserId}
                userFollowing={user.following}
                userView={true}
                open={open}
                setOpen={setOpen}
                business={item}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
