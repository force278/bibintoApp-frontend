import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dialogs from "../screens/Dialogs";
import Dialog from "../screens/Dialog";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function MessagesNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "black",
        },
        headerBackImage: ({ tintColor }) => (
          <Ionicons name="chevron-back" size={30} color={tintColor} />
        ),
      }}
    >
      <Stack.Screen name="Dialogs" component={Dialogs} />
      <Stack.Screen name="Dialog" component={Dialog} />
    </Stack.Navigator>
  );
}
