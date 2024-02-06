import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Students = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1, marginLeft: 30 }}>

                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
                <Text style={{ fontSize: 15, marginLeft: 10 }}>{item.email}</Text>
            </View>
        </View>
    )
}

export default Students

const styles = StyleSheet.create({
    container: {
        width: "95%",
        height: 80,
        backgroundColor: "#fff",
        margin: 5,
        alignSelf: "center",
        borderRadius: 12,
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 16,
        position: "absolute",
        left: 10
    },
})