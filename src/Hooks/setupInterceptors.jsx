import { axiosSecure } from "./Axiosinstance";

export const setupInterceptors = (token) => {
  // Request interceptor

  
  const requestInterceptor = axiosSecure.interceptors.request.use(
    (config) => {
      // token attach
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  const responseInterceptor = axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // cleanup function (VERY IMPORTANT)
  return () => {
    axiosSecure.interceptors.request.eject(requestInterceptor);
    axiosSecure.interceptors.response.eject(responseInterceptor);
  };
};