import { useState } from "react";
import { View } from "react-native";
import { TView } from "@/components/themedComponents/themed-view";
import { TText } from "@/components/themedComponents/themed-text";
import SearchBar from "@/components/search-bar";
import { Business } from "@/constants/types";

export default function SearchTab() {
  const businesses: Business[] = [
    {
      businessName: "Anchor",
      businessId: "1",
    },
    {
      businessName: "Banker",
      businessId: "2",
    },
    {
      businessName: "Lucky's",
      businessId: "3",
    },
    {
      businessName: "Green Initiative",
      businessId: "4",
    },
    {
      businessName: "Yeti",
      businessId: "5",
    },
    {
      businessName: "Firebase",
      businessId: "6",
    },
  ];
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [uniqueBusinesses, _] = useState<Business[]>(businesses);

  const filteredItems: Business[] = uniqueBusinesses.filter((e) => {
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
            ? filteredItems
            : [{ businessName: "", businessId: "" }]
        }
      />
    </TView>
  );
}
