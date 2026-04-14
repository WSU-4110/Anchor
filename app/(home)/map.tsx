import PublicBusinessAccount from "@/components/businessComponents/publicBusinessAccount";
import { useGetAllBusinesses, useGetUser } from "@/convex/queries";
import { Business } from "@/constants/types";
import MapView, { Marker } from "react-native-maps";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useMemo, useState } from "react";

type FilterType = "all" | "following" | "not_following";

export default function MapScreen() {
  const { data: businesses, isLoading } = useGetAllBusinesses();
  const { data: currentUser } = useGetUser();

  const [open, setOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null,
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredBusinesses = useMemo(() => {
    if (!businesses) return [];

    if (!currentUser || filter === "all") return businesses;

    if (filter === "following") {
      return businesses.filter((business) =>
        currentUser.following.includes(business.businessName),
      );
    }

    return businesses.filter(
      (business) => !currentUser.following.includes(business.businessName),
    );
  }, [businesses, currentUser, filter]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.filterWrapper}>
        <Pressable
          style={styles.filterButton}
          onPress={() => setFilterOpen(!filterOpen)}
        >
          <Text style={styles.filterButtonText}>
            {filter === "all"
              ? "All Businesses"
              : filter === "following"
                ? "Following"
                : "Not Following"}
          </Text>
        </Pressable>

        {filterOpen && (
          <View style={styles.dropdown}>
            <Pressable
              style={styles.dropdownItem}
              onPress={() => {
                setFilter("all");
                setFilterOpen(false);
              }}
            >
              <Text>All Businesses</Text>
            </Pressable>

            <Pressable
              style={styles.dropdownItem}
              onPress={() => {
                setFilter("following");
                setFilterOpen(false);
              }}
            >
              <Text>Following</Text>
            </Pressable>

            <Pressable
              style={styles.dropdownItem}
              onPress={() => {
                setFilter("not_following");
                setFilterOpen(false);
              }}
            >
              <Text>Not Following</Text>
            </Pressable>
          </View>
        )}
      </View>

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 42.339,
          longitude: -83.046,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {!isLoading &&
          filteredBusinesses.map((business) => {
            const [latStr, lngStr] = business.businessLocation
              .split(",")
              .map((value) => value.trim());

            const latitude = Number.parseFloat(latStr);
            const longitude = Number.parseFloat(lngStr);

            if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
              return null;
            }

            return (
              <Marker
                key={business.businessId}
                coordinate={{
                  latitude,
                  longitude,
                }}
                title={business.businessName}
                onPress={() => {
                  setSelectedBusiness(business);
                  setOpen(true);
                }}
              >
                <View style={styles.markerContainer}>
                  <Image
                    source={require("../../assets/images/logo.png")}
                    style={styles.markerImage}
                  />
                </View>
              </Marker>
            );
          })}
      </MapView>

      {currentUser && selectedBusiness && (
        <PublicBusinessAccount
          userId={currentUser.clerkUserId}
          userFollowing={currentUser.following}
          userView={true}
          open={open}
          setOpen={setOpen}
          business={selectedBusiness}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  filterWrapper: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    zIndex: 20,
  },
  filterButton: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  filterButtonText: {
    fontWeight: "600",
  },
  dropdown: {
    marginTop: 6,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    overflow: "hidden",
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  markerContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4a7c59",
    padding: 6,
  },
  markerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
