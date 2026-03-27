import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";

const demoBusinesses = [
  {
    id: "1",
    name: "Eastern Market Farm Stand",
    latitude: 42.3489,
    longitude: -83.0418,
  },
  {
    id: "2",
    name: "Detroit Urban Greens",
    latitude: 42.3314,
    longitude: -83.0458,
  },
  {
    id: "3",
    name: "Midtown Fresh Co-op",
    latitude: 42.3398,
    longitude: -83.0517,
  },
];

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 42.339,
          longitude: -83.046,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {demoBusinesses.map((business) => (
          <Marker
            key={business.id}
            coordinate={{
              latitude: business.latitude,
              longitude: business.longitude,
            }}
            title={business.name}
          />
        ))}
      </MapView>
    </View>
  );
}
