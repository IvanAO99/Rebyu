import React, { Fragment, useState } from "react";

import { FaHeart, FaStar, FaTrash } from "react-icons/fa6";

import useUsers from "../hooks/useUsers";
import useReviews from "../hooks/useReviews";

import { formatDateString } from "../libraries/manipulateData.js";

/**
 * Componente Review
 *
 * Este componente renderiza un elemento de revisión de usuario.
 * Recibe props que incluyen la información de la revisión, como el usuario que la realizó,
 * la revisión en sí misma, el número de likes, etc.
 * Permite a los usuarios ver la revisión, indicar si contiene spoilers y dar likes.
 * Además, los administradores tienen la capacidad de eliminar la revisión.
 *
 * Props:
 * @param {Object} review - objeto que contiene la información de la revisión, incluyendo el usuario que la realizó, la revisión, etc.
 * @param {boolean} onSlide - (opcional) booleano que indica si la revisión se muestra en un carrusel de deslizamiento.
 * @param {boolean} ownReview - (opcional) booleano que indica si la revisión pertenece al usuario actual.
 *
 */
const Review = ({ review, onSlide = false, ownReview = false }) => {
  const { users, reviews, likes, review_id } = review;

  const { isAdmin } = useUsers();
  const { handleLikes, showReviewDeleteModal } = useReviews();

  const [isSpoiler, setIsSpoiler] = useState(
    ownReview ? false : reviews.spoiler
  );

  return (
    <Fragment>
      <div
        className={` ${
          onSlide
            ? "w-[400px]"
            : `${
                isAdmin
                  ? "w-[280px] md:w-[400px] lg:w-[800px]"
                  : "w-[280px] sm:w-[400px] md:w-[800px]"
              }`
        } rounded-3xl shadow px-5 py-2 bg-gray-100 dark:bg-gray-800`}
      >
        <div className="flex flex-row justify-between items-center gap-5">
          <div className="flex flex-row justify-center items-center gap-1">
            <img
              src={
                users.profile_photo ||
                "./src/assets/img/default-profile-photo.jpg"
              }
              alt="User Profile Photo"
              className="rounded-full w-16 h-16 object-cover"
            />
            <p
              className={`w-auto ${
                onSlide
                  ? "block"
                  : `${isAdmin ? "hidden md:block" : "hidden sm:block"}`
              } font-bold text-purple-600 italic truncate`}
            >
              <span>@</span>
              {users.nickname}
            </p>
            {reviews.edited && (
              <small className={`${onSlide && "hidden"} italic`}>edited</small>
            )}
          </div>
          <div className="flex flex-row justify-center items-center gap-1">
            {[...Array(5)].map((star, i) => {
              return (
                <Fragment key={crypto.randomUUID()}>
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
          <p className={`${onSlide && "w-full truncate"} px-5 py-2 lg:py-8`}>
            {reviews.message}
          </p>
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
          {!ownReview && !isAdmin && !onSlide && (
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
          {isAdmin && (
            <div className="cursor-pointer shadow rounded-full p-2 text-red-600 hover:text-red-400">
              <FaTrash
                size={24}
                onClick={() => {
                  showReviewDeleteModal(review_id);
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
