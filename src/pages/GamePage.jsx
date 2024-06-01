import React from "react";

import useGames from "../hooks/useGames";
import { validateObject } from "../libraries/validateData";
import Review from "../components/Review";
import Loading from "../components/Loading";
import ReviewForm from "../components/ReviewForm";
import GameData from "../components/GameData";
import Reviews from "../components/Reviews";
import useReviews from "../hooks/useReviews";
import CustomModal from "../components/CustomModal";
import ReviewFormModal from "../components/ReviewFormModal";
import DeleteModal from "../components/DeleteModal";
import useUsers from "../hooks/useUsers";
import ReviewsFilter from "../components/ReviewsFilter";
import InformativeTable from "../components/InformativeTable";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";

const GamePage = () => {
  const { isLoadingGame, game } = useGames();
  const {
    userReview,
    showReviewFormModal,
    showReviewDeleteModal,
    hideReviewDeleteModal,
    isReviewFormModalOpen,
    deletingReview,
    handleReviewSubmit,
    isLoadingReviews,
    reviewsWithLikes,
    filteredReviews,
    reviewForm,
  } = useReviews();

  const { isSessionUp, user, isAdmin } = useUsers();

  return (
    <>
      <div className="flex-grow flex flex-col gap-5">
        {isLoadingGame ? (
          <>
            <div className="flex-grow flex flex-col justify-center items-center gap-5">
              <div className="flex flex-col justify-center items-center">
                <Loading />
                <p className="px-5 py-2 text-purple-600 font-bold">
                  Loading game data...
                </p>
              </div>
            </div>
          </>
        ) : validateObject(game) ? (
          <>
            <div className="h-full flex flex-col gap-5">
              {isSessionUp && validateObject(user) && isAdmin && (
                <>
                  <div className="self-start flex flex-row gap-2 hover:shadow rounded-3xl hover:bg-gray-100 hover:dark:bg-gray-800 px-5 py-2 transition-all duration-300">
                    <FaAngleLeft size={24} />
                    <Link to="/games" className="font-bold">
                      Back to games
                    </Link>
                  </div>
                </>
              )}
              <GameData />
              <div className="flex flex-col gap-5">
                <div className="flex flex-row justify-stretch items-center gap-1 py-2">
                  <div className="flex-grow border-y-2 border-purple-600"></div>
                  <h2 className="text-6xl font-bold">REVIEWS</h2>
                  <div className="flex-grow border-y-2 border-purple-600"></div>
                </div>
                {validateObject(userReview) ? (
                  <>
                    <div className="flex flex-row gap-5">
                      <Review review={userReview} ownReview={true} />
                      <div className="flex flex-col justify-start items-stretch gap-5">
                        <button
                          type="button"
                          className="border-none rounded-3xl bg-purple-600 text-white px-5 py-2"
                          onClick={() =>
                            showReviewFormModal(true, userReview.review_id)
                          }
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="border-none rounded-3xl bg-red-600 text-white px-5 py-2"
                          onClick={() => {
                            showReviewDeleteModal(userReview.review_id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                ) : validateObject(user) && !isAdmin ? (
                  <>
                    <ReviewForm />
                  </>
                ) : (
                  <p>
                    {isAdmin
                      ? "Admins can't review games!"
                      : "Log in to review this game!"}
                  </p>
                )}
                {/* <div className="border-y-2 border-gray-100 dark:border-gray-800"></div> */}
                <ReviewsFilter />
                <Reviews loading={isLoadingReviews} reviews={filteredReviews} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="h-full flex flex-col justify-center items-center gap-5">
              <p>ERROR. No game found.</p>
            </div>
          </>
        )}
      </div>
      {isReviewFormModalOpen && (
        <CustomModal isOpen={isReviewFormModalOpen}>
          <ReviewFormModal />
        </CustomModal>
      )}
      {deletingReview && (
        <CustomModal isOpen={deletingReview}>
          <DeleteModal
            title={"DELETE REVIEW"}
            hideFunction={hideReviewDeleteModal}
            deleteFunction={handleReviewSubmit}
          >
            <h1 className="text-xl font-bold text-center">
              ARE YOU SURE YOU WANT TO{" "}
              <span className="text-red-600">DELETE</span> THIS REVIEW?
            </h1>
            {isAdmin && (
              <InformativeTable
                object={{
                  user: reviewForm.users.nickname,
                  message: reviewForm.reviews.message,
                }}
              />
            )}
          </DeleteModal>
        </CustomModal>
      )}
    </>
  );
};

export default GamePage;
