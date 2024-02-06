import axios from "axios";
export const enrollStudent = async (studentId, courseId) => {
  try {
    const res = await axios.post(
      `http://192.168.18.10:5000/enroll-course/${studentId}/${courseId}`
    );

    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log(err.response.data);
      return err.response.data;
    } else {
      console.log(err);
      return err;
    }
  }
};
export const updateProfilePic = async (userId, image) => {
  try {
    const res = await axios.put(
      `http://192.168.18.10:5000/update-image/${userId}`,
      { image: image }
    );
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log(err.response.data);
      return err.response.data;
    } else {
      console.log(err);
      return err;
    }
  }
};
