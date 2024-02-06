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
export const getCourseDetails = async (courseId) => {
  try {
    const response = await axios.get(
      `http://192.168.18.10:5000/courses/${courseId}`
    );
    return response.data.course;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log(err.response.data);
      return {};
    } else {
      console.log(err);
      return {};
    }
  }
};
export const getEnrolledStudents = async (teacherId) => {
  try {
    const response = await axios.get(
      `http://192.168.18.10:5000/teacher/${teacherId}/students`
    );
    return response.data.studentsEnrolled;
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
export const getStudentCourses = async (studentId) => {
  try {
    const response = await axios.get(
      `http://192.168.18.10:5000/student/${studentId}/courses`
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

export const getInfo = async (email) => {
  try {
    const response = await axios.get(`http://192.168.18.10:5000/user/${email}`);
    return response.user;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log(err.response.data);
      return {};
    } else {
      console.log(err);
      return {};
    }
  }
};
export const getCourseContent = async (courseId) => {
  try {
    const response = await axios.get(
      `http://192.168.18.10:5000/course/${courseId}/content`
    );
    return response;
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
