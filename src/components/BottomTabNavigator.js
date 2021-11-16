import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Decks from "./Decks";
import AddDeck from "./AddDeck";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Decks"
      screenOptions={{
        tabBarActiveTintColor: "#ff5e00",
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Decks"
        component={Decks}
        options={{
          tabBarLabel: "Decks",
          headerStyle: {
            backgroundColor: "#F5DEB3",
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowColor: "#000",
          },
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="folder1"
                size={22}
                color={focused ? "#ff5e00" : "grey"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Add Deck"
        component={AddDeck}
        options={{
          tabBarLabel: "Add Deck",
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="addfolder"
                size={22}
                color={focused ? "#ff5e00" : "grey"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    marginTop: -5,
    marginBottom: 5,
    fontSize: 11,
  },
});