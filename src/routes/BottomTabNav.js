import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import PawScreen from "../screens/PawScreen";
import SettingsScreen from "../screens/SettingsScreen";

const BottomTab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: -16,
          },
          shadowOpacity: 0.05,
          shadowRadius: 70,
          backgroundColor: "#FFFFFF",
          height: 62,
          alignItems: "center",
        },
        tabBarButton: ({ children, onPress }) => (
          <TouchableOpacity
            onPress={onPress}
            disabled={true}
            style={{ flex: 1 }}
          >
            {children}
          </TouchableOpacity>
        ),
      }}
    >
      <BottomTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../../assets/icons/homeActive.png")
                  : require("../../assets/icons/home.png")
              }
              fadeDuration={0}
              style={{
                width: 28.24,
                height: 26.39,
              }}
            />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <BottomTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("../../assets/icons/calendar.png")}
              fadeDuration={0}
              style={{
                width: 22,
                height: 24.45,
              }}
            />
          ),
        }}
        name="Calendar"
        component={CalendarScreen}
      />
      <BottomTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("../../assets/icons/pawprint.png")}
              fadeDuration={0}
              style={{
                width: 26.48,
                height: 24,
              }}
            />
          ),
        }}
        name="Paw"
        component={PawScreen}
      />
      <BottomTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("../../assets/icons/setting.png")}
              fadeDuration={0}
              style={{
                width: 21.28,
                height: 23,
              }}
            />
          ),
        }}
        name="Settings"
        component={SettingsScreen}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNav;
