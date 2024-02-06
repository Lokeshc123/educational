import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import { UserType } from '../../context/UserContext'
import { getStudentCourses } from '../../api/functions/GetData'
import Enrolled from '../../components/Enrolled'
const EnrolledCourse = () => {
    const fetchCourses = async () => {
        try {
            const response = await getStudentCourses(user._id);
            setEnrolledCourses(response);
        } catch (err) {
            console.log(err);
        }
    };
    const { user } = useContext(UserType);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        fetchCourses();

    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.courses}>
                <Text style={styles.txt}>EnrolledCourse</Text>
                <FlatList
                    data={enrolledCourses}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <Enrolled item={item} />}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            tintColor="black"
                            onRefresh={() => fetchCourses()}

                        />
                    }
                />
            </View>
        </SafeAreaView>
    )
}

export default EnrolledCourse

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    courses: {
        width: "100%",
        padding: 10,
        height: "90%",

    },
    txt: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 10
    }
})