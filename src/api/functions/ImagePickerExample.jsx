import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import { storage } from '../firebase';


export default function ImagePickerExample() {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            await upload(result.assets[0].uri, result.assets[0].type);
        }

    };
    const upload = async (uri, fileType) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = ref(storage, "Stuff/" + new Date().getTime());
        const UploadTask = uploadBytesResumable(storageRef, blob);

        // listen for events
        UploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setProgress(progress.toFixed(2));
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        }, (error) => {
            console.log(error);
        }, () => {
            getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);

            });
        });
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}
