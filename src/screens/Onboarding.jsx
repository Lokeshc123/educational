import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Onboarding from 'react-native-onboarding-swiper'
import Lottie from "lottie-react-native";
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('screen')
const OnboardingScreen = () => {
    const navigation = useNavigation();
    const handleDone = () => {
        navigation.navigate('LoginScreen')
    }

    const doneButton = ({ ...props }) => {
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <Onboarding
                containerStyles={{ paddingHorizontal: 15 }}
                onDone={handleDone}
                DoneButtonComponent={doneButton}
                onSkip={handleDone}
                bottomBarHighlight={false}
                pages={[
                    {
                        backgroundColor: '#a7f3d0',
                        image: (
                            <View style={styles.lottie}>
                                <LottieView
                                    source={require('../../assets/animations/boost.json')}
                                    autoPlay
                                    loop
                                    style={styles.lottie}
                                />
                            </View>
                        ),
                        title: 'Boost Productivity',
                        subtitle: 'Achieve your goals',
                    },
                    {
                        backgroundColor: '#fef3c7',
                        image: (
                            <View style={styles.lottie}>
                                <LottieView
                                    source={require('../../assets/animations/work.json')}
                                    autoPlay
                                    loop
                                    style={styles.lottie}
                                />
                            </View>
                        ),
                        title: 'Work Semlessly',
                        subtitle: 'Get your work done',
                    },
                    {
                        backgroundColor: '#a78bfa',
                        image: (
                            <View style={styles.lottie}>
                                <LottieView
                                    source={require('../../assets/animations/achieve.json')}
                                    autoPlay
                                    loop
                                    style={styles.lottie}
                                />
                            </View>
                        ),
                        title: 'Achieve Higher Goals',
                        subtitle: 'Set your goals and achieve them',
                    },

                ]}
            />
        </View>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    lottie: {
        width: width * 0.9,
        height: width,
    },
    doneButton: {
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100

    }
})
