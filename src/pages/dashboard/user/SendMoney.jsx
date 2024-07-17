import {  useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ImSpinner10 } from "react-icons/im";
import {  useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SendMoney = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || "/";
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0);
  const axiosSecure = useAxiosSecure();

  const { user, setUser, loading, setLoading,refetch } = useAuth();

  const { mutateAsync } = useMutation({
    mutationFn: async (senderData) => {
      const { data } = await axiosSecure.put(
        `/send-money/${user.email}`,
        senderData
      );
      return data;
    }
  });
 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true)
    const emailOrMobile = data.emailOrMobile;
    const amountValue = data.amount;
    setAmount(amountValue);
    let totalAmount = amount;
    if (amountValue > 100) {
      totalAmount = parseInt(amountValue) + 5;
    }
    const pin = data.pin;
    const sender = {
      ...user,
      timeStamp: new Date(),
      pin,
      amount,
      totalAmount,
      receiver: emailOrMobile,
      type:"send-money"
    };
    delete sender._id;

    try {
      const res = await mutateAsync(sender);
      if (res?.message==="Money Send Successfully") {
        refetch()
        toast.success("Money Send Successfully");
        navigate(from);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Helmet>
        <title>D-Kash | Send Money</title>
      </Helmet>
      <div className="flex flex-col max-w-xl w-full p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Send Money</h1>
          <p className="text-sm text-gray-400">
            Send your money on anytime, any where in the World
          </p>
          <h1 className="my-3 text-4xl font-semibold">Balance : {user?.balance}</h1>
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
                To
              </label>
              <input
                type="text"
                name="emailOrMobile"
                id="email"
                required
                placeholder="Enter Email or Mobile (with 880) Here To send money"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#2DBE61] bg-gray-200 text-gray-900"
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
                <label htmlFor="amount" className="text-sm mb-2">
                  Amount
                </label>
              </div>
              <input
                type={"number"}
                name="amount"
                autoComplete="current-amount"
                onChange={handleAmount}
                id="amount"
                required
                placeholder="Enter your Amount"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#2DBE61] bg-gray-200 text-gray-900"
                {...register("amount", { min: 50,max: user?.balance }, { required: true })}
              />
              {/* errors will return when field validation fails  */}
              {errors.amount && (
                <span className="text-red-700">
                  {" "}
                  Less than 50 taka or greater then Balance  is not allowed for transactions.
                </span>
              )}
            </div>
            <div className="relative">
              <div className="flex justify-between">
                <label htmlFor="pin" className="text-sm mb-2">
                  PIN
                </label>
              </div>
              <input
                type={show ? "number" : "password"}
                name="pin"
                autoComplete="current-pin"
                id="pin"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#2DBE61] bg-gray-200 text-gray-900"
                {...register(
                  "pin",
                  { min: 10000, max: 99999 },
                  { required: true }
                )}
              />
              {/* errors will return when field validation fails  */}
              {errors.pin && (
                <span className="text-red-700">PIN must be 5-digit</span>
              )}
              <div
                onClick={() => {
                  setShow(!show);
                }}
                className="absolute text-3xl right-4 top-[47%] hover:cursor-pointer"
              >
                {show ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          <div>
            <button
              disabled
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#2DBE61] bg-gray-200 text-gray-900  "
            >
              Total Amount (Amount+Fee) = (
              {` ${amount}+${amount > 100 ? 5 : 0} `}) ={" "}
              {parseInt(amount) + (amount > 100 ? 5 : 0)}
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#2DBE61] w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <ImSpinner10 className="animate-spin mx-auto text-xl" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
