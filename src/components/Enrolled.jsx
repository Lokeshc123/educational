import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { UserType } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const Enrolled = ({ item }) => {
    const { setSelectedCourse, selectedCourse } = useContext(UserType);
    const navigation = useNavigation();
    const handlePress = () => {
        setSelectedCourse(item._id);
        navigation.navigate("CourseContent");
    }
    return (
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => handlePress()}>
            <View style={styles.container}>

                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ flexDirection: "row", width: " 100%", justifyContent: "space-between", paddingHorizontal: 10 }}>

                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "gray" }}>{item.title}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <AntDesign name="star" size={22} color="#FFD700" />
                        <Text style={{ color: "gray" }}>{item.rating}</Text>
                    </View>
                </View>

            </View >
        </TouchableOpacity>
    )
}

export default Enrolled

const styles = StyleSheet.create({
    container: {
        height: 250,
        width: 350,
        backgroundColor: "#fff",
        margin: 10,
        marginBottom: 20,
        borderRadius: 10,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 10,

    }
})