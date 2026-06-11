import { axiosSecure } from "../../Hooks/Axiosinstance";


export const loadNotice = async () => {
  try {
    const res = await axiosSecure.get("/notice");
    return res.data;
  } catch (error) {
    console.log("something wrong", error);
  }
};