import { Image } from "expo-image";
import { TView } from "../themedComponents/themed-view";
import { TouchableOpacity } from "react-native";
import { OrganizationResource, UserResource } from "@clerk/types";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
type UserImageProps = {
  user: UserResource;
};
export default function UserImageSelector({ user }: UserImageProps) {
  const [org] = useState<OrganizationResource>(
    user.organizationMemberships[0].organization,
  );

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

        await org.setLogo({
          file: image as any,
        });
        await org.reload();
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
