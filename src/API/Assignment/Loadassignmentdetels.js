import { axiosSecure } from "../../Hooks/Axiosinstance";

export const loadAssignmentDetails = async (id, role) => {
  try {
    if (!id) throw new Error("Assignment id is required");

    const res = await axiosSecure.get("/assignment/detels", {
      params: {
        id,
        role, 
      },
    });

    return res.data;
  } catch (err) {
    console.error("loadAssignmentDetails error:", err?.response?.data || err.message);
    throw err;
  }
};