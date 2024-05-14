import React, { Fragment } from "react";
import useReviews from "../hooks/useReviews";
import { FaStar } from "react-icons/fa6";

const ReviewForm = () => {
  const { reviewForm, reviewFormErrors, updateReviewForm, handleReviewSubmit } = useReviews();

  return (
    <>
      <div>
        <form>
          <div className="flex flex-row justify-stretch items-center gap-1">
            {[...Array(5)].map((e, i) => (
              <Fragment key={i}>
                <FaStar
                  size={24}
                  color={
                    i + 1 <= reviewForm.score
                      ? "rgb(107 33 168)"
                      : "rgb(107 114 128)"
                  }
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
              className="accent-purple-800"
              onChange={(e) => updateReviewForm(e.target)}
            />
            <label htmlFor="spoiler" className="ml-1">
              Check if the review contains spoilers.
            </label>
          </div>
          <textarea
            name="message"
            id="message"
            value={reviewForm.message || ""}
            placeholder="Write here..."
            className="outline-purple-800 rounded-3xl px-5 py-2 shadow"
            onChange={(e) => updateReviewForm(e.target)}
          ></textarea>
          <button
            type="button"
            className="rounded-3xl bg-purple-800 px-5 py-2 text-white shadow"
            onClick={() => {handleReviewSubmit('create')}}
          >
            Review
          </button>
        </form>
      </div>
    </>
  );
};

export default ReviewForm;
