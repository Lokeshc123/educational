import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const Content = ({ item }) => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate("Video", { video: item.video });
    }
    return (
        <TouchableOpacity style={{ margin: 10 }} onPress={() => handlePress()}>
            <View style={styles.container}>
                <Image source={{ uri: item.thumbnail }} style={{ width: "100%", height: "100%", borderRadius: 10 }} />
                <Text style={{ fontSize: 15, fontWeight: "bold", alignSelf: "center" }}>{item.title}</Text>

            </View>
        </TouchableOpacity>
    )
}

export default Content

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 100,

        marginBottom: 20,
        borderRadius: 10,

    }
})