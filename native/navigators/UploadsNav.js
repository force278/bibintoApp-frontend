import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadsNav() {
  return (
    <Tabs.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: {
          backgroundColor: "white",
          top: 0,
        },
      }}
    >
      <Tabs.Screen
        name="Take"
        options={{ title: "Сделать фото" }}
        component={TakePhoto}
      />
      <Tabs.Screen name="Select" options={{ title: "Выбрать фото" }}>
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerBackTitleVisible: false,
              headerTintColor: "white",
              headerBackImage: ({ tintColor }) => (
                <Ionicons color={tintColor} name="close" size={28} />
              ),
              headerStyle: {
                backgroundColor: "black",
                shadowOpacity: 0.3,
              },
            }}
          >
            <Stack.Screen
              options={{ title: "Выбрать фото" }}
              name="Select"
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
