import useAxios from "../Hooks/Useaxios";

export const useLoadNotice = () => {
  const axiosSecure = useAxios();

  const loadnotice = async () => {
    try {
      const res = await axiosSecure.get("/notice");
      return res.data;
    } catch (error) {
      console.log("something wrong", error);
    }
  };

  return { loadnotice };
};