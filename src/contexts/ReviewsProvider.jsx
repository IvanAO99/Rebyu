import React, { createContext, useEffect, useState } from "react";
import { supabaseConnection } from "../.config/supabase";
import useUsers from "../hooks/useUsers";

import regex from "../jsons/regex.json";

import { validateObject } from "../libraries/validateData";

const ReviewsContext = createContext();

const ReviewsProvider = ({ children }) => {
  const { user } = useUsers();

  /* INITIAL STATES VALUES */
  const initialValues = {
    reviewForm: {
      game_id: "",
      score: "",
      message: "",
      spoiler: "false",
    },
    reviewFormErrors: {},
    isReviewFormModalOpen: false,
    isLoadingReviews: false,
    reviews: [],
  };

  /* STATES */
  const [reviewForm, setReviewForm] = useState(initialValues.reviewForm);
  const [reviewFormErrors, setReviewFormErrors] = useState(
    initialValues.reviewFormErrors
  );
  const [isReviewFormModalOpen, setIsReviewFormModalOpen] = useState(
    initialValues.isReviewFormModalOpen
  );
  const [isLoadingReviews, setIsLoadingReviews] = useState(
    initialValues.isLoadingReviews
  );
  const [reviews, setReviews] = useState(initialValues.reviews);

  /* SUPABASE FETCHS */
  const getReviews = async () => {
    try {
      setReviews(initialValues.reviews);

      const { data, error } = await supabaseConnection
        .from("reviews")
        .select("*");

      if (error) throw error;

      console.log(data);

      setReviews(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const createReview = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("reviews")
        .insert({ ...reviewForm, user_id: user.id })
        .select();

      if (error) throw error;

      console.log(data);
      getReviews();
      setIsReviewFormModalOpen(initialValues.isReviewFormModalOpen);
    } catch (error) {
      console.log(error.message);
    }
  };

  /* FUNCTIONS */
  const showReviewFormModal = () => {
    setIsReviewFormModalOpen(true);
  };

  const hideReviewFormModal = () => {
    setIsReviewFormModalOpen(initialValues.isReviewFormModalOpen);
  };

  const updateReviewForm = (input) => {
    const { name, value } = input;

    console.log(`${name} : ${value}`);

    if (name === "spoiler") {
      setReviewForm({
        ...reviewForm,
        [name]: reviewForm[name] === "false" ? value : "false",
      });
      setReviewFormErrors({ ...reviewFormErrors, [name]: null });
    } else {
      setReviewForm({ ...reviewForm, [name]: value });
      setReviewFormErrors({ ...reviewFormErrors, [name]: null });
    }
  };

  const validateReviewForm = () => {
    let validationErrors = {};

    if (!reviewForm.score) {
      validationErrors = {
        ...validationErrors,
        score: "The score field is required.",
      };
    } else if (!new RegExp(regex.reviewForm.score).test(reviewForm.score)) {
      validationErrors = {
        ...validationErrors,
        score: "The score must be between 0 and 10.",
      };
    }

    if (!reviewForm.message) {
      validationErrors = {
        ...validationErrors,
        message: "The message field is required.",
      };
    }

    return validationErrors;
  };

  const handleReviewSubmit = () => {
    const validationErrors = validateReviewForm();

    if (validateObject(validationErrors)) {
      setReviewFormErrors(validationErrors);
    } else {
      setReviewFormErrors(initialValues.reviewFormErrors);
      createReview();
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  /* CONTEXT DATA */
  const reviewsData = {
    reviewForm,
    reviewFormErrors,
    isReviewFormModalOpen,
    isLoadingReviews,
    reviews,
    showReviewFormModal,
    hideReviewFormModal,
    updateReviewForm,
    handleReviewSubmit,
  };

  return (
    <ReviewsContext.Provider value={reviewsData}>
      {children}
    </ReviewsContext.Provider>
  );
};

export default ReviewsProvider;
export { ReviewsContext };
