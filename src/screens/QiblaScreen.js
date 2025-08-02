import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CompassHeading from "react-native-compass-heading";

export default function QiblaScreen() {
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    const degree_update_rate = 3; // in degrees
    CompassHeading.start(degree_update_rate, ({ heading, accuracy }) => {
      setHeading(heading);
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  const qiblaDirection = 293.07; // Example for Mecca direction, adjust dynamically if needed
  const directionToQibla = (qiblaDirection - heading + 360) % 360;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Qibla Direction</Text>
      <Text style={{ fontSize: 18 }}>Rotate device until arrow points to Qibla</Text>
      <Text style={{ fontSize: 30, marginTop: 30 }}>{Math.round(directionToQibla)}°</Text>
    </View>
  );
}
