import React, { Fragment } from "react";
import {
  FaHeart,
  FaRegStar,
  FaRegStarHalfStroke,
  FaStar,
} from "react-icons/fa6";

const Review = () => {
  const userProfilePhoto =
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/users/annamartinez.jpg";
  const userName = "annamartinez";

  return (
    <Fragment>
      <div className="border rounded-3xl shadow-2xl m-5 px-5 py-2 bg-gray-50">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-center items-center gap-1">
            <img
              src={userProfilePhoto}
              alt="User Profile Photo"
              className="border-2 border-purple-800 rounded-full w-16 h-16 object-cover"
            />
            <p className="hidden sm:block font-bold text-purple-800 italic">
              <span>@</span>
              {userName}
            </p>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 text-purple-800">
            <FaStar size={24} />
            <FaStar size={24} />
            <FaStar size={24} />
            <FaRegStarHalfStroke size={24} />
            <FaRegStar size={24} />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center border-y my-2">
          <p className="px-5 py-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            iste molestiae sunt. Aliquid, ut ipsum corporis, consequatur optio
            ad qui necessitatibus sunt aut nostrum sit ab possimus quam
            voluptatem numquam.
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p>99/99/9999 at 99:99</p>
          <div className="flex flex-row justify-center items-center gap-1 text-purple-800">
            <FaHeart size={24} />
            <p className="text-black">99k</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Review;
