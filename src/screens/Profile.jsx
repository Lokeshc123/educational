import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { BlurView } from 'expo-blur';
import { storage } from '../api/firebase';
import { updateProfilePic } from '../api/functions/UpdateData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '../context/UserContext';
const Profile = () => {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [blurVisible, setBlurVisible] = useState(false);
    const { user } = useContext(UserType);
    const navigation = useNavigation();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            try {

                setUploading(true);
                setBlurVisible(true);

                const response = await fetch(result.assets[0].uri);
                const blob = await response.blob();

                const storageRef = ref(storage, `Stuff/${new Date().getTime()}`);
                const uploadTask = uploadBytesResumable(storageRef, blob);

                uploadTask.on('state_changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setProgress(progress.toFixed(2));

                    if (progress === 100) {
                        setBlurVisible(false);
                        setUploading(false);
                    }
                }, (error) => {
                    console.log(error);
                }, async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('File available at', downloadURL);
                        updateDatabase(downloadURL);
                    } catch (error) {
                        console.error('Error getting download URL', error);
                    }
                });
            } catch (error) {
                console.error('Error fetching image', error);
            }
        }
    };

    const updateDatabase = async (url) => {
        try {
            const res = await updateProfilePic(user._id, url);
            console.log(res);
            const updatedUserData = { ...user, image: url };
            await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
            setImage(url);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <AntDesign name="arrowleft" size={30} color="white" style={styles.icon} onPress={() => navigation.goBack()} />
                    <Text style={styles.txt}>Profile</Text>
                </View>
            </View>
            <View style={styles.circleContainer}>
                <View style={styles.circle}></View>
                <View style={styles.circle}></View>
            </View>
            <View style={styles.imageContainer}>
                <Image source={{ uri: image ? image : user.image }} style={styles.profileImage} />
                <View style={styles.editIcon}>
                    <Entypo name="edit" size={24} color="#077cff" onPress={() => pickImage()} />
                </View>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{user.name}</Text>
            </View>
            <View style={styles.data}>


                <TextInput
                    placeholder={user.name}
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
                                value={user.role === "student"}

                                color="#077cff"
                            />
                            <Text style={{ fontSize: 15, margin: 5 }}>Student</Text>
                        </View>
                        <View style={{ flexDirection: "row", margin: 5 }}>
                            <Checkbox
                                style={{ alignSelf: "center" }}
                                value={user.role === "teacher"}

                                color="#077cff"
                            />
                            <Text style={{ fontSize: 15, margin: 5 }}>Teacher</Text>
                        </View>
                    </View>
                </View>
                <TextInput
                    placeholder={`Joined Since :  ${user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}`}
                    style={styles.input}
                    editable={false}
                    placeholderTextColor={
                        "gray"
                    }
                />
                <TextInput
                    placeholder={user.email}
                    style={styles.input}
                    editable={false}
                    placeholderTextColor={
                        "gray"
                    }
                />
                <TextInput
                    placeholder="Password"
                    editable={false}
                    style={styles.input}
                    placeholderTextColor={
                        "gray"
                    }
                />

            </View>
            <TouchableOpacity style={styles.button} onPress={() => console.log('Save pressed')}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

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
    circleContainer: {
        flexDirection: "row",
        top: -80,
    },
    circle: {
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: "white",
        zIndex: 1,
    },
    imageContainer: {
        borderRadius: 100,
        position: "absolute",
        top: 120,
        zIndex: 3,
        alignSelf: "center"
    },
    profileImage: {
        width: 168,
        height: 168,
        borderRadius: 84
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
    nameContainer: {
        height: "10%",
        width: "100%",
        top: -300,
        zIndex: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    nameText: {
        fontSize: 25,
        fontWeight: "bold"
    },
    data: {
        width: "90%",
        height: "45%",
        alignItems: "center",
        top: -300,
        zIndex: 7
    },
    blurContainer: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
        backgroundColor: "#000",
        opacity: 0.5,
        zIndex: 5
    },
    blurImage: {
        width: "100%",
        height: "100%",
        borderRadius: 20
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
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    }
});

export default Profile;
