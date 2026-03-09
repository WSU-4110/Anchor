import { useState } from "react";
import { FlatList, View, Text } from "react-native";
import { TView } from "@/components/themedComponents/themed-view";
import { TText } from "@/components/themedComponents/themed-text";
import SearchBar from "@/components/search-bar";

export default function SearchTab() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    // search logic
  };

  return (
    <TView className="flex-1 p-12">
      <View className="items-center justify-center">
        <TText type="title" className="text-2xl font-bold mb-4 mt-4">Search Businesses</TText>
      </View>

      <SearchBar
        searchQuery={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />
    </TView>
  );
}
