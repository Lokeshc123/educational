import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StudentHomeScreen from "../screens/student/StudentHomeScreen";
import EnrolledCourse from "../screens/student/EnrolledCourse";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const BottomTabsStudent = () => {
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
        component={StudentHomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Entypo name="home" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Courses"
        component={EnrolledCourse}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Entypo name="open-book" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsStudent;

const styles = StyleSheet.create({});
