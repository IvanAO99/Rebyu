import React, { Fragment, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useUsers from "../hooks/useUsers";
import { formatDateString } from "../libraries/manipulateData";

const Profile = () => {
  const { isSessionUp, user } = useUsers();

  const [isHidden, setIsHidden] = useState(true);

  return (
    <Fragment>
      <div>
        <div className="flex flex-col md:flex-row justify-stretch items-stretch gap-5">
          <img
            src={user.profile_photo || "./src/assets/profile-photo-default.jpg"}
            alt="User Profile Photo"
            className="self-center rounded-full w-96 h-96 md:h-40 lg:h-96 object-cover"
          />
          <div className="flex-grow flex flex-col justify-between items-stretch gap-5">
            <div className="px-5">
              <p className="text-xl font-bold text-purple-800">NICKNAME</p>
              <p>{user.nickname}</p>
            </div>
            <div className="border"></div>
            <div className="px-5">
              <p className="text-xl font-bold text-purple-800">NAME</p>
              <p className="">{user.name}</p>
            </div>
            <div className="border"></div>
            <div className="px-5">
              <p className="text-xl font-bold text-purple-800">EMAIL</p>
              <p className="">{user.email}</p>
            </div>
            <div className="border"></div>
            <div className="px-5">
              <div className="flex flex-row justify-stretch items-center gap-1">
                <p className="text-xl font-bold text-purple-800">PASSWORD</p>
                <button
                  type="button"
                  className="font-bold text-purple-800"
                  onClick={() => setIsHidden(!isHidden)}
                >
                  {isHidden ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                </button>
              </div>
              <p className="">
                {isHidden ? "****************" : user.password}
              </p>
            </div>
            <div className="border"></div>
            <div className="px-5">
              <p className="text-xl font-bold text-purple-800">BIRTH DATE</p>
              <p className="">{user.birth_date}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start mt-5">
          <div className="flex-grow flex flex-col justify-between items-start gap-5">
            <div className="px-5">
              <p className="text-xl font-bold text-purple-800">USER SINCE</p>
              <p>{formatDateString(user.created_at)}</p>
            </div>
            <div className="border"></div>
            {user.affiliate_start_date ? (
              <>
                <div className="px-5">
                  <p className="text-xl font-bold text-purple-800">
                    AFFILIATE SINCE
                  </p>
                  <p className="">{user.affiliate_start_date}</p>
                </div>
                <button
                  type="button"
                  className="rounded-3xl bg-red-600 text-white px-5 py-2"
                >
                  Cancel subscription
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="rounded-3xl bg-purple-800 text-white px-5 py-2"
                >
                  Become affiliate
                </button>
              </>
            )}
          </div>
          <div>
            <button
              type="button"
              className="mr-5 border-none rounded-3xl bg-purple-800 text-white px-5 py-2"
            >
              Update profile
            </button>
            <button
              type="button"
              className="border-none rounded-3xl bg-red-600 text-white px-5 py-2"
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
