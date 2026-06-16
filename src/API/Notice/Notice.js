import { axiosSecure } from "../../Hooks/Axiosinstance";

export const loadNotice = async (
  category,
  role,
  search,
  page = 1
) => {
  try {
    const res = await axiosSecure.get("/notice", {
      params: {
        category: category || "all",
        role: role || "",
        search: search?.trim() || "",
        page,
      },
    });

    return res.data; 
  } catch (error) {
    console.log("something wrong", error?.response?.data || error.message);
    throw error;
  }
};