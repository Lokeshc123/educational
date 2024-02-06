import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { getCourseContent, getCourseDetails } from '../../api/functions/GetData';
import { UserType } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import Content from '../../components/Content';


const CourseContent = () => {
    const { selectedCourse } = useContext(UserType);
    const [content, setContent] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await getCourseContent(selectedCourse);
                setContent(res.data.content.content);
            } catch (err) {
                console.log(err);
            }
        };
        fetchContent();
    }
        , []);
    const [details, setDetails] = useState({});
    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await getCourseDetails(selectedCourse);
                setDetails(response);
            }
            catch (err) {
                console.log(err);
            }
        }
        getDetails();
    }
        , [selectedCourse]);
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
            <View>
                <FlatList
                    data={content}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <Content item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}

export default CourseContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "space-evenly"
    },
    arrowContainer: {
        position: "absolute",
        top: 20,
        left: 10,
        zIndex: 1,
        backgroundColor: "white",
        height: 44,
        width: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
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
})