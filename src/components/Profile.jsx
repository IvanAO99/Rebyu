import React, { Fragment } from "react";

import { useNavigate } from "react-router-dom";

import useUsers from "../hooks/useUsers.js";

import { formatDateString } from "../libraries/manipulateData.js";

/**
 * Component Profile
 *
 * This component displays the profile of the current user.
 * It uses the useUsers hook to fetch user information.
 * The profile includes the nickname, name, email, date of birth,
 * registration date, and if the user is an affiliate, the affiliate start date.
 * It allows the user to cancel their subscription if they are an affiliate, or become an affiliate if they are not.
 * It uses the formatDateString function from the manipulateData.js file to format dates.
 *
 */
const Profile = () => {
  const navigate = useNavigate();

  const { user } = useUsers();

  return (
    <Fragment>
      <div>
        <div className="flex flex-col md:flex-row justify-stretch items-stretch gap-5">
          <img
            src={
              user.profile_photo || "./src/assets/img/default-profile-photo.jpg"
            }
            alt="User Profile Photo"
            className="self-center rounded-full w-96 h-96 object-cover"
          />
          <div className="flex-grow flex flex-col justify-between items-stretch gap-5">
            <div className="px-5">
              <p className="text-xl font-bold text-purple-600">NICKNAME</p>
              <p>{user.nickname}</p>
            </div>
            <div className="border"></div>
            <div className="px-5">
              <p className="text-xl font-bold text-purple-600">NAME</p>
              <p className="">{user.name}</p>
            </div>
            <div className="border"></div>
            <div className="px-5">
              <p className="text-xl font-bold text-purple-600">EMAIL</p>
              <p className="">{user.email}</p>
            </div>
            <div className="border"></div>
            <div className="px-5">
              <p className="text-xl font-bold text-purple-600">BIRTH DATE</p>
              <p className="">{user.birth_date}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start mt-5">
          <div className="flex-grow flex flex-col justify-between items-start gap-5">
            <div className="px-5">
              <p className="text-xl font-bold text-purple-600">USER SINCE</p>
              <p>{formatDateString(user.created_at)}</p>
            </div>

            {user.affiliate_start_date ? (
              <>
                <div className="border"></div>
                <div className="px-5">
                  <p className="text-xl font-bold text-purple-600">
                    AFFILIATE SINCE
                  </p>
                  <p className="">{user.affiliate_start_date}</p>
                </div>
                <button
                  type="button"
                  className="rounded-3xl bg-red-600 hover:bg-red-400 text-gray-50 px-5 py-2 shadow transition-all duration-300"
                >
                  Cancel subscription
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="rounded-3xl bg-purple-600 hover:bg-purple-400 text-gray-50 px-5 py-2 shadow transition-all duration-300"
                  onClick={() => {
                    navigate("/affiliate");
                  }}
                >
                  Become affiliate
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
