import React, { createContext, useEffect, useState } from "react";

import { supabaseConnection } from "../.config/supabase.js";
import { toast, Slide } from "react-toastify";

import useUsers from "../hooks/useUsers.js";
import useGames from "../hooks/useGames.js";

import AlertIcon from "../components/AlertIcon.jsx";

import regex from "../jsons/regex.json";

import score_review from "../model/CohereModel.js";

import { validateArray, validateObject } from "../libraries/validateData.js";

const ReviewsContext = createContext();

const ReviewsProvider = ({ children }) => {
  const { isSessionUp, user, isAdmin } = useUsers();
  const { game, refreshGames, getTopGames } = useGames();

  /* INITIAL STATES VALUES */

  const initialValues = {
    reviewForm: {
      score: "0",
      message: "",
      spoiler: "false",
      edited: "false",
      ia_score: "",
    },
    reviewFormErrors: {},
    isReviewFormModalOpen: false,
    updatingReview: false,
    deletingReview: false,
    isLoadingReviews: false,
    reviews: [],
    isLoadingLastReviews: false,
    lastReviews: [],
    userReview: {},
    reviewsWithLikes: [],
    allReviews: [],
    allReviewsWithLike: [],
    filteredReviews: [],
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
  const [isDeleteReviewModalOpen, setIsDeleteReviewModalOpen] = useState(
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
  const [userReview, setUserReview] = useState(initialValues.userReview);

  const [reviewsWithLikes, setReviewsWithLikes] = useState(
    initialValues.reviewsWithLikes
  );

  const [filteredReviews, setFilteredReviews] = useState(
    initialValues.filteredReviews
  );

  const [filteredByUserAndMessage, setFilteredByUserAndMessage] = useState([]);

  /* FUNCTIONS */

  /**
   * Filters reviews by user nickname or review message.
   *
   * @param {Array} reviews - An array of review objects.
   * @param {string} searchTerm - The search term to filter reviews by.
   *
   * @returns {Array} - An array of filtered review objects.
   *
   */
  const filterReviewsByUserAndMessage = (reviews, searchTerm) => {
    return reviews.filter(
      ({ reviews, users }) =>
        users.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reviews.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  /**
   * Handles filtering reviews by user nickname or review message based on the given search term.
   *
   * @param {string} searchTerm - The search term to filter reviews by.
   *
   */
  const handleFilter = (searchTerm) => {
    if (!searchTerm) {
      setFilteredByUserAndMessage(filteredReviews);
      return;
    }

    const filtered = filterReviewsByUserAndMessage(filteredReviews, searchTerm);
    setFilteredByUserAndMessage(filtered);
  };

  /**
   * Display a toast notification for review-related actions.
   *
   * @param {string} type - The type of alert ("success" or "error").
   * @param {string} message - The message to display in the notification.
   *
   */
  const sendReviewAlert = (type, message) => {
    const notify = () => {
      switch (type) {
        case "success":
          toast.success(message, {
            position: isAdmin ? "top-right" : "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            icon: AlertIcon,
            transition: Slide,
          });
          break;
        case "error":
          toast.error(message, {
            position: isAdmin ? "top-right" : "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            icon: AlertIcon,
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

  /**
   * Handles liking or unliking a review.
   *
   * @param {string} reviewId - The ID of the review to like or unlike.
   *
   */
  const handleLikes = async (reviewId) => {
    if (isSessionUp & validateObject(user)) {
      try {
        const { data: existingLike, error: existingLikeError } =
          await supabaseConnection
            .from("review_likes")
            .select("*")
            .eq("user_id", user.id)
            .eq("review_id", reviewId);

        if (existingLikeError) throw existingLikeError;

        if (existingLike && existingLike.length > 0) {
          await removeLikeFromReview(reviewId);
        } else {
          await likeAReview(reviewId);
        }
      } catch (error) {
        sendReviewAlert("error", "Something went wrong!");
      }
    }
  };

  /**
   * Likes a review.
   *
   * @param {string} reviewId - The ID of the review to like.
   *
   */
  const likeAReview = async (reviewId) => {
    try {
      const { data, error } = await supabaseConnection
        .from("review_likes")
        .insert({
          user_id: user.id,
          review_id: reviewId,
        })
        .select();

      if (error) throw error;

      getReviewsByGame();
    } catch (error) {
      sendReviewAlert("error", "Something went wrong!");
    }
  };

  /**
   * Removes a like from a review.
   *
   * @param {string} reviewId - The ID of the review from which to remove the like.
   */
  const removeLikeFromReview = async (reviewId) => {
    try {
      const { data, error } = await supabaseConnection
        .from("review_likes")
        .delete()
        .eq("user_id", user.id)
        .eq("review_id", reviewId)
        .select();

      if (error) throw error;

      getReviewsByGame();
    } catch (error) {
      sendReviewAlert("error", "Something went wrong!");
    }
  };

  /**
   * Retrieves all reviews including associated users and reviews.
   *
   */
  const getAllReviews = async () => {
    try {
      setReviewsWithLikes(initialValues.reviews);
      setIsLoadingReviews(true);

      const { data, error } = await supabaseConnection
        .from("user_game_review")
        .select("*, reviews(*), users(*)")
        .order("reviews(date_time)", { ascending: false });

      if (error) throw error;

      setReviews(data);
    } catch (error) {
      sendReviewAlert("error", "Something went wrong!");
    } finally {
      setIsLoadingReviews(initialValues.isLoadingReviews);
    }
  };

  /**
   * Deletes a user review by its ID.
   *
   * @param {string} reviewId - The ID of the review to delete.
   */
  const deleteUserReview = async (reviewId) => {
    try {
      const { data, error } = await supabaseConnection
        .from("reviews")
        .delete()
        .eq("id", reviewId)
        .select();

      if (error) throw error;

      sendReviewAlert("success", "Review deleted successfully!");
      setDeletingReview(initialValues.deletingReview);
    } catch (error) {
      sendReviewAlert("error", "The review could not be deleted!");
    } finally {
      getAllReviews();
    }
  };

  /**
   * Retrieves the user's review for a specific game.
   *
   */
  const getUserReview = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("user_game_review")
        .select("*, reviews(*), users(*)")
        .eq("user_id", user.id)
        .eq("game_id", game.id);

      if (error) throw error;

      if (validateArray(data)) {
        setUserReview(data[0]);
      } else {
        setUserReview(initialValues.userReview);
      }
    } catch (error) {
      sendReviewAlert("error", "Something went wrong!");
    }
  };

  /**
   * Retrieves the last 24 reviews.
   *
   */
  const getLastReviews = async () => {
    try {
      setIsLoadingLastReviews(true);

      const { data, error } = await supabaseConnection
        .from("user_game_review")
        .select("*, reviews(*), users(*)")
        .order("reviews(date_time)", { ascending: false })
        .range(0, 24);

      if (error) throw error;

      setLastReviews(data);
    } catch (error) {
      sendReviewAlert("error", "Something went wrong!");
    } finally {
      setIsLoadingLastReviews(initialValues.isLoadingLastReviews);
    }
  };

  /**
   * Retrieves the number of likes for a given review.
   *
   * @param {string} reviewID - The ID of the review to retrieve likes for.
   *
   * @returns {number} - The number of likes for the specified review.
   *
   */
  const getReviewLikes = async (reviewID) => {
    try {
      const { data, error } = await supabaseConnection
        .from("review_likes")
        .select("count")
        .eq("review_id", reviewID);

      if (error) throw error;

      return data[0].count;
    } catch (error) {
      return 0;
    }
  };

  /**
   * Fetches reviews from the "reviews" table for a specific game, including details of the associated game and reviewer,
   * and updates the state accordingly.
   *
   * @param {string} gameID - The ID of the game for which reviews are fetched.
   *
   */
  const getReviewsByGame = async (gameID) => {
    try {
      setReviewsWithLikes(initialValues.reviews);
      setIsLoadingReviews(true);

      const { data, error } = await supabaseConnection
        .from("user_game_review")
        .select("*, reviews(*), users(*)")
        .eq("game_id", game.id)
        .order("reviews(date_time)", { ascending: false });

      if (error) throw error;

      setReviews(data);
    } catch (error) {
      sendReviewAlert("error", "Something went wrong!");
    } finally {
      setIsLoadingReviews(initialValues.isLoadingReviews);
    }
  };

  const createUserReview = async (reviewId) => {
    try {
      const { data, error } = await supabaseConnection
        .from("user_game_review")
        .insert({
          user_id: user.id,
          game_id: game.id,
          review_id: reviewId,
        })
        .select();

      if (error) throw error;

      getUserReview();
      getReviewsByGame();
      refreshGames();
      getTopGames();
      getLastReviews();
    } catch (error) {
      console.log(error);
      sendReviewAlert("error", "Something went wrong!");
    }
  };

  /**
   * Creates a new review by inserting the review form data into the "reviews" table,
   * associates it with the current game and user, and updates the state accordingly.
   *
   */
  const createReview = async () => {
    try {
      let ia_score = await score_review(reviewForm["message"]);

      const { data, error } = await supabaseConnection
        .from("reviews")
        .insert({ ...reviewForm, ["ia_score"]: ia_score })
        .select();

      if (error) throw error;

      createUserReview(data[0].id);

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

  /**
   * Updates an existing review in the "reviews" table by replacing the existing data with the updated review form data,
   * and updates the state accordingly.
   *
   */
  const updateReview = async () => {
    try {
      let ia_score = await score_review(reviewForm["message"]);

      const { data, error } = await supabaseConnection
        .from("reviews")
        .update({ ...reviewForm, ["ia_score"]: ia_score, edited: true })
        .eq("id", reviewForm.id)
        .select();

      if (error) throw error;

      sendReviewAlert("success", "Review updated successfully!");
      getUserReview(game.id);
      getReviewsByGame(game.id);
      refreshGames();
      getTopGames();
      getLastReviews();

      setIsReviewFormModalOpen(initialValues.isReviewFormModalOpen);
    } catch (error) {
      sendReviewAlert("error", "The review could not be updated!");
    } finally {
      setReviewForm(initialValues.reviewForm);
      setReviewFormErrors(initialValues.reviewFormErrors);
    }
  };

  /**
   * Deletes a review from the "reviews" table based on the review ID,
   * updates the state accordingly, and displays an alert.
   *
   */
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
      refreshGames();
      getTopGames();
      getLastReviews();
    } catch (error) {
      sendReviewAlert("error", "The review could not be deleted!");
    } finally {
      getUserReview();
      getReviewsByGame(game.id);

      setReviewForm(initialValues.reviewForm);
      setReviewFormErrors(initialValues.reviewFormErrors);
    }
  };

  /* FUNCTIONS */

  /**
   * Retrieves a specific review from the state based on its ID
   * and updates the review form for further actions.
   *
   * @param {number} id - The ID of the review to be retrieved.
   *
   */
  const getReviewByID = (id) => {
    if (validateArray(reviews)) {
      const wantedReview = reviewsWithLikes.find(
        (review) => review.review_id === id
      );

      if (isSessionUp && validateObject(user) && isAdmin) {
        setReviewForm(wantedReview);
      } else {
        setReviewForm(wantedReview.reviews);
      }
    }
  };

  /**
   * Displays the review form modal for either creating or updating a review.
   *
   * @param {boolean} isUpdate - Indicates whether the operation is for updating an existing review.
   * @param {number} id - The ID of the review to be updated. Required if isUpdate is true.
   *
   */
  const showReviewFormModal = (isUpdate, id = null) => {
    if (isUpdate && id) {
      getReviewByID(id);
      setUpdatingReview(true);
    } else {
      setUpdatingReview(initialValues.updatingReview);
    }

    setIsReviewFormModalOpen(true);
  };

  /**
   * Hides the review form modal and resets relevant states.
   *
   */
  const hideReviewFormModal = () => {
    setUpdatingReview(initialValues.updatingReview);
    setIsReviewFormModalOpen(initialValues.isReviewFormModalOpen);

    setReviewForm(initialValues.reviewForm);
    setReviewFormErrors(initialValues.reviewFormErrors);
  };

  /**
   * Displays the review delete confirmation modal.
   *
   * @param {number} id - The ID of the review to be deleted.
   *
   */
  const showReviewDeleteModal = (id) => {
    getReviewByID(id);
    setDeletingReview(true);
  };

  /**
   * Hides the review delete confirmation modal and resets relevant states.
   *
   */
  const hideReviewDeleteModal = () => {
    setDeletingReview(initialValues.deletingReview);
    setReviewForm(initialValues.reviewForm);
  };

  /**
   * Updates the review form state based on the input values.
   *
   * @param {Object} input - The input event object containing name and value.
   *
   */
  const updateReviewForm = (input, score = null) => {
    if (score) {
      setReviewForm({
        ...reviewForm,
        score: score,
      });
    } else {
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
    }
  };

  /**
   * Validates the review form fields and returns validation errors if any.
   *
   * @returns {Object} - Validation errors object. Empty object if there are no errors.
   *
   */
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

  /**
   * Handles the submission of the review form based on the specified operation.
   *
   * @param {string} operation - The operation to perform ("create", "update", or "delete").
   *
   */
  const handleReviewSubmit = (operation) => {
    const validationErrors = validateReviewForm();

    if (
      isSessionUp &&
      validateObject(user) &&
      isAdmin &&
      validateObject(reviewForm)
    ) {
      deleteUserReview(reviewForm.reviews.id);
    } else if (validateObject(validationErrors)) {
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

  /**
   * Filters reviews based on the specified filter type.
   *
   * @param {string} filterType - The type of filter to apply ("positive", "negative", or any other value for no filtering).
   *
   */
  const filterReviews = (filterType) => {
    let filteredReviews = [];
    let sortedReviews = [];

    switch (filterType) {
      case "positive":
        filteredReviews = reviewsWithLikes.filter(
          (review) => review.reviews.ia_score >= 0
        );
        sortedReviews = filteredReviews.sort(
          (a, b) => b.reviews.ia_score - a.reviews.ia_score
        );
        break;
      case "negative":
        filteredReviews = reviewsWithLikes.filter(
          (review) => review.reviews.ia_score < 0
        );
        sortedReviews = filteredReviews.sort(
          (a, b) => b.reviews.ia_score - a.reviews.ia_score
        );
        break;
      default:
        sortedReviews = reviewsWithLikes;
        break;
    }

    setFilteredReviews(sortedReviews);
  };

  /**
   * Updates the filtered reviews when `filteredReviews` changes.
   *
   */
  useEffect(() => {
    setFilteredByUserAndMessage(filteredReviews);
  }, [filteredReviews]);

  /**
   * Updates the filtered reviews when `reviewsWithLikes` changes.
   *
   */
  useEffect(() => {
    setFilteredReviews(reviewsWithLikes);
  }, [reviewsWithLikes]);

  /**
   * Fetches review likes for each review in the `reviews` array and updates `reviewsWithLikes`.
   *
   */
  useEffect(() => {
    if (validateArray(reviews)) {
      const fetchLikes = async () => {
        const promises = reviews.map(async (review) => {
          const likes = await getReviewLikes(review.review_id);
          return { ...review, likes };
        });
        const reviewsWithLikes = await Promise.all(promises);
        setReviewsWithLikes(reviewsWithLikes);
      };

      fetchLikes();
    }
  }, [reviews]);

  /**
   * Effect hook to fetch the latest reviews when the component mounts.
   *
   */
  useEffect(() => {
    getLastReviews();
  }, []);

  /**
   * Effect hook to fetch reviews associated with the current game whenever the 'game' prop changes.
   *
   */
  useEffect(() => {
    setUserReview(initialValues.userReview);
    if (validateObject(game)) {
      if (user.id) {
        getUserReview();
      }
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
    isLoadingLastReviews,
    lastReviews,
    showReviewFormModal,
    hideReviewFormModal,
    updateReviewForm,
    showReviewDeleteModal,
    hideReviewDeleteModal,
    handleReviewSubmit,
    userReview,
    reviewsWithLikes,
    handleLikes,
    getAllReviews,
    filteredReviews,
    filterReviews,
    deleteUserReview,
    filteredByUserAndMessage,
    handleFilter,
  };

  return (
    <ReviewsContext.Provider value={reviewsData}>
      {children}
    </ReviewsContext.Provider>
  );
};

export default ReviewsProvider;
export { ReviewsContext };
