import React, { createContext, useEffect, useState } from "react";

import { toast, Slide } from "react-toastify";

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
    isLoadingLastReviews: false,
    lastReviews: [],
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
  const [isLoadingLastReviews, setIsLoadingLastReviews] = useState(
    initialValues.isLoadingLastReviews
  );
  const [lastReviews, setLastReviews] = useState(initialValues.lastReviews);

  const sendReviewAlert = (type, message) => {
    const notify = () => {
      switch (type) {
        case "success":
          toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
          });
          break;
        case "error":
          toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
          });
          break;
        default:
          break;
      }
    };

    notify();
  };

  /* SUPABASE FETCHS */
  const getReviews = async () => {
    try {
      setReviews(initialValues.reviews);
      setIsLoadingReviews(true);

      const { data, error } = await supabaseConnection
        .from("reviews")
        .select("*");

      if (error) throw error;

      setReviews(data);
    } catch (error) {
      sendReviewAlert(
        "error",
        "Something went wrong, please wait and try again."
      );
    } finally {
      setIsLoadingReviews(initialValues.isLoadingReviews);
    }
  };

  const getLastReviews = async () => {
    try {
      setIsLoadingLastReviews(true);

      let { data, error } = await supabaseConnection
        .from("reviews")
        .select("*, game:game_id (*), reviewer:user_id (*)")
        .order("date_time", { ascending: false })
        .range(0, 20);

      if (error) throw error;

      setLastReviews(data);
    } catch (error) {
      sendReviewAlert(
        "error",
        "Something went wrong, please wait and try again."
      );
    } finally {
      setIsLoadingLastReviews(initialValues.isLoadingLastReviews);
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

      setReviews(data);
    } catch (error) {
      sendReviewAlert(
        "error",
        "Something went wrong, please wait and try again."
      );
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

      sendReviewAlert("success", "Review added successfully!");
      getReviewsByGame(game.id);
      setIsReviewFormModalOpen(initialValues.isReviewFormModalOpen);
    } catch (error) {
      sendReviewAlert("error", "The review could not be added!");
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

      sendReviewAlert("success", "Review updated successfully!");
      getReviewsByGame(game.id);
      //getReviews();
      setIsReviewFormModalOpen(initialValues.isReviewFormModalOpen);
    } catch (error) {
      sendReviewAlert("error", "The review could not be updated!");
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

      sendReviewAlert("success", "Review deleted successfully!");
      setDeletingReview(initialValues.deletingReview);
    } catch (error) {
      sendReviewAlert("error", "The review could not be deleted!");
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
    getLastReviews();
  }, []);

  useEffect(() => {
    if (validateObject(game)) {
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
    isLoadingLastReviews,
    lastReviews,
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
