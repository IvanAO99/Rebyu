import React from "react";
import { FaX } from "react-icons/fa6";

import useReviews from "../hooks/useReviews.js";
import ReviewForm from "./ReviewForm.jsx";

const ReviewFormModal = () => {
  const {
    reviewForm,
    reviewFormErrors,
    updateReviewForm,
    hideReviewFormModal,
    handleReviewSubmit,
  } = useReviews();

  return (
    <>
      <div className="rounded-3xl bg-gray-50 dark:bg-gray-700 p-2 text-gray-900 dark:text-gray-50 shadow">
        <div className="flex flex-row justify-between items-center gap-5 px-5 py-2">
          <h1 className="text-6xl font-bold text-center">UPDATE REVIEW</h1>
          <button
            type="button"
            className="rounded-full hover:bg-gray-800 p-2 text-gray-900 dark:text-gray-50"
            onClick={() => hideReviewFormModal()}
          >
            <FaX size={24} />
          </button>
        </div>
        <ReviewForm isUpdating={true} />
        <div>
          <div className="flex flex-row justify-end items-center gap-5 px-5 py-2">
            <button
              type="button"
              className="rounded-3xl bg-purple-600 hover:bg-purple-400 px-5 py-2 text-gray-50 shadow"
              onClick={() => {
                handleReviewSubmit("update");
              }}
            >
              Update
            </button>
            <button
              type="button"
              className="rounded-3xl bg-gray-800 hover:bg-gray-600 px-5 py-2 text-gray-50 shadow"
              onClick={() => hideReviewFormModal()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewFormModal;
