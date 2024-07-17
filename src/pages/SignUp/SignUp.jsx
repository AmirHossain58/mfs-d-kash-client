import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { ImSpinner10 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";


const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [show,setShow]=useState(false)
  const {
    user,
    setUser,
    loading,
    setLoading,
    getToken,}=useAuth()

  const from = location?.state || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  useEffect(()=>{
if(user){
  localStorage.setItem('user', JSON.stringify(user));
  // console.log(user);
}
  },[user])
  console.log(user);
  const {mutateAsync}=useMutation({
    mutationFn:async(userData)=>{
      const{data}=await axios.put(`${import.meta.env.VITE_API_URL}/users`,userData)
      return(data);
    },
    onSuccess:()=>{
      getToken()
    }
  })
  const onSubmit = async (data) => {
    console.log(data);
    const name = data.name;
    const email = data.email;
    const pin = data.password;
    const mobileNumber = data.MobileNumber;
    const userData={
      name,
      pin,
      mobileNumber,
      email,
      status:"pending",
      balance:0
    }

    try {
      setLoading(true);
      const res= await mutateAsync(userData)
      if(res.upsertedId){
        setUser(userData)
        navigate(from);
        toast.success("Registration Successfully");
      }
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
      toast.error(err.message);
    }
    data;
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Helmet>
          <title>D-Kash | Registration</title>
        </Helmet>
      <div className="flex flex-col max-w-xl w-full p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Registration</h1>
          <p className=" text-gray-400">Welcome to D-Kash</p>
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
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#e46f6c] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("name", { required: true })}
              />
              {/* errors will return when field validation fails  */}
              {errors.name && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
            <div className="relative">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Pin
                </label>
              </div>
              <input
                type={show?'number':'password'}
                name="password"
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#e46f6c] bg-gray-200 text-gray-900"
                {...register("password",{ min: 10000, max: 99999 }, { required: true })}
              />
              {/* errors will return when field validation fails  */}
              {errors.password && (
                <span className="text-red-700">PIN must be 5-digit</span>
              )}
              <div onClick={()=>{setShow(!show)}} className='absolute text-3xl right-7 top-[48%] hover:cursor-pointer'>
                 {show?<FaEye />:<FaEyeSlash />}
                 </div>
            </div>
            <div className="">
              <div className="flex justify-between">
                <label htmlFor="MobileNumber" className="text-sm mb-2">
                  Mobile Number
                </label>
              </div>
              <input
                type='number'
               defaultValue={880}
                name="MobileNumber"
                autoComplete="new-Mobile-Number"
                id="MobileNumber"
                required
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#e46f6c] bg-gray-200 text-gray-900"
                {...register("MobileNumber", { required: true })}
              />
              {/* errors will return when field validation fails  */}
              {errors.MobileNumber && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#e46f6c] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("email", { required: true })}
              />
              {/* errors will return when field validation fails  */}
              {errors.email && (
                <span className="text-red-700">This field is required</span>
              )}
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
       
        <p className="px-6 mt-3 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-[#e46f6c] text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
