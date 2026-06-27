import { axiosSecure } from "../../Hooks/Axiosinstance";

export const deleteNotice = async (id) => {
  try {
    const res = await axiosSecure.delete(`/my-uploaded-notice/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete notice:", error);
    throw error;
  }
};