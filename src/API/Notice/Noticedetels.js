import { axiosSecure } from "../../Hooks/Axiosinstance";

export const noticedetels = async (id) => {
  try {
    const res = await axiosSecure.get(`/notice/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};