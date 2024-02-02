import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { UserType } from '../../context/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { data, student } from '../../data/Data';
import Course from '../../components/Course';
import Students from '../../components/Students';

const TeacherHomeScreen = () => {
    const { role } = useContext(UserType);
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.courses}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Courses</Text>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Course item={item} />}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={styles.enrolled}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Student's enrolled</Text>
                <FlatList
                    data={student}
                    renderItem={({ item }) => <Students item={item} />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />

            </View>
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