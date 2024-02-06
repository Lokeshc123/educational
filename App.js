import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./src/navigation/StackNavigator";
import { UserContext } from "./src/context/UserContext";
import { LogBox } from "react-native";
export default function App() {
  LogBox.ignoreLogs(["new NativeEventEmitter()"]);
  return (
    <UserContext>
      <StackNavigator />
    </UserContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
