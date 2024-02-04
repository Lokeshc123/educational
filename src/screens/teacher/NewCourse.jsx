import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { registerCourse } from '../../api/functions/RegisterFunctions';
import { UserType } from '../../context/UserContext';

const NewCourse = () => {
    const navigation = useNavigation();
    const [courseName, setCourseName] = useState("");
    const [taughtBy, setTaughtBy] = useState("");
    const [courseImage, setCourseImage] = useState("");
    const [duration, setDuration] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const { user } = useContext(UserType);
    const [rating, setRating] = useState(0);
    console.log(user._id);
    const handleSave = async () => {
        const newCourse = {
            teacherId: user._id,
            title: courseName,
            rating,
            courseImage,
            duration,
            price,
            description
        }
        let result = 0;
        try {
            result = await registerCourse(newCourse);
            if (result === 1) {
                navigation.navigate("TeacherHomeScreen");
            }

        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
                <AntDesign name="arrowleft" size={24} color="black" style={styles.icon} onPress={() => navigation.goBack()} />
                <Text style={styles.text}>New Courses</Text>
            </View>
            <ScrollView style={styles.data} showsVerticalScrollIndicator={false}>
                <View style={styles.datacontainer}>
                    <Text style={styles.label}>Course Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Course Name'
                        value={courseName}
                        onChangeText={(text) => setCourseName(text)}
                    />
                </View>
                {/* <View style={styles.datacontainer}>
                    <Text style={styles.label}>Taught By</Text>
                    <TextInput
                        style={styles.input}

                        value={taughtBy}
                        onChangeText={(text) => setTaughtBy(text)}
                    />
                </View> */}
                <View style={styles.datacontainer}>
                    <Text style={styles.label}>Rating</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Course Rating'
                        value={rating}
                        keyboardType='numeric'
                        onChangeText={(text) => setRating(text)}
                    />
                </View>

                <View style={styles.datacontainer}>
                    <Text style={styles.label}>Course Image</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Image URL'
                        value={courseImage}
                        onChangeText={(text) => setCourseImage(text)}
                    />
                </View>
                <View style={styles.datacontainer}>
                    <Text style={styles.label}>Duration</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Course Duration'
                        value={duration}
                        onChangeText={(text) => setDuration(text)}
                    />
                </View>
                <View style={styles.datacontainer}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Course Description'
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>
                <View style={styles.datacontainer}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Course Price'
                        value={price}
                        keyboardType='numeric'
                        onChangeText={(text) => setPrice(text)}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity style={{ backgroundColor: "black", padding: 10, width: "90%", alignItems: "center", borderRadius: 5, marginBottom: 20 }} onPress={() => handleSave()}>
                <Text style={{ color: "white", fontWeight: "bold" }} >Add Course</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default NewCourse

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
        marginBottom: 5,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        borderRadius: 12,
    }
})