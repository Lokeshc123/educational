import axios from "axios";
export const getTeacherCourses = async (teacherId) => {
  try {
    const response = await axios.get(
      `http://192.168.18.10:5000/teacher/${teacherId}/courses`
    );
    return response.data.courses;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log(err.response.data);
      return [];
    } else {
      console.log(err);
      return [];
    }
  }
};
export const getCourses = async () => {
  try {
    const response = await axios.get("http://192.168.18.10:5000/courses");
    return response.data.courses;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log(err.response.data);
      return [];
    } else {
      console.log(err);
      return [];
    }
  }
};
