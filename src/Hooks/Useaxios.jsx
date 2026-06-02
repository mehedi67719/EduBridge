import axios from "axios";
import { useContext, useEffect } from "react";
import { Loadingcontext } from "./Loading/LoadingContext";
import Useauth from "./Useauth";


const useAxios = () => {
  const { token } = Useauth();
  const { setLoading } = useContext(Loadingcontext);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

  useEffect(() => {

    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        setLoading(true);

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );


    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token, setLoading]);

  return axiosInstance;
};

export default useAxios;