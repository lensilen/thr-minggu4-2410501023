import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { THRProvider } from "./src/context/THRContext";
import { ThemeContext, ThemeProvider } from "./src/context/ThemeContext";

import { AddTransactionScreen } from "./src/screens/AddTransactionScreen";
import { HistoryScreen } from "./src/screens/HistoryScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TAB_ICONS = {
  Beranda: "🏠",
  Tambah: "➕",
  Riwayat: "📋",
  Profil: "👤",
};

function HomeTabs() {
  const { colors, isDark } = useContext(ThemeContext);

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.tabBar,
      border: colors.border,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 22 : 18,
                opacity: focused ? 1 : 0.5,
              }}
            >
              {TAB_ICONS[route.name]}
            </Text>
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                fontSize: 10,
                color,
                fontWeight: focused ? "700" : "400",
              }}
            >
              {route.name.toLowerCase()}
            </Text>
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.tabBar,
            borderTopColor: colors.border,
            height: 60,
            paddingBottom: 8,
          },
        })}
      >
        <Tab.Screen name="Beranda" component={HomeStack} />
        <Tab.Screen name="Riwayat" component={HistoryScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function HomeStack() {
  const { colors } = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Tambah" component={AddTransactionScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <THRProvider>
          <HomeTabs />
        </THRProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
