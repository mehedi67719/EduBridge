import useAxios from "../../Hooks/Useaxios";

const useRegister = () => {
  const axiosSecure = useAxios();

  const Register = async (data) => {
    try {
      const res = await axiosSecure.post("/register", data);
      return res.data;
    } catch (error) {
      throw error.response?.data || { message: "Something went wrong" };
    }
  };

  return { Register };
};

export default useRegister;