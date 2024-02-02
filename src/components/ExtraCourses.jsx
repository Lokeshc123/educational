import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { UserType } from '../context/UserContext'
import { useNavigation } from '@react-navigation/native';

const ExtraCourses = ({ item }) => {
    const { selectedCourse, setSelectedCourse } = useContext(UserType);
    const navigation = useNavigation();
    const handlePress = () => {
        setSelectedCourse(item.title)
        navigation.navigate("Details", { item: item });
    }
    return (
        <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View >
                <Text style={styles.txt}>{item.title}</Text>
                <Text style={{ color: "gray", alignSelf: "center", fontSize: 15 }}>{item.duration}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ExtraCourses

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 80,
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 16,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 16,
        position: "absolute",
        left: 10
    },
    txt: {
        fontSize: 16,
        fontWeight: 'bold',


    }
})