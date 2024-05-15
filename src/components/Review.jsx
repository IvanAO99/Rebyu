import React, { Fragment, useState } from "react";
import {
  FaHeart,
  FaRegStar,
  FaRegStarHalfStroke,
  FaStar,
} from "react-icons/fa6";
import { formatDateString } from "../libraries/manipulateData";

const Review = ({ review }) => {
  const [isSpoiler, setIsSpoiler] = useState(true);

  const { users, reviews, likes } =
  review;
  
  //console.log(review);
  return (
    <Fragment>
      <div className="rounded-3xl shadow px-5 py-2 bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-row justify-between items-center gap-5">
          <div className="flex flex-row justify-center items-center gap-1">
            <img
              src={users.profile_photo || "./src/assets/profile-photo-default.jpg"}
              alt="User Profile Photo"
              className="rounded-full w-16 h-16 object-cover"
            />
            <p className="hidden sm:block font-bold text-purple-800 italic">
              <span>@</span>
              {users.nickname}
            </p>
            {reviews.edited && <small className="italic">edited</small>}
          </div>
          <div className="flex flex-row justify-center items-center gap-1 text-purple-800">
            <FaStar size={24} />
            <FaStar size={24} />
            <FaStar size={24} />
            <FaRegStarHalfStroke size={24} />
            <FaRegStar size={24} />
          </div>
        </div>
        <div className="relative flex flex-row justify-center items-center border-y my-2">
          <p className="px-5 py-2 lg:py-8">{reviews.message}</p>
          {reviews.spoiler && (
            <div className="absolute top-0 flex flex-col justify-center items-center gap-5 w-full h-full backdrop-blur">
              <button
                type="button"
                className="rounded-3xl bg-red-600 text-gray-50 px-5 py-2"
                onClick={() => {
                  setIsSpoiler(!isSpoiler);
                }}
              >
                See spoilers
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between items-center">
          <p>{formatDateString(reviews.date_time)}</p>
          <div className="flex flex-row justify-center items-center gap-1 text-purple-800">
            <FaHeart size={24} />
            <p className="text-gray-50">{likes}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Review;
