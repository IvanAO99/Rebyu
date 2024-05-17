import React, { createContext, useEffect, useState } from "react";

import { supabaseConnection } from "../.config/supabase.js";

import { toast, Slide } from "react-toastify";

import useUsers from "../hooks/useUsers.js";
import useGames from "../hooks/useGames.js";

import regex from "../jsons/regex.json";

import { validateArray, validateObject } from "../libraries/validateData.js";

import Sentiment from 'sentiment';

const ReviewsContext = createContext();

const ReviewsProvider = ({ children }) => {
  const { user } = useUsers();
  const { game } = useGames();

  const sentiment = new Sentiment();

  /* INITIAL STATES VALUES */

  const initialValues = {
    reviewForm: {
      score: "4",
      message: "",
      spoiler: "false",
      edited: "false",
      ia_score: ""
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
    reviewsWithLikes: []
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
  const [userReview, setUserReview] = useState(initialValues.userReview)

  const [reviewsWithLikes, setReviewsWithLikes] = useState(initialValues.reviewsWithLikes);

  /**
   * Display a toast notification for review-related actions.
   * @param {string} type - The type of alert ("success" or "error").
   * @param {string} message - The message to display in the notification.
   */
  const sendReviewAlert = (type, message) => {
    /**
     * Show a toast notification based on the provided type and message.
     * @param {string} type - The type of alert ("success" or "error").
     * @param {string} message - The message to display in the notification.
     */
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


  const handleLikes = async (reviewId) => {
    try {
      const { data: existingLike, error: existingLikeError } = await supabaseConnection
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
      console.log(error);
    }
  }

    // Función para dar like a una review
  const likeAReview = async (reviewId) => {
    try {
      const { data, error } = await supabaseConnection
        .from("review_likes")
        .insert({
          user_id: user.id,
          review_id: reviewId
        })
        .select();

      if (error) throw error;

      // Actualizar las reviews después de dar like
      getReviewsByGame();
    } catch (error) {
      console.log(error);
    }
  }

  const removeLikeFromReview = async (reviewId) => {
    try {
      const { data, error } = await supabaseConnection
        .from("review_likes")
        .delete()
        .eq("user_id", user.id)
        .eq("review_id", reviewId)
        .select();
  
      if (error) throw error;
  
      // Actualizar las reviews después de quitar el like
      getReviewsByGame();
    } catch (error) {
      console.log(error);
    }
  }

/*   const likeAReview = async (reviewId) => {
    try {
      const { data, error } = await supabaseConnection
        .from("review_likes")
        .insert({
          user_id: user.id,
          review_id: reviewId
        })
        .select();

        if (error) throw error;

        getReviewsByGame();

    } catch (error) {
      console.log(error)
    }
  } */


  const getUserReview = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("user_game_review")
        .select("*, reviews(*), users(*)")
        .eq("user_id", user.id)
        .eq("game_id", game.id);

        if (validateArray(data)) {
          setUserReview(data[0])
        } else {
          setUserReview(initialValues.userReview)
        }

    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Fetches reviews from the "reviews" table and updates the state accordingly.
   */
  const getReviews = async () => {
    try {
      // Reset reviews and set loading state
      setReviews(initialValues.reviews);
      setIsLoadingReviews(true);

      // Fetch reviews from the "reviews" table
      const { data, error } = await supabaseConnection
        .from("reviews")
        .select("*");

      if (error) throw error;

      // Update reviews state with fetched data
      setReviews(data);
    } catch (error) {
      // Display an error alert if something goes wrong
      sendReviewAlert(
        "error",
        "Something went wrong, please wait and try again."
      );
    } finally {
      // Reset loading state
      setIsLoadingReviews(initialValues.isLoadingReviews);
    }
  };

  /**
   * Fetches the last reviews from the "reviews" table, including details of the associated game and reviewer,
   * and updates the state accordingly.
   */
/*   const getLastReviews = async () => {
    try {
      // Set loading state
      setIsLoadingLastReviews(true);

      // Fetch last reviews from the "reviews" table with game and reviewer details
      let { data, error } = await supabaseConnection
        .from("reviews")
        .select("*, game:game_id (*), reviewer:users (*)")
        .order("date_time", { ascending: false })
        .range(0, 20);

      if (error) throw error;

      // Update last reviews state with fetched data
      setLastReviews(data);
    } catch (error) {
      // Display an error alert if something goes wrong
      sendReviewAlert(
        "error",
        "Something went wrong, please wait and try again."
      );
    } finally {
      // Reset loading state
      setIsLoadingLastReviews(initialValues.isLoadingLastReviews);
    }
  }; */

  const getReviewLikes = async (reviewID) => {
    try {
      const { data, error } = await supabaseConnection
        .from("review_likes")
        .select("count")
        .eq("review_id", reviewID);

      //console.log(data)

      if (error) throw error;

      //console.log(data[0].count)
      return data[0].count;

    } catch (error) {
      return 0;
    }
  }

  /**
   * Fetches reviews from the "reviews" table for a specific game, including details of the associated game and reviewer,
   * and updates the state accordingly.
   * @param {string} gameID - The ID of the game for which reviews are fetched.
   */
  const getReviewsByGame = async (gameID) => {
    try {
      // Reset reviews and set loading state
      //setReviews(initialValues.reviews);
      setReviewsWithLikes(initialValues.reviews);
      setIsLoadingReviews(true);

      // Fetch reviews from the "reviews" table with game and reviewer details for a specific game
      const { data, error } = await supabaseConnection
        .from("user_game_review")
        .select("*, reviews(*), users(*)")
        .eq("game_id", game.id);

      if (error) throw error;
      //console.log(data)
      // Update reviews state with fetched data
      setReviews(data);
    } catch (error) {
      // Display an error alert if something goes wrong
      sendReviewAlert(
        "error",
        "Something went wrong, please wait and try again."
      );
    } finally {
      // Reset loading state
      setIsLoadingReviews(initialValues.isLoadingReviews);
    }
  };


  const createUserReview = async (reviewId) => {
    try {
      // Insert the review form data into the "reviews" table and associate it with the current game and user
      const { data, error } = await supabaseConnection
        .from("user_game_review")
        .insert({
          user_id: user.id,
          game_id: game.id,
          review_id: reviewId
        })
        .select();

      if (error) throw error;

      getUserReview();
      getReviewsByGame();

    } catch (error) {
      console.log(error)
    }
  }

  const analize_review = (reviewPhrase) => {
    let result = sentiment.analyze(reviewPhrase)['score'];
    return result
  }

  /**
   * Creates a new review by inserting the review form data into the "reviews" table,
   * associates it with the current game and user, and updates the state accordingly.
   */
  const createReview = async () => {
    try {

      let ia_score = analize_review(reviewForm['message']);

      // Insert the review form data into the "reviews" table and associate it with the current game and user
      const { data, error } = await supabaseConnection
        .from("reviews")
        .insert({ ...reviewForm, ["ia_score"]: ia_score })
        .select();

      if (error) throw error;

      createUserReview(data[0].id)

      // Display a success alert and fetch reviews for the current game
      sendReviewAlert("success", "Review added successfully!");
      getReviewsByGame(game.id);

      // Close the review form modal
      setIsReviewFormModalOpen(initialValues.isReviewFormModalOpen);
    } catch (error) {
      // Display an error alert if something goes wrong
      sendReviewAlert("error", "The review could not be added!");
    } finally {
      // Reset review form and errors
      setReviewForm(initialValues.reviewForm);
      setReviewFormErrors(initialValues.reviewFormErrors);
    }
  };

  /**
   * Updates an existing review in the "reviews" table by replacing the existing data with the updated review form data,
   * and updates the state accordingly.
   */
  const updateReview = async () => {
    try {
      // Update the review in the "reviews" table based on the review ID
      const { data, error } = await supabaseConnection
        .from("reviews")
        .update({ ...reviewForm, edited: true })
        .eq("id", reviewForm.id)
        .select();

      if (error) throw error;

      // Display a success alert and fetch reviews for the current game
      sendReviewAlert("success", "Review updated successfully!");
      getReviewsByGame(game.id);

      // Close the review form modal
      setIsReviewFormModalOpen(initialValues.isReviewFormModalOpen);
    } catch (error) {
      // Display an error alert if something goes wrong
      sendReviewAlert("error", "The review could not be updated!");
    } finally {
      // Reset review form and errors
      setReviewForm(initialValues.reviewForm);
      setReviewFormErrors(initialValues.reviewFormErrors);
    }
  };

  /**
   * Deletes a review from the "reviews" table based on the review ID,
   * updates the state accordingly, and displays an alert.
   */
  const deleteReview = async () => {
    try {
      // Delete the review from the "reviews" table based on the review ID
      const { data, error } = await supabaseConnection
        .from("reviews")
        .delete()
        .eq("id", reviewForm.id)
        .select();

      if (error) throw error;

      // Display a success alert and reset the deletingReview state
      sendReviewAlert("success", "Review deleted successfully!");
      setDeletingReview(initialValues.deletingReview);
    } catch (error) {
      // Display an error alert if something goes wrong
      sendReviewAlert("error", "The review could not be deleted!");
    } finally {
      // Fetch reviews for the current game after deletion
      getReviewsByGame(game.id);

      // Reset review form and errors
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
   */
  const getReviewByID = (id) => {
    if (validateArray(reviews)) {
      const wantedReview = reviews.find((review) => review.id === id);
      setReviewForm(wantedReview);
    }
  };

  /**
   * Displays the review form modal for either creating or updating a review.
   *
   * @param {boolean} isUpdate - Indicates whether the operation is for updating an existing review.
   * @param {number} id - The ID of the review to be updated. Required if isUpdate is true.
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
   */
  const showReviewDeleteModal = (id) => {
    getReviewByID(id);
    setDeletingReview(true);
  };

  /**
   * Hides the review delete confirmation modal and resets relevant states.
   */
  const hideReviewDeleteModal = () => {
    setDeletingReview(initialValues.deletingReview);
    setReviewForm(initialValues.reviewForm);
  };

  /**
   * Updates the review form state based on the input values.
   *
   * @param {Object} input - The input event object containing name and value.
   */
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

  /**
   * Validates the review form fields and returns validation errors if any.
   *
   * @returns {Object} - Validation errors object. Empty object if there are no errors.
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
   */
  const handleReviewSubmit = (operation) => {
    /**
     * Validation errors for the review form.
     * @type {Object}
     */
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

/*   useEffect(() => {
    if (validateArray(reviews)) {
      let array = [];

      reviews.forEach(async (review) => {
        const likes = await getReviewLikes(review.review_id);
        const reviewWithLikes = { ...review, likes };
        array.push(reviewWithLikes); 
      });

      console.log(array)
      console.log(array.length)
      setReviewsWithLikes(array)
    }
  }, [reviews]) */

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
   */
/*   useEffect(() => {
    getLastReviews();
  }, []); */

  /**
   * Effect hook to fetch reviews associated with the current game whenever the 'game' prop changes.
   *
   * @param {Object} game - The current game object.
   */
  useEffect(() => {
    setUserReview(initialValues.userReview);
    if (validateObject(game)) {
      if(user.id) {
        getUserReview()
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
    handleLikes
  };

  return (
    <ReviewsContext.Provider value={reviewsData}>
      {children}
    </ReviewsContext.Provider>
  );
};

export default ReviewsProvider;
export { ReviewsContext };