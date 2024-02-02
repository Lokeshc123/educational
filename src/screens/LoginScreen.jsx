import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '../context/UserContext';

const LoginScreen = () => {
    const { role, setRole } = useContext(UserType);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                const storedRole = await AsyncStorage.getItem('role');
                setRole(storedRole);

                if (token && storedRole) {
                    navigateToHomeScreen(storedRole);
                }
            } catch (err) {
                console.error('Error checking login:', err);
            }
        };

        checkLogin();
    }, [setRole]);

    const handleLogin = async () => {
        try {
            const user = { email, password };
            const response = await axios.post('http://192.168.208.128:5000/login', user);
            const { token, role: userRole } = response.data;

            AsyncStorage.setItem('authToken', token);
            AsyncStorage.setItem('role', userRole);
            setRole(userRole);

            setEmail('');
            setPassword('');

            navigateToHomeScreen(userRole);
        } catch (error) {
            handleLoginError(error);
        }
    };

    const navigateToHomeScreen = (userRole) => {
        const homeScreen = userRole === 'student' ? 'StudentHomeScreen' : 'TeacherHomeScreen';
        navigation.replace(homeScreen);
    };

    const handleLoginError = (error) => {
        if (error.response && error.response.data) {
            console.log(error.response.data);
            Alert.alert('Error', 'Login Failed');
        } else {
            console.error('An unexpected error occurred:', error);
            Alert.alert('Error', 'An unexpected error occurred');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Sign In</Text>
                <Text style={styles.subHeaderText}>Sign in with your email and password</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <AntDesign name="user" size={24} color="black" />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <AntDesign name="lock" size={24} color="black" />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.signupText}>
                Don't have an account?{' '}
                <Text style={styles.signupLink} onPress={() => navigation.navigate('RegisterScreen')}>
                    Sign Up
                </Text>
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        top: -20,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    subHeaderText: {
        fontSize: 18,
        color: 'gray',
    },
    formContainer: {
        width: '80%',
        marginTop: 20,
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
        backgroundColor: 'lightblue',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: 30,
    },
    signupText: {
        fontSize: 15,
        color: 'gray',
        marginTop: 10,
    },
    signupLink: {
        color: 'darkblue',
    },
});

export default LoginScreen;
