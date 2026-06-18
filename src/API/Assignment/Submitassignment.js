import { axiosSecure } from "../../Hooks/Axiosinstance";

export const submitAssignment = async (data) => {
  try {
    const res = await axiosSecure.post("/submit-assignment", data);
    return res.data;
  } catch (error) {
    console.error("Error submitting assignment:", error);
    throw error;
  }
};