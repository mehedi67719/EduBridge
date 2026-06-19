import { axiosSecure } from "../../Hooks/Axiosinstance";

export const submissionassignment = async (email, role) => {
  try {
    const res = await axiosSecure.get("/submission-assignment", {
      params: {
        email,
        role,
      },
    });

    return res.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};