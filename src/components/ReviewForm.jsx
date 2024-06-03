import React, { Fragment } from "react";
import useReviews from "../hooks/useReviews";
import { FaStar } from "react-icons/fa6";

const ReviewForm = ({ isUpdating = false }) => {
  const { reviewForm, reviewFormErrors, updateReviewForm, handleReviewSubmit } =
    useReviews();

  return (
    <>
      {isUpdating ? (
        <>
          <div className="border-y px-5 py-2">
            <form className="flex flex-col gap-5">
              <div className="flex gap-5">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-row justify-center items-center gap-1">
                    {[...Array(5)].map((e, i) => (
                      <Fragment key={i}>
                        <FaStar
                          size={48}
                          color={
                            i < reviewForm.score
                              ? "rgb(107 33 168)"
                              : "rgb(107 114 128)"
                          }
                          onMouseOver={(event) => {
                            updateReviewForm(event.target, i + 1);
                          }}
                        />
                      </Fragment>
                    ))}
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name="spoiler"
                      id="spoiler"
                      value={"true"}
                      checked={reviewForm.spoiler === "true"}
                      className="border-none focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-3xl accent-purple-600"
                      onChange={(e) => updateReviewForm(e.target)}
                    />
                    <label htmlFor="spoiler" className={`ml-2`}>
                      Check if the review contains spoilers.
                    </label>
                  </div>
                </div>
                <div className="flex-grow">
                  <textarea
                    name="message"
                    id="message"
                    value={reviewForm.message || ""}
                    placeholder="Write here..."
                    className={`resize-none w-full h-48 border-none focus:outline-none ${
                      reviewFormErrors.message
                        ? "ring-2 ring-red-600 focus:ring-red-600"
                        : "focus:ring-2 focus:ring-purple-600"
                    } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
                    onChange={(e) => updateReviewForm(e.target)}
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div>
            <form className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-row justify-center items-center gap-1">
                    {[...Array(5)].map((e, i) => (
                      <Fragment key={i}>
                        <FaStar
                          size={48}
                          color={
                            i < reviewForm.score
                              ? "rgb(107 33 168)"
                              : "rgb(107 114 128)"
                          }
                          onMouseOver={(event) => {
                            updateReviewForm(event.target, i + 1);
                          }}
                        />
                      </Fragment>
                    ))}
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name="spoiler"
                      id="spoiler"
                      value={"true"}
                      checked={reviewForm.spoiler === "true"}
                      className="border-none focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-3xl accent-purple-600"
                      onChange={(e) => updateReviewForm(e.target)}
                    />
                    <label htmlFor="spoiler" className={`ml-2`}>
                      Check if the review contains spoilers.
                    </label>
                  </div>
                  <div className="hidden md:block">
                    <button
                      type="button"
                      className="self-start rounded-3xl bg-purple-600 hover:bg-purple-400 px-5 py-2 text-gray-50 shadow transition-all duration-300"
                      onClick={() => {
                        handleReviewSubmit("create");
                      }}
                    >
                      Review
                    </button>
                  </div>
                </div>
                <div className="flex-grow">
                  <textarea
                    name="message"
                    id="message"
                    value={reviewForm.message || ""}
                    placeholder="Write here..."
                    className={`resize-none w-full h-48 border-none focus:outline-none ${
                      reviewFormErrors.message
                        ? "ring-2 ring-red-600 focus:ring-red-600"
                        : "focus:ring-2 focus:ring-purple-600"
                    } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
                    onChange={(e) => updateReviewForm(e.target)}
                  ></textarea>
                </div>
              </div>
              <div className="block md:hidden">
                <button
                  type="button"
                  className="self-start rounded-3xl bg-purple-600 hover:bg-purple-400 px-5 py-2 text-gray-50 shadow transition-all duration-300"
                  onClick={() => {
                    handleReviewSubmit("create");
                  }}
                >
                  Review
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ReviewForm;
