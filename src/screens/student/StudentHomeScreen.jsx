import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from "../../components/Header"
import Course from '../../components/Course'
import ExtraCourses from '../../components/ExtraCourses'

import { UserType } from '../../context/UserContext'

import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getCourses } from '../../api/functions/GetData'
const StudentHomeScreen = () => {
    const { setUser } = useContext(UserType);
    const [courses, setCourses] = useState([]);
    const [trendingCourses, setTrendingCourses] = useState([]);
    const [extraCourses, setExtraCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const getUserId = async () => {
                    try {
                        const token = await AsyncStorage.getItem('authToken');
                        const decodedToken = jwt_decode(token);
                        return decodedToken.userId;
                    } catch (error) {
                        console.log(error);
                        return null;
                    }
                };

                const userId = await getUserId();

                if (userId) {
                    const storedUserData = await AsyncStorage.getItem('userData');
                    if (storedUserData) {
                        const parsedUserData = JSON.parse(storedUserData);
                        setUser(parsedUserData);
                    }

                    const response = await getCourses();
                    setCourses(response);

                    const trendingCourses = response.filter((course) => course.rating > 4.3);
                    setTrendingCourses(trendingCourses);

                    const extraCourses = response.filter((course) => course.rating <= 4.3);
                    setExtraCourses(extraCourses);
                }

                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [setUser]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.courses}>
                <Text style={styles.courseTxt}>Trending Course</Text>
                <FlatList
                    data={trendingCourses}
                    renderItem={({ item }) => <Course item={item} />}
                    keyExtractor={item => item._id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={styles.extracourses}>
                <Text style={styles.courseTxt}>You might also like</Text>
                <FlatList
                    data={extraCourses}
                    renderItem={({ item }) => <ExtraCourses item={item} />}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}

                />
            </View>
        </SafeAreaView>
    )
}

export default StudentHomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    courses: {
        width: "100%",
        height: "33%",

    },
    courseTxt: {
        fontSize: 22,
        fontWeight: 'bold',
        margin: 10
    },
    extracourses: {
        width: "100%",
        height: "60%",


    }
})