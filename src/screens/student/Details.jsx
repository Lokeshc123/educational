import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { UserType } from '../../context/UserContext';
import { data, data2 } from '../../data/Data';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Details = ({ item }) => {
    const { selectedCourse, userId } = useContext(UserType);
    const [details, setDetails] = useState({})

    const navigation = useNavigation();
    const handleEnroll = () => {
        const course = { userId, courseId: details.title, title: details.title };
        axios.post('http://192.168.208.128:5000/enroll', course).then((res) => {
            console.log(res.data);
            Alert.alert('Success', 'Enrolled Successfully')
        }
        ).catch((err) => {
            if (err.response && err.response.data) {
                console.log(err.response.data);
                Alert.alert('Error', 'Enroll Failed');
            } else {
                console.log(err);
                Alert.alert('Error', 'An unexpected error occurred');
            }
        });


    };
    useEffect(() => {
        const foundInData = data.find((course) => course.title === selectedCourse);
        const foundInData2 = data2.find((course) => course.title === selectedCourse);

        if (foundInData) {
            setDetails(foundInData);
        }
        else if (foundInData2) {
            setDetails(foundInData2);
        }
        else {
            console.log("Not Found");
        }
    }, [selectedCourse]);
    console.log(details);
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.arrowContainer}>
                <AntDesign name="left" size={28} color="black" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <Image source={{ uri: details.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.txt}>{details.title}</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <AntDesign name="star" size={24} color="#FFD700" />
                    <Text style={styles.ratingtxt}>{details.rating}</Text>
                </View>
            </View>
            <Text style={styles.duration}>Duration : {details.duration}</Text>
            <ScrollView >
                <Text style={styles.description}>{details.description}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.btn} onPress={() => handleEnroll()}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", alignSelf: "center" }}>Enroll Now</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Details

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    arrowContainer: {
        position: "absolute",
        top: 40,
        left: 10,
        zIndex: 1,
        backgroundColor: "white",
        height: 44,
        width: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "35%",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    info: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    ratingtxt: {
        fontSize: 20,
        fontWeight: "bold",
        color: "gray"
    },
    txt: {
        fontSize: 20,
        fontWeight: "bold",
        color: "gray"
    },
    duration: {
        fontSize: 20,
        fontWeight: "bold",
        color: "gray",
        margin: 10
    },
    description: {
        fontSize: 17,
        fontWeight: "bold",
        color: "gray",
        padding: 15,
    },
    btn: {
        width: "90%",
        height: 50,
        backgroundColor: "lightblue",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10
    }
})