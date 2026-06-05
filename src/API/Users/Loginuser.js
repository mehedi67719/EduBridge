import { axiosSecure } from "../../Hooks/Axiosinstance";

export const loginuser = async (email) => {
  try {
    const res = await axiosSecure.get("/loginuser", {
      params: { email },
    });

    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};