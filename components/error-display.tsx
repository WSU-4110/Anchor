import { Dispatch, SetStateAction } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { TText } from "./themedComponents/themed-text";

type ErrorDisplayProps = {
  errorMessage: string;
  onClose: boolean;
  setOnClose: Dispatch<SetStateAction<boolean>>;
};

export default function ErrorDisplay({
  errorMessage,
  onClose,
  setOnClose,
}: ErrorDisplayProps) {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={onClose}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setOnClose(!onClose);
        }}
      >
        <View className="flex-1 pt-24 px-8 items-center justify-center border-1 border-black rounded-3xl w-auto">
          <View className="p-5 rounded-3xl bg-black/10 border border-white/15 bg-white">
            <TText type="secondary">{errorMessage}</TText>
            <View className="flex flex-row gap-2 items-center justify-center pt-4">
              <TouchableOpacity
                onPress={() => {
                  setOnClose(!onClose);
                }}
                className="flex-row items-center justify-between p-5 rounded-2xl bg-blue-600 border border-blue-900/20"
              >
                <View className="flex-row items-center gap-3 bg-none w-full ">
                  <Text className="text-blue-200 font-medium">Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
