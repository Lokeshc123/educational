import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Students = () => {
    return (
        <View style={styles.container}>
            <Text>Students</Text>
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
        padding: 5
    }
})