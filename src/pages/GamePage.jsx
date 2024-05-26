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
    filteredReviews
  } = useReviews();

  const { user, isAdmin } = useUsers();

  return (
    <>
      <div className="h-full flex flex-col gap-5">
        {isLoadingGame ? (
          <>
            <div className="h-full flex flex-col justify-center items-center">
              <Loading />
              <p className="px-5 py-2 text-purple-600 font-bold">
                Loading game data...
              </p>
            </div>
          </>
        ) : validateObject(game) ? (
          <>
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
              ) : validateObject(user) ? (
                <>
                  <ReviewForm />
                </>
              ) : (
                <p>Log In for Review This Game!</p>
              )}
              {/* <div className="border-y-2 border-gray-100 dark:border-gray-800"></div> */}
              <ReviewsFilter />
              <Reviews loading={isLoadingReviews} reviews={filteredReviews} />
            </div>
          </>
        ) : (
          <>
            <div>
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
            <h1 className="text-3xl font-bold text-center">
              ARE YOU SURE YOU WANT TO DELETE THIS REVIEW?
            </h1>
          </DeleteModal>
        </CustomModal>
      )}
    </>
  );
};

export default GamePage;
