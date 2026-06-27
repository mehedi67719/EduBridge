import { axiosSecure } from "../../Hooks/Axiosinstance";

export const myUploadedNotice = async (email) => {
  try {
    const res = await axiosSecure.get(`/my-uploaded-notice/${email}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch uploaded notices:", error);
    throw error;
  }
};