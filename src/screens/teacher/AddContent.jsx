import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../api/firebase';
import { addContent } from '../../api/functions/RegisterFunctions';
import { UserType } from '../../context/UserContext';
import ProgressBar from '../../components/ProgressBar';

const AddContent = () => {
    const { user, selectedCourse } = useContext(UserType);
    const [title, setTitle] = useState("");
    const navigation = useNavigation();
    const [imageUrl, setImageUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            try {

                setUploadingImage(true);


                const response = await fetch(result.assets[0].uri);
                const blob = await response.blob();

                const storageRef = ref(storage, `Stuff/${new Date().getTime()}`);
                const uploadTask = uploadBytesResumable(storageRef, blob);

                uploadTask.on('state_changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setProgress(progress.toFixed(2));

                    if (progress === 100) {

                        setUploadingImage(false);
                    }
                }, (error) => {
                    console.log(error);
                }, async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('File available at', downloadURL);
                        setImageUrl(downloadURL);

                    } catch (error) {
                        console.error('Error getting download URL', error);
                    }
                });
            } catch (error) {
                console.error('Error fetching image', error);
            }
        }
    };
    console.log(selectedCourse);
    const pickVideo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            try {

                setUploadingVideo(true);


                const response = await fetch(result.assets[0].uri);
                const blob = await response.blob();

                const storageRef = ref(storage, `Stuff/${new Date().getTime()}`);
                const uploadTask = uploadBytesResumable(storageRef, blob);

                uploadTask.on('state_changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setProgress(progress.toFixed(2));

                    if (progress === 100) {

                        setUploadingVideo(false);
                    }
                }, (error) => {
                    console.log(error);
                }, async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('File available at', downloadURL);
                        setVideoUrl(downloadURL);

                    } catch (error) {
                        console.error('Error getting download URL', error);
                    }
                });
            } catch (error) {
                console.error('Error fetching image', error);
            }
        }
    };

    const handleSave = async () => {
        const content = {
            title: title,
            thumbnail: imageUrl,
            video: videoUrl
        }
        try {
            const res = await addContent(content, selectedCourse);
            console.log(res);
        }
        catch (error) {
            console.error('Error adding document: ', error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
                <AntDesign name="arrowleft" size={24} color="black" style={styles.icon} onPress={() => navigation.goBack()} />
                <Text style={styles.text}>New Content</Text>
            </View>
            <View style={styles.data} showsVerticalScrollIndicator={false}>
                <View style={styles.datacontainer}>
                    <Text style={styles.label}>Enter Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Course Name'
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />
                </View>
                <View style={{ width: "100%", marginBottom: 10 }}>
                    <Text style={styles.label}>Upload Thumbnail Image</Text>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        {uploadingImage ?
                            (
                                <View style={{ height: 100, width: 300, borderRadius: 16, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>

                                    <ProgressBar progress={progress} />
                                </View>
                            ) :
                            <Image source={{ uri: imageUrl ? "https://png.pngtree.com/png-vector/20230330/ourmid/pngtree-click-the-done-button-and-tick-icon-vector-png-image_6674611.png" : "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg" }}
                                style={{ width: 120, height: 120, alignSelf: "center", borderRadius: 16, }} />}

                        <TouchableOpacity style={{ backgroundColor: "black", padding: 10, width: "25%", alignItems: "center", borderRadius: 5, margin: 10 }} onPress={() => pickImage()}>
                            <Text style={{ color: "white", fontWeight: "bold" }} >Browse</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ width: "100% ", marginBottom: 10 }}>
                    <Text style={styles.label}>Upload Video</Text>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        {uploadingVideo ?
                            (
                                <View style={{ height: 100, width: 300, borderRadius: 16, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>

                                    <ProgressBar progress={progress} />
                                </View>
                            ) :
                            <Image source={{ uri: videoUrl ? "https://png.pngtree.com/png-vector/20230330/ourmid/pngtree-click-the-done-button-and-tick-icon-vector-png-image_6674611.png" : "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg" }}
                                style={{ width: 120, height: 120, alignSelf: "center", borderRadius: 16, }} />}

                        <TouchableOpacity style={{ backgroundColor: "black", padding: 10, width: "25%", alignItems: "center", borderRadius: 5, marginBottom: 10 }} onPress={() => pickVideo()} >
                            <Text style={{ color: "white", fontWeight: "bold" }} >Browse</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <TouchableOpacity style={{ backgroundColor: "black", padding: 10, width: "90%", alignItems: "center", borderRadius: 5, marginBottom: 20 }} onPress={() => handleSave()}>
                <Text style={{ color: "white", fontWeight: "bold" }} >Add Course</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AddContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    heading: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
        marginTop: 15
    },
    icon: {
        marginRight: 10
    },
    text: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 100,
    },
    data: {
        width: "90%",
        height: "80%",

        marginTop: 80
    },
    datacontainer: {
        width: "100%",
        height: "15%",
        marginBottom: 10,
    },
    label: {
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 20
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        borderRadius: 12,
    }
})