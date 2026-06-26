import { axiosSecure } from "../../Hooks/Axiosinstance";

export const assignmentResult = async (email) => {
  try {
    const { data } = await axiosSecure.get(`/assignment-result/${email}`);
    return data;
  } catch (error) {
    console.error("Error fetching assignment result:", error);
    throw error;
  }
};