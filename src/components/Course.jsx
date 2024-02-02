import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { UserContext, UserType } from '../context/UserContext'
import { useNavigation } from '@react-navigation/native';

const Course = ({ item }) => {
    const { setSelectedCourse, selectedCourse } = useContext(UserType);
    const navigation = useNavigation();
    const handlePress = () => {
        setSelectedCourse(item.title)
        navigation.navigate("Details", { item: item });
    }
    return (

        <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 10, alignSelf: "center" }}>{item.title}</Text>
        </TouchableOpacity>
    )
}

export default Course

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,

        margin: 10,
        borderRadius: 16
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 16,

    }
})