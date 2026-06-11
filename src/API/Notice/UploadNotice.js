import { axiosSecure } from "../../Hooks/Axiosinstance";

export const uploadNotice = async (formdata) => {
  try {
    const res = await axiosSecure.post("/upload-notice", formdata);
    return res.data;
  } catch (error) {
    console.log("Upload Notice Error:", error.response?.data || error.message);
  }
};