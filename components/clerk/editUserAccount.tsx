import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";

export default function EditUserAccount() {
  const { user, isLoaded } = useUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
    }
  }, [user?.firstName, user?.lastName, user]);

  const clearForm = () => {
    setFirstName(user?.firstName ?? "");
    setLastName(user?.lastName ?? "");
  };

  const handleUpdateProfile = async () => {
    if (!isLoaded || !user) {
      Alert.alert("Not ready", "User data is still loading.");
      return;
    }

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (!trimmedFirstName || !trimmedLastName) {
      Alert.alert("Missing info", "Please enter both first and last name.");
      return;
    }

    try {
      setIsSaving(true);

      await user.update({
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
      });

      await user.reload();

      setFirstName(trimmedFirstName);
      setLastName(trimmedLastName);

      Alert.alert("Success", "Your profile has been updated.");
    } catch (err) {
      console.error("There was an error updating the user profile:", err);
      Alert.alert("Update failed", "There was an error updating your profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded || !user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Personal Profile</Text>

      <Text style={styles.label}>First Name</Text>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First name"
        autoCapitalize="words"
        style={styles.input}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last name"
        autoCapitalize="words"
        style={styles.input}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={clearForm}
          disabled={isSaving}
        >
          <Text style={styles.secondaryButtonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.primaryButton,
            isSaving && styles.disabledButton,
          ]}
          onPress={handleUpdateProfile}
          disabled={isSaving}
        >
          <Text style={styles.primaryButtonText}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#111",
  },
  secondaryButton: {
    backgroundColor: "#f1f1f1",
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryButtonText: {
    color: "#111",
    fontWeight: "700",
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
});