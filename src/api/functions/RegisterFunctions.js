import axios from "axios";
import { Alert } from "react-native";

export const registerTeacher = async (teacher) => {
  try {
    const res = await axios.post(
      "http://192.168.208.128:5000/register-teacher",
      teacher
    );
    Alert.alert("Success", "Register Successful");
    return 1;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log(err.response.data);
      Alert.alert("Error", "Register Failed");
    } else {
      console.log(err);
      Alert.alert("Error", "An unexpected error occurred");
    }
    return 0;
  }
};

export const registerStudent = async (student) => {
  try {
    const res = await axios.post(
      "http://192.168.208.128:5000/register-student",
      student
    );
    Alert.alert("Success", "Register Successful");
    return 1;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log(err.response.data);
      Alert.alert("Error", "Register Failed");
    } else {
      console.log(err);
      Alert.alert("Error", "An unexpected error occurred");
    }
    return 0;
  }
};

export const registerCourse = async (course) => {
  try {
    const res = await axios.post(
      "http://192.168.208.128:5000/add-course",
      course
    );
    Alert.alert("Success", "Course Added Successfull");
    return 1;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log(err.response.data);
      Alert.alert("Error", "Register Failed");
    } else {
      console.log(err);
      Alert.alert("Error", "An unexpected error occurred");
    }
    return 0;
  }
};
