import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const findMyEnrollments = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/enrollments`);
    return data;
};

export const enrollUserInCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.post(
        `${USERS_API}/${userId}/courses/${courseId}`
    );
    return response.data;
};

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.delete(
        `${USERS_API}/${userId}/courses/${courseId}`
    );
    return response.data;
};
