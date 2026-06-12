import { axiosSecure } from "../../Hooks/Axiosinstance";

export const uplaodassignment = async (formdata) => {
  try {
    const res = await axiosSecure.post("/upload-assignment", formdata);

    return res.data;
  } catch (err) {
    console.log("something wrong", err);
  }
};
