import { Image } from "expo-image";
import { TView } from "../themedComponents/themed-view";
import { Text, TouchableOpacity, View } from "react-native";
import { OrganizationResource, UserResource } from "@clerk/types";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useUpdateBusiness } from "@/convex/mutations";
import { useGetBusiness } from "@/convex/queries";
import { Loader2 } from "lucide-react-native";
type UserImageProps = {
  user: UserResource;
};
export default function UserImageSelector({ user }: UserImageProps) {
  const { data, isLoading, isError, error } = useGetBusiness(user.id);
  const updateBusiness = useUpdateBusiness();
  const [org] = useState<OrganizationResource>(
    user.organizationMemberships[0].organization,
  );

  if (isLoading) {
    return (
      <View>
        <Loader2 className="animate-spin" />
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>There was an error: {String(error)}</Text>
      </View>
    );
  }

  const handleImageSelector = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        const base64 = result.assets[0].base64;
        const mimeType = result.assets[0].mimeType;
        const image = `data:${mimeType};base64,${base64}`;

        await org.setLogo({
          file: image as any,
        });
        await org.reload();
        if (data) {
          updateBusiness.mutate({
            businessName: data.businessName,
            businessId: data.businessId,
            businessLocation: data.businessLocation,
            created_by: data.created_by,
            businessLogo: image,
          });
        }
      }
    } catch (err) {
      console.log("There was an error uploading new image", err);
    }
  };
  return (
    <TView className="w-24 h-24 rounded-full border-4 border-teal-500/30 items-center justify-center bg-teal-800/20 mb-4 ">
      <TouchableOpacity onPress={handleImageSelector}>
        <Image
          source={org.imageUrl}
          className="object-cover rounded-full"
          style={{
            width: 70,
            height: 70,
            borderRadius: 40,
          }}
        />
      </TouchableOpacity>
    </TView>
  );
}
