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

const GamePage = () => {
  const { isLoadingGame, game } = useGames();
  const { userReview, isReviewFormModalOpen } = useReviews();

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
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="border-none rounded-3xl bg-red-600 text-white px-5 py-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <ReviewForm />
                </>
              )}
              <div className="border-y-2 border-gray-100 dark:border-gray-800"></div>
              <Reviews />
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
      {true && (
        <CustomModal>
          <p className="px-5 py-2">Hello world!</p>
          <p></p>
        </CustomModal>
      )}
    </>
  );
};

export default GamePage;
