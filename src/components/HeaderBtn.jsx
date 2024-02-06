import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HeaderBtn = (props) => {
    const navigation = useNavigation();
    const handlePress = async () => {
        if (props.function === "ProfileScreen") {
            navigation.navigate("Profile");
        }
        if (props.function === "logout") {
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('role');
            await AsyncStorage.removeItem('userData');
            navigation.navigate("LoginScreen");
        }
    }
    return (
        <TouchableOpacity style={styles.btn} onPress={() => handlePress()}>
            <AntDesign name={props.name} size={24} color="white" />
        </TouchableOpacity>
    )
}

export default HeaderBtn

const styles = StyleSheet.create({
    btn: {
        height: 45,
        width: 45,
        borderRadius: 15,
        backgroundColor: "#414754",
        justifyContent: "center",
        alignItems: "center"
    }
})