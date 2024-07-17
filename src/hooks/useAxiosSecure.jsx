import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      res => {
        return res
      },
      async error => {
         ('error tracked in the interceptor', error.response)
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )
  }, [navigate])

  return axiosSecure;
};

export default useAxiosSecure;
