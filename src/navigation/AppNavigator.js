import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PrayerScreen from "../screens/PrayerScreen";
import QiblaScreen from "../screens/QiblaScreen";
import QuranDetailScreen from "../screens/QuranDetailScreen";
import QuranListScreen from "../screens/QuranListScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function QuranStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="QuranList" component={QuranListScreen} options={{ title: "Surah List" }} />
      <Stack.Screen name="QuranDetail" component={QuranDetailScreen} options={{ title: "Surah Detail" }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Quran" component={QuranStack} options={{ headerShown: false }} />
        <Tab.Screen name="Prayer" component={PrayerScreen} />
        <Tab.Screen name="Qibla" component={QiblaScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
