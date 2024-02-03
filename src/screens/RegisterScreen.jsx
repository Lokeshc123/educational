import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Dropdown } from 'react-native-element-dropdown';

import { registerStudent, registerTeacher } from '../api/functions/RegisterFunctions';
import { UserType } from '../context/UserContext';

const RegisterScreen = () => {
    const { setUser } = useContext(UserType);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUserName] = useState("")

    const data = [
        { label: 'Teacher', value: "Teacher" },
        { label: 'Student', value: "Student" },


    ];
    const [value, setValue] = useState("Student");
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigation = useNavigation();


    const handleRegister = async (values) => {
        let user = 0;
        const data = {
            name: values.username,
            email: values.email,
            password: values.password,
        };

        try {
            if (value === "Student") {
                user = await registerStudent(data);
            } else {
                user = await registerTeacher(data);
            }

            console.log(user);

            if (user === 1) {
                navigation.navigate("LoginScreen");
            }
        } catch (err) {
            console.log(err);
        }
    };


    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/, 'Password must be a combination of alphabets, numbers, and special characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", top: -20 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Sign Up</Text>
                <Text style={{ fontSize: 18, color: "gray" }}>Create your account</Text>
            </View>

            <Formik
                initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ width: '80%', marginTop: 20 }}>
                        <View style={styles.inputContainer}>
                            <AntDesign name="user" size={24} color="black" />
                            <TextInput
                                placeholder="Name"
                                value={values.username}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                style={styles.input}
                            />
                        </View>
                        {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                        <View style={styles.inputContainer}>
                            <AntDesign name="user" size={24} color="black" />
                            <TextInput
                                placeholder="Email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                style={styles.input}
                            />
                        </View>
                        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        <View style={styles.inputContainer}>
                            <AntDesign name="lock" size={24} color="black" />
                            <TextInput
                                placeholder="Password"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                secureTextEntry
                                style={styles.input}
                            />
                        </View>
                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        <View style={styles.inputContainer}>
                            <AntDesign name="lock" size={24} color="black" />
                            <TextInput
                                placeholder="Confirm Password"
                                value={values.confirmPassword}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                secureTextEntry
                                style={styles.input}
                            />
                        </View>
                        {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                        <Dropdown
                            style={styles.dropdowncontainer}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}

                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Sign Up as ..."
                            searchPlaceholder="Search..."
                            value={value}
                            onChange={item => {
                                setValue(item.value);
                            }}


                        />
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>

            <Text style={{ fontSize: 15, color: 'gray', marginTop: 10 }}>Already have an account? <Text style={{ color: "darkblue" }} onPress={() => navigation.navigate("LoginScreen")}>Sign In</Text></Text>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginLeft: 10,
    },
    button: {
        backgroundColor: "lightblue",
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        marginTop: 30,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },

    btn: {
        width: "90%",
        height: 50,
        backgroundColor: "lightblue",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10
    },
    dropdown: {
        margin: 16,
        height: 50,

        borderRadius: 12,
        padding: 12,

    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    dropdowncontainer: {
        width: "100%",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
    },
});
