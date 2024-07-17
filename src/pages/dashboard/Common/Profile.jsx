import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Profile = () => {
const {user}=useAuth()
  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5">
        <img
          alt="profile"
          src="/mfs.png"
          className="w-full mb-4 rounded-t-lg h-80"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          {/* <a href="#" className="relative block">
            <img
              alt="profile"
              src={"user?.photoURL"}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a> */}

          <p className="p-2 px-4 text-xs  bg-rose-200 rounded-full">
            {/* {role?.role?.slice(0, 1)?.toUpperCase() + role?.role?.slice(1)} */}
          </p>

          <p className="mt-4 text-xl font-medium text-gray-800 ">
            Balance : {user?.balance}
          </p>

          <div className="w-full p-2 mt-4 rounded-lg">
            
            <p></p>
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black ">
                  {user?.name}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">{user?.email}</span>
              </p>
              <p className="flex flex-col">
              Mobile Number
                <span className="font-bold text-black ">+{user?.mobileNumber}</span>
              </p>

            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
