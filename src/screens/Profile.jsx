import { Image, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

const Profile = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("Lokesh Chauhan");
    const [value, setValue] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <AntDesign name="arrowleft" size={30} color="white" style={styles.icon} onPress={() => navigation.goBack()} />
                    <Text style={styles.txt}>Profile</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", top: -80 }}>
                <View style={styles.circle}>

                </View>
                <View style={styles.circle}>

                </View>
            </View>
            <View style={styles.image}>
                <Image source={{ uri: "https://img.freepik.com/free-photo/man-smiling-with-hands-hips_1187-3017.jpg" }} style={{ width: 168, height: 168, borderRadius: 84 }} />
                <View style={styles.editIcon}>
                    <Entypo name="edit" size={24} color="#077cff" />
                </View>
            </View>
            <View style={{ height: "10%", width: "100%", top: -300, zIndex: 5, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>Lokesh Chauhan</Text>
            </View>
            <View style={styles.data}>
                <TextInput
                    placeholder={name}
                    style={styles.input}
                    editable={false}
                    placeholderTextColor={
                        "gray"
                    }
                />
                <View style={{ justifyContent: "space-between", flexDirection: "row", width: "90%", paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 20, margin: 6 }}>Role</Text>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: "row", margin: 5 }}>

                            <Checkbox
                                style={{ alignSelf: "center" }}
                                value={value}
                                onValueChange={() => { setValue(!value) }}
                                color="#077cff"

                            />
                            <Text style={{ fontSize: 15, margin: 5 }}>Student</Text>
                        </View>
                        <View style={{ flexDirection: "row", margin: 5 }}>

                            <Checkbox
                                style={{ alignSelf: "center" }}
                                value={!value}
                                onValueChange={() => { setValue(!value) }}
                                color="#077cff"

                            />
                            <Text style={{ fontSize: 15, margin: 5 }}>Teacher</Text>
                        </View>
                    </View>
                </View>
                <TextInput
                    placeholder="Joined Since :    20th July 2021"
                    style={styles.input}
                    editable={false}
                    placeholderTextColor={
                        "gray"
                    }
                />
                <TextInput
                    placeholder="Joined Since :    20th July 2021"
                    style={styles.input}
                    editable={false}
                    placeholderTextColor={
                        "gray"
                    }
                />
                <TextInput
                    placeholder="Joined Since :    20th July 2021"
                    editable={false}
                    style={styles.input}
                    placeholderTextColor={
                        "gray"
                    }
                />
            </View>
            <TouchableOpacity style={styles.button}>
                <Text>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
    },
    header: {
        width: "100%",
        height: "35%",
        backgroundColor: "#077cff",
        alignItems: "center",
        padding: 10
    },
    headerContent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    icon: {
        position: "absolute",
        left: 10
    },
    txt: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
    },
    circle: {
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: "white",
        zIndex: 1,
    },
    image: {
        borderRadius: 100,
        position: "absolute",
        top: 120,
        zIndex: 3,
        alignSelf: "center"
    },
    editIcon: {
        position: "absolute",
        bottom: 20,
        right: 0,
        borderWidth: 1,
        borderColor: "#077cff",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 4
    },
    data: {
        width: "90%",
        height: "45%",
        alignItems: "center",
        top: -300,
        zIndex: 7
    },
    input: {
        width: "90%",
        paddingHorizontal: 20,
        height: 60,
        backgroundColor: "#f5f5f5",
        borderRadius: 16,

        margin: 10,
        fontSize: 20

    },
    button: {
        width: "90%",
        height: 50,
        backgroundColor: "#077cff",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        top: -285
    }
})