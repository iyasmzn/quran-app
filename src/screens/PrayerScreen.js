import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { getPrayerTimes } from "../api/prayer";

export default function PrayerScreen() {
  const [loading, setLoading] = useState(true);
  const [prayers, setPrayers] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission is required to get prayer times");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      const data = await getPrayerTimes(loc.coords.latitude, loc.coords.longitude);
      setPrayers(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  const prayerArray = Object.entries(prayers);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>Prayer Times</Text>
      <FlatList
        data={prayerArray}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
            <Text style={{ fontSize: 16 }}>{item[0]}</Text>
            <Text style={{ fontSize: 16 }}>{item[1]}</Text>
          </View>
        )}
      />
    </View>
  );
}
