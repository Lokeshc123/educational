import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const VideoPlayer = ({ route }) => {
    const { video } = route.params;
    const videoRef = useRef(null);
    const navigation = useNavigation();
    const [status, setStatus] = useState({});
    const [orientationIsLandscape, setOrientationIsLandscape] = useState(false);

    useEffect(() => {
        const setInitialOrientation = async () => {
            const initialOrientation = await ScreenOrientation.getOrientationAsync();
            setOrientationIsLandscape(initialOrientation === ScreenOrientation.Orientation.LANDSCAPE);
        };

        setInitialOrientation();
    }, []);

    const changeOrientation = async () => {
        try {
            if (orientationIsLandscape) {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
            } else {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
            }

            console.log('Orientation changed successfully');
        } catch (error) {
            console.error('Error changing orientation:', error.message);
        }
    };

    const toggleOrientation = () => {
        setOrientationIsLandscape(!orientationIsLandscape);
        changeOrientation();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
                <AntDesign name="arrowleft" size={24} color="black" style={styles.icon} onPress={() => navigation.goBack()} />
                <Text style={styles.text}>New Content</Text>
            </View>
            <View style={{ height: "80%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                <Video
                    ref={videoRef}
                    style={styles.video}
                    source={{
                        uri: video,
                    }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    onPlaybackStatusUpdate={(newStatus) => setStatus(() => newStatus)}
                />
            </View>


            <TouchableOpacity onPress={toggleOrientation} style={styles.btn}>
                <Text>Change Orientation</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default VideoPlayer;

const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    video: {
        width: '80%',
        height: '50%',
    },
    btn: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'lightblue',
    },
    heading: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,

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
});
