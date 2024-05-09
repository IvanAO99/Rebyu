import React, { useEffect } from "react";
import { Fragment } from "react";
import ReactPlayer from "react-player/lazy";
import GameVideo from "../components/GameVideo";
import useGames from "../hooks/useGames";
import { validateArray, validateObject } from "../libraries/validateData";
import Review from "../components/Review";
import useReviews from "../hooks/useReviews";
import Loading from "../components/Loading";
import ReviewForm from "../components/ReviewForm";

const GamePage = () => {
  const videoURL = "https://www.youtube.com/watch?v=eOiUtRF8k28"; // Tiene que ser de Youtube
  const userReview = false; // Cambiar para ver el layout de la reseña o el formulario

  const { isLoadingGame, game } = useGames();
  const { isLoadingReviews, reviews } = useReviews();

  return (
    <Fragment>
      <div className="h-full">
        {isLoadingGame ? (
          <>
            <div className="h-full flex flex-col justify-center items-center">
              <Loading />
              <p className="px-5 py-2 text-purple-800 font-bold">
                Loading game data...
              </p>
            </div>
          </>
        ) : validateObject(game) ? (
          <Fragment>
            <div className="flex flex-row gap-5">
              <ReactPlayer
                url={videoURL}
                controls={true}
                wrapper={GameVideo}
                width={"100%"}
                height={"100%"}
              />
              <div className="w-3/12 rounded-3xl shadow">
                <h2>{game.title}</h2>
                <p>{game.synopsis}</p>
              </div>
            </div>
            <div className="flex flex-row gap-5">
              <div className="rounded-3xl px-5 py-2 shadow">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure
                  tempora eos maiores iusto, voluptatem at asperiores! Maiores
                  qui minus nam obcaecati aperiam repellat, corporis consequatur
                  quas laboriosam dolorem. Neque, quos.
                </p>
              </div>
              <div className="rounded-3xl px-5 py-2 shadow">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                  fugit eligendi incidunt vero laborum vitae voluptate nemo!
                  Commodi eveniet, dignissimos laboriosam velit, non dolorem
                  doloribus labore, dicta laudantium animi beatae?
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-row justify-stretch items-center gap-1 py-2">
                <div className="flex-grow border-y-2 border-purple-800"></div>
                <h2 className="text-5xl font-bold">REVIEWS</h2>
                <div className="flex-grow border-y-2 border-purple-800"></div>
              </div>
              {userReview ? (
                <Fragment>
                  <div className="flex flex-row gap-5">
                    <Review />
                    <div className="flex flex-col justify-start items-stretch gap-5">
                      <button
                        type="button"
                        className="border-none rounded-3xl bg-purple-800 text-white px-5 py-2"
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
                </Fragment>
              ) : (
                <>
                  <ReviewForm />
                </>
              )}
              <div className="my-4 border-y-2"></div>
              {true ? (
                <>
                  <div className="flex flex-col justify-center items-center px-5 py-2">
                    <Loading />
                    <p className="px-5 py-2 text-purple-800 font-bold">
                      Loading reviews...
                    </p>
                  </div>
                </>
              ) : validateArray(reviews) ? (
                <>
                  <div className="flex flex-row justify-start items-center gap-5">
                    {reviews.map((review) => (
                      <>
                        <Review />
                      </>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p>No reviews yet.</p>
                  </div>
                </>
              )}
            </div>
          </Fragment>
        ) : (
          <>
            <div>
              <p>ERROR. No game found.</p>
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
};

export default GamePage;
