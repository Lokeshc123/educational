import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../../context/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';

import Course from '../../components/Course';
import Students from '../../components/Students';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEnrolledStudents, getTeacherCourses } from '../../api/functions/GetData';


const TeacherHomeScreen = () => {
    const { role, user, setUser } = useContext(UserType);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [student, setStudent] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchUserData = async () => {

            try {
                setLoading(true);
                const storedUserData = await AsyncStorage.getItem('userData');
                if (storedUserData) {
                    const parsedUserData = JSON.parse(storedUserData);
                    setUser(parsedUserData);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (!user || !user._id) {
                    console.log("User or user._id is undefined");
                    return;
                }

                const response = await getTeacherCourses(user._id);
                const stu = await getEnrolledStudents(user._id);

                setStudent(stu);
                setData(response);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [user]);
    console.log(student);


    return (
        <SafeAreaView style={styles.container}>
            <Header />
            {loading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            ) : (
                <>
                    <View style={styles.courses}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Your Courses</Text>
                            <Entypo name="circle-with-plus" size={30} color="black" onPress={() => navigation.navigate("NewCourse")} />
                        </View>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <Course item={item} />}
                            keyExtractor={item => item._id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.enrolled}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Student's enrolled</Text>
                        <FlatList
                            data={student}
                            renderItem={({ item }) => <Students item={item} />}
                            keyExtractor={item => item._id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />

                    </View>
                </>
            )}
        </SafeAreaView>
    )
}

export default TeacherHomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",

    },
    courses: {
        width: "100%",
        height: "30%",
        padding: 5
    },
    enrolled: {
        width: "90%",
        height: "60%"
    }
})