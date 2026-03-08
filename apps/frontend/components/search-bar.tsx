import { View, TextInput, TouchableOpacity } from "react-native";
import { Search } from "lucide-react-native";

type SearchBarProps = {
  searchQuery: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
};

export default function SearchBar({ searchQuery, onChangeText, onSearch }: SearchBarProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 12 }}>
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
          onSubmitEditing={onSearch}
          placeholder="Search"
          placeholderTextColor="#6b7280"
          returnKeyType="search"
          style={{ flex: 1, height: 40, color: "#f0fdf4" }}
        />
      </View>

      <TouchableOpacity
        onPress={onSearch}
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
  );
}
