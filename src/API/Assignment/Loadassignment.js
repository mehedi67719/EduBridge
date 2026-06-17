import { axiosSecure } from "../../Hooks/Axiosinstance";

export const loadassignment = async (role = "", search = "", page = 1, secretcode = "", subject = "") => {
  try {
    const res = await axiosSecure.get("/assignment", {
      params: {
        role: role || "",
        search: search || "",
        page: page || 1,
        secretcode: secretcode || "",
        subject: subject || "",
      },
    });

    return res.data;
  } catch (err) {
    console.error("Error loading assignments:", err);
    throw err;
  }
};