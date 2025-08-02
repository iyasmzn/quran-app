import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Switch, Text, View } from "react-native";
import { getSurahDetail } from "../api/quran";

export default function QuranDetailScreen({ route }) {
  const { id, name } = route.params;
  const [loading, setLoading] = useState(true);
  const [showTranslit, setShowTranslit] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getSurahDetail(id);
      const merged = data.arabic.map((v, i) => ({
        arabic: v.text_uthmani,
        translit: data.transliteration[i].text,
        translation: data.translation[i].text
      }));
      setVerses(merged);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <ScrollView style={{ padding: 15 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
        <Text>Transliteration</Text>
        <Switch value={showTranslit} onValueChange={setShowTranslit} />
        <Text>Translation</Text>
        <Switch value={showTranslation} onValueChange={setShowTranslation} />
      </View>

      {verses.map((v, idx) => (
        <View key={idx} style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 22, textAlign: "right" }}>{v.arabic}</Text>
          {showTranslit && <Text style={{ fontSize: 14, color: "#888" }}>{v.translit}</Text>}
          {showTranslation && <Text style={{ fontSize: 16 }}>{v.translation}</Text>}
        </View>
      ))}
    </ScrollView>
  );
}
