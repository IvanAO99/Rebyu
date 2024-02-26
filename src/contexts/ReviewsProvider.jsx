import React, { createContext, useEffect, useState } from "react";
import { supabaseConnection } from "../.config/supabase";
import useUsers from "../hooks/useUsers";

import regex from "../jsons/regex.json";

import { validateArray, validateObject } from "../libraries/validateData";
import useGames from "../hooks/useGames";

const ReviewsContext = createContext();

const ReviewsProvider = ({ children }) => {
  const { user } = useUsers();
  const { game } = useGames();

  /* INITIAL STATES VALUES */
  const initialValues = {
    reviewForm: {
      game_id: "",
      score: "0",
      message: "",
      spoiler: "false",
    },
    reviewFormErrors: {},
    isReviewFormModalOpen: false,
    updatingReview: false,
    deletingReview: false,
    isLoadingReviews: false,
    reviews: [],
  };

  /* STATES */
  const [reviewForm, setReviewForm] = useState(initialValues.reviewForm);
  const [reviewFormErrors, setReviewFormErrors] = useState(
    initialValues.reviewFormErrors
  );
  const [updatingReview, setUpdatingReview] = useState(
    initialValues.updatingReview
  );
  const [deletingReview, setDeletingReview] = useState(
    initialValues.deletingReview
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
      setIsLoadingReviews(true);

      const { data, error } = await supabaseConnection
        .from("reviews")
        .select("*");

      if (error) throw error;

      console.log(data);

      setReviews(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingReviews(initialValues.isLoadingReviews);
    }
  };

  const getReviewsByGame = async (gameID) => {
    try {
      setReviews(initialValues.reviews);
      setIsLoadingReviews(true);

      const { data, error } = await supabaseConnection
        .from("reviews")
        .select("*, game:game_id (*), reviewer:user_id (*)")
        .eq("game_id", gameID);

      if (error) throw error;

      console.log(data);

      setReviews(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingReviews(initialValues.isLoadingReviews);
    }
  };

  const createReview = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("reviews")
        .insert({ ...reviewForm, game_id: game.id, user_id: user.id })
        .select();

      if (error) throw error;

      console.log(data);
      getReviewsByGame(game.id);
      setIsReviewFormModalOpen(initialValues.isReviewFormModalOpen);
    } catch (error) {
      console.log(error);
    } finally {
      setReviewForm(initialValues.reviewForm);
      setReviewFormErrors(initialValues.reviewFormErrors);
    }
  };

  const updateReview = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("reviews")
        .update({ ...reviewForm, edited: true })
        .eq("id", reviewForm.id)
        .select();

      if (error) throw error;

      console.log(data);
      getReviewsByGame(game.id);
      //getReviews();
      setIsReviewFormModalOpen(initialValues.isReviewFormModalOpen);
    } catch (error) {
      console.log("UPDATE ERROR:");
      console.log(error);
    } finally {
      setReviewForm(initialValues.reviewForm);
      setReviewFormErrors(initialValues.reviewFormErrors);
    }
  };

  const deleteReview = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("reviews")
        .delete()
        .eq("id", reviewForm.id)
        .select();

      if (error) throw error;

      console.log(data);
      setDeletingReview(initialValues.deletingReview);
    } catch (error) {
      console.log("DELETE ERROR:");
      console.log(error);
    } finally {
      //getReviews();
      getReviewsByGame(game.id);
      setReviewForm(initialValues.reviewForm);
      setReviewFormErrors(initialValues.reviewFormErrors);
    }
  };

  /* FUNCTIONS */
  const getReviewByID = (id) => {
    if (validateArray(reviews)) {
      const wantedReview = reviews.find((review) => review.id === id);
      setReviewForm(wantedReview);
    }
  };

  const showReviewFormModal = (isUpdate, id = null) => {
    if (isUpdate && id) {
      getReviewByID(id);
      setUpdatingReview(true);
    } else {
      setUpdatingReview(initialValues.updatingReview);
    }

    setIsReviewFormModalOpen(true);
  };

  const hideReviewFormModal = () => {
    setUpdatingReview(initialValues.updatingReview);
    setIsReviewFormModalOpen(initialValues.isReviewFormModalOpen);

    setReviewForm(initialValues.reviewForm);
    setReviewFormErrors(initialValues.reviewFormErrors);
  };

  const showReviewDeleteModal = (id) => {
    getReviewByID(id);
    setDeletingReview(true);
  };

  const hideReviewDeleteModal = () => {
    setDeletingReview(initialValues.deletingReview);
    setReviewForm(initialValues.reviewForm);
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

  const handleReviewSubmit = (operation) => {
    const validationErrors = validateReviewForm();

    if (validateObject(validationErrors)) {
      setReviewFormErrors(validationErrors);
    } else {
      setReviewFormErrors(initialValues.reviewFormErrors);

      switch (operation) {
        case "create":
          createReview();
          break;
        case "update":
          updateReview();
          break;
        case "delete":
          deleteReview();
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (validateObject(game)) {
      console.log(game);
      console.log(game.id);

      getReviewsByGame(game.id);
    }
  }, [game]);

  /* CONTEXT DATA */
  const reviewsData = {
    reviewForm,
    reviewFormErrors,
    isReviewFormModalOpen,
    updatingReview,
    deletingReview,
    isLoadingReviews,
    reviews,
    showReviewFormModal,
    hideReviewFormModal,
    updateReviewForm,
    showReviewDeleteModal,
    hideReviewDeleteModal,
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
