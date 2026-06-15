import { axiosSecure } from "../../Hooks/Axiosinstance";

export const loadNotice = async (category, role, search) => {
  try {
    const res = await axiosSecure.get("/notice", {
      params: {
        category: category || "all",
        role: role || "",
        search: search?.trim() || "",
      },
    });

    return res.data;
  } catch (error) {
    console.log("something wrong", error);
    throw error;
  }
};