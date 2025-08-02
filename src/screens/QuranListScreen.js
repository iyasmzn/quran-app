import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { getSurahList } from "../api/quran";

export default function QuranListScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getSurahList();
      setSurahs(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <FlatList
      data={surahs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("QuranDetail", { id: item.id, name: item.name_arabic })}>
          <View style={{ padding: 15, borderBottomWidth: 1, borderColor: "#ddd" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name_simple}</Text>
            <Text style={{ color: "#555" }}>{item.name_arabic}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
