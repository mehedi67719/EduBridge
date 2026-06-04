import { axiosSecure } from "../../Hooks/Axiosinstance";

export const PostRegister = async (data) => {
  try {
    const res = await axiosSecure.post("/register", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};
