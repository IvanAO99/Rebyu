import React, { Fragment, useState } from "react";
import {
  FaHeart,
  FaRegStar,
  FaRegStarHalfStroke,
  FaStar,
} from "react-icons/fa6";
import { formatDateString } from "../libraries/manipulateData";
import useReviews from "../hooks/useReviews";

const Review = ({ review, ownReview = false }) => {
  const { users, reviews, likes, review_id } = review;

  const { handleLikes } = useReviews();

  const [isSpoiler, setIsSpoiler] = useState(
    ownReview ? false : reviews.spoiler
  );

  return (
    <Fragment>
      <div className="rounded-3xl shadow px-5 py-2 bg-gray-100 dark:bg-gray-800">
        <div className="flex flex-row justify-between items-center gap-5">
          <div className="flex flex-row justify-center items-center gap-1">
            <img
              src={
                users.profile_photo || "./src/assets/profile-photo-default.jpg"
              }
              alt="User Profile Photo"
              className="rounded-full w-16 h-16 object-cover"
            />
            <p className="hidden sm:block font-bold text-purple-600 italic">
              <span>@</span>
              {users.nickname}
            </p>
            {reviews.edited && <small className="italic">edited</small>}
          </div>
          <div className="flex flex-row justify-center items-center gap-1">
            {[...Array(5)].map((star, i) => {
              return (
                <Fragment key={crypto.randomUUID()}>
                  {/* Render the Star component with customized color and size */}
                  <FaStar
                    size={24}
                    color={
                      i < reviews.score ? "rgb(147 51 234)" : "rgb(17 24 39)"
                    }
                  />
                </Fragment>
              );
            })}
          </div>
        </div>
        <div className="relative flex flex-row justify-center items-center border-y my-2">
          <p className="px-5 py-2 lg:py-8">{reviews.message}</p>
          {isSpoiler && (
            <div className="absolute top-0 flex flex-col justify-center items-center gap-5 w-full h-full backdrop-blur">
              <button
                type="button"
                className="rounded-3xl bg-red-600 hover:bg-red-400 text-gray-50 px-5 py-2 shadow transition-all duration-300"
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
          {!ownReview && (
            <div className="flex flex-row justify-center items-center gap-1 text-purple-600">
              <p className="">{likes}</p>
              <FaHeart
                size={24}
                onClick={() => {
                  handleLikes(review_id);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Review;
