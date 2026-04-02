import { useState } from "react";
import { View } from "react-native";
import { TView } from "@/components/themedComponents/themed-view";
import { TText } from "@/components/themedComponents/themed-text";
import SearchBar from "@/components/search-bar";
import { Business } from "@/constants/types";

type SearchBarProps = {
  data: Business[];
};
export default function SearchTab({ data }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredData = data.filter((e) => {
    return e.businessName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <TView className="flex-1 p-12">
      <View className="items-center justify-center">
        <TText type="title" className="text-2xl font-bold mb-4 mt-4">
          Search Businesses
        </TText>
      </View>

      <SearchBar
        searchQuery={searchQuery}
        onChangeText={setSearchQuery}
        data={
          searchQuery.length > 0
            ? filteredData
            : [
                {
                  businessName: "",
                  businessId: "",
                  businessLocation: "",
                  created_by: "",
                },
              ]
        }
      />
    </TView>
  );
}
