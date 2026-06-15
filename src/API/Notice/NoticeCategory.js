import { axiosSecure } from "../../Hooks/Axiosinstance";

export const noticeCategory = async () => {
  try {
    const res = await axiosSecure.get("/notice/category");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
