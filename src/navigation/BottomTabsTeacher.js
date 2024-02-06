import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TeacherHomeScreen from "../screens/teacher/TeacherHomeScreen";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Stats from "../screens/teacher/Stats";
const BottomTabsTeacher = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={TeacherHomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Entypo name="home" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="stats-chart"
              size={focused ? 30 : 25}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsTeacher;

const styles = StyleSheet.create({});
