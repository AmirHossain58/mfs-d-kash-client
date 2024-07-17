import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { ImSpinner10, ImSpinner5 } from "react-icons/im";
import { useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { FaEye, FaEyeSlash, } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import useAuth from './../../hooks/useAuth';
import axios from "axios";


const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || "/";
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [show,setShow]=useState(false)

  const {
    user,
    setUser,
    loading,
    setLoading,
    getToken,}=useAuth()
        const {mutateAsync}=useMutation({
          mutationFn:async(userData)=>{
            const{data}=await axios.put(`${import.meta.env.VITE_API_URL}/users/${userData?.emailOrMobile}`,userData)
            return data;

          },
          onSuccess:()=>{
            getToken()
          }
        })
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const emailOrMobile = data.emailOrMobile
    const pin = data.pin
    
    try {
     const res= await mutateAsync({emailOrMobile,pin})
     if(res){
      setUser(res)
      localStorage.setItem('user', JSON.stringify(res));

      navigate(from);
      toast.success("Login Successfully");
    }
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
      toast.error(err.message);
    }

  }
  
  return (
    <div className="flex justify-center items-center min-h-screen">
       <Helmet>
          <title>D-Kash | Login</title>
        </Helmet>
      <div className="flex flex-col max-w-xl w-full p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
              Mobile Number/Email
              </label>
              <input
                type="text"
                name="emailOrMobile"
                id="email"
                required
                placeholder="Enter Your Email or Mobile (with 880) Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#e46f6c] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("emailOrMobile", { required: true })}
                />
                {/* errors will return when field validation fails  */}
                {errors.emailOrMobile && (
                  <span className="text-red-700">This field is required</span>
                )}
            </div>
            <div className="relative">
              <div className="flex justify-between">
                <label htmlFor="pin" className="text-sm mb-2">
                  PIN
                </label>
              </div>
              <input
                type={show?'number':'password'}
                name="pin"
                autoComplete="current-pin"
                id="pin"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#e46f6c] bg-gray-200 text-gray-900"
                {...register("pin",{ min: 10000, max: 99999 }, { required: true })}
                />
                {/* errors will return when field validation fails  */}
                {errors.pin && (
                  <span className="text-red-700">PIN must be 5-digit</span>
                )}
            <div onClick={()=>{setShow(!show)}} className='absolute text-3xl right-4 top-[47%] hover:cursor-pointer'>
            {show?<FaEye />:<FaEyeSlash />}
            </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#e46f6c] w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <ImSpinner10 className="animate-spin mx-auto text-xl" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
       
        <p className="px-6 text-sm text-center mt-3 text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/signup"
            className="hover:underline hover:text-[#e46f6c] text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
