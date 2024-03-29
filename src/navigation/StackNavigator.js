import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import OnboardingScreen from "../screens/Onboarding";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { UserType } from "../context/UserContext";
import StudentHomeScreen from "../screens/student/StudentHomeScreen";
import TeacherHomeScreen from "../screens/teacher/TeacherHomeScreen";
import Details from "../screens/student/Details";
import Profile from "../screens/Profile";
import NewCourse from "../screens/teacher/NewCourse";
import BottomTabsTeacher from "./BottomTabsTeacher";
import BottomTabsStudent from "./BottomTabsStudent";
import AddContent from "../screens/teacher/AddContent";
import CourseContent from "../screens/student/CourseContent";

import VideoPlayer from "../screens/student/VideoPlayer";
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Root-Teacher"
          component={BottomTabsTeacher}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Root-Student"
          component={BottomTabsStudent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StudentHomeScreen"
          component={StudentHomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TeacherHomeScreen"
          component={TeacherHomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewCourse"
          component={NewCourse}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddContent"
          component={AddContent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Video"
          component={VideoPlayer}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CourseContent"
          component={CourseContent}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
