import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast, Slide } from "react-toastify";

import { supabaseConnection } from "../.config/supabase.js";

import { validateObject } from "../libraries/validateData.js";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const navigate = useNavigate();

  const passwdRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* INITIAL STATES VALUES */
  const initialValues = {
    signInForm: {
      email: "",
      password: "",
    },
    signInFormErrors: {},
    signUpForm: {
      nickname: "",
      email: "",
      password: "",
      repeated_password: "",
      name: "",
      birth_date: "",
      profile_photo: "",
      terms_services: "",
    },
    signUpFormErrors: {},
    isSessionUp: false,
    user: {},
    isAdmin: false,
    isLoadingUser: false,
    isConfirmEmailOpen: false,
  };

  /* STATES */
  const [signInForm, setSignInForm] = useState(initialValues.signInForm);
  const [signInFormErrors, setSignInFormErrors] = useState(
    initialValues.signInFormErrors
  );
  const [signUpForm, setSignUpForm] = useState(initialValues.signUpForm);
  const [signUpFormErrors, setSignUpFormErrors] = useState(
    initialValues.signUpFormErrors
  );
  const [isSessionUp, setIsSessionUp] = useState(initialValues.isSessionUp);
  const [user, setUser] = useState(initialValues.user);
  const [isAdmin, setIsAdmin] = useState(initialValues.isAdmin);
  const [isLoadingUser, setIsLoadingUser] = useState(
    initialValues.isLoadingUser
  );
  const [isConfirmEmailOpen, setIsConfirmEmailOpen] = useState(
    initialValues.isConfirmEmailOpen
  );

  /* FUNCTIONS */

  /**
   * Display a toast notification to the user.
   * @param {string} type - The type of the alert ("info" or "error").
   * @param {string} message - The content of the alert message.
   * @returns {void}
   */
  const sendUserAlert = (type, message) => {
    /**
     * Notify the user using toast notifications.
     * @returns {void}
     */
    const notify = () => {
      switch (type) {
        case "info":
          toast.info(message, {
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

  /**
   * Update the sign-in form state based on the input value.
   * @param {Object} input - The input object containing the name and value.
   * @returns {void}
   */
  const updateSignInForm = (input) => {
    const { name, value } = input;

    setSignInForm({ ...signInForm, [name]: value });
    setSignInFormErrors({ ...signInFormErrors, [name]: null });
  };

  /**
   * Update the sign-up form state based on the input value.
   * If the input is for the "terms_services" checkbox, toggle its value.
   * @param {Object} input - The input object containing the name and value.
   * @returns {void}
   */
  const updateSignUpForm = (input) => {
    const { name, value } = input;

    if (name === "terms_services") {
      setSignUpForm({
        ...signUpForm,
        [name]: signUpForm[name] ? "" : value,
      });
      setSignUpFormErrors({ ...signUpFormErrors, [name]: null });
    } else {
      setSignUpForm({ ...signUpForm, [name]: value });
      setSignUpFormErrors({ ...signUpFormErrors, [name]: null });
    }
  };

  /**
   * Validate the sign-in form data.
   * @returns {Object} An object containing validation errors, if any.
   */
  const validateSignIn = () => {
    let validationErrors = {};

    if (!signInForm.email) {
      validationErrors = {
        ...validationErrors,
        email: "The email field is required.",
      };
    }

    if (!signInForm.password) {
      validationErrors = {
        ...validationErrors,
        password: "The password field is required.",
      };
    }

    return validationErrors;
  };

  /**
   * Validate the sign-up form data.
   * @returns {Object} An object containing validation errors, if any.
   */
  const validateSignUp = () => {
    let validationErrors = {};

    if (!signUpForm.nickname) {
      validationErrors = {
        ...validationErrors,
        nickname: "The nickname field is required.",
      };
    }

    if (!signUpForm.email) {
      validationErrors = {
        ...validationErrors,
        email: "The email field is required.",
      };
    } else if (!emailRegex.test(signUpForm.email)) {
      validationErrors = {
        ...validationErrors,
        email: "The email is invalid.",
      };
    }

    if (!signUpForm.password) {
      validationErrors = {
        ...validationErrors,
        password: "The password field is required.",
      };
    } else if (!passwdRegex.test(signUpForm.password)) {
      validationErrors = {
        ...validationErrors,
        password: "The password is invalid.",
      };
    }

    if (!signUpForm.repeated_password) {
      validationErrors = {
        ...validationErrors,
        repeated_password: "Enter your password again.",
      };
    } else if (signUpForm.password !== signUpForm.repeated_password) {
      validationErrors = {
        ...validationErrors,
        repeated_password: "Passwords do not match.",
      };
    }

    if (!signUpForm.name) {
      validationErrors = {
        ...validationErrors,
        name: "The name field is required.",
      };
    }

    if (!signUpForm.terms_services) {
      validationErrors = {
        ...validationErrors,
        terms_services: "Accept terms and services.",
      };
    }

    return validationErrors;
  };

  /**
   * Handle the sign-in process, validating the form data and initiating the sign-in.
   */
  const handleSignIn = () => {
    const validationErrors = validateSignIn();

    if (validateObject(validationErrors)) {
      setSignInFormErrors(validationErrors);
    } else {
      setSignInFormErrors(initialValues.signInFormErrors);

      signInWithPassword();
    }
  };

  /**
   * Handle the sign-up process, validating the form data and initiating the sign-up.
   */
  const handleSignUp = () => {
    const validationErrors = validateSignUp();
    /* console.log(validationErrors) */
    if (validateObject(validationErrors)) {
      setSignUpFormErrors(validationErrors);
    } else {
      setSignUpFormErrors(initialValues.signUpFormErrors);

      createAuthUser();
    }
  };

  /* SUPABASE FETCHS */

  /**
   * Sign in a user with their email and password.
   * Handles loading state, form reset, and error handling.
   */
  const signInWithPassword = async () => {
    try {
      setIsLoadingUser(true);

      const { error } = await supabaseConnection.auth.signInWithPassword({
        email: signInForm.email,
        password: signInForm.password,
      });

      if (error) throw error;
    } catch (error) {
      setSignInFormErrors({
        email: "Invalid sign-in credentials",
        password: "Invalid sign-in credentials",
      });
    } finally {
      setIsLoadingUser(initialValues.isLoadingUser);
      setSignInForm(initialValues.signInForm);
      setSignInFormErrors(initialValues.signInFormErrors);
    }
  };

  /**
   * Get a user's data by their authentication ID.
   * Updates the user state and displays alerts based on success or failure.
   * @param {object} authUser - The user object obtained after authentication.
   */
  const getUserByID = async (authUser) => {
    try {
      const { data: users, error } = await supabaseConnection
        .from("users")
        .select("*")
        .eq("id", authUser.id);

      if (error) throw error;

      setUser({ ...authUser, ...users[0] });
      sendUserAlert("info", `Welcome! ${users[0].nickname}`);

      //console.log(user);
    } catch (error) {
      sendUserAlert("error", "Something went wrong, please try again.");
    }
  };

  /**
   * Get the current user's data and check if they have admin privileges.
   * Updates the user and admin states accordingly.
   */
  const getUser = async () => {
    try {
      const { data, error } = await supabaseConnection.auth.getUser();

      if (error) throw error;

      if (data.user.role === "rebyu_admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(initialValues.isAdmin);
      }

      getUserByID(data.user);
    } catch (error) {
      sendUserAlert("error", "Something went wrong, please try again.");
    }
  };

  /**
   * Create a new user in the database with the provided data.
   * Displays an information alert to instruct the user to validate their email.
   * @param {string} authUserID - The authentication user ID.
   */
  const createUser = async (authUserID) => {
    try {
      const { data, error } = await supabaseConnection.from("users").insert({
        id: authUserID,
        nickname: signUpForm.nickname,
        name: signUpForm.name,
        birth_date: signUpForm.birth_date,
        profile_photo: signUpForm.profile_photo,
      });

      if (error) throw error;

      sendUserAlert("info", "Please, validate your email to continue.");
    } catch (error) {
      sendUserAlert("error", "Something went wrong, please try again.");
    } finally {
      setSignUpForm(initialValues.signUpForm);
      setSignUpFormErrors(initialValues.signUpFormErrors);
    }
  };

  /**
   * Create a new authentication user with the provided email and password.
   * Calls createUser to create a corresponding user in the database.
   * Displays an error alert if something goes wrong.
   */
  const createAuthUser = async () => {
    try {
      setIsLoadingUser(true);

      const { data, error } = await supabaseConnection.auth.signUp({
        email: signUpForm.email,
        password: signUpForm.password,
      });

      if (error) throw error;

      setIsLoadingUser(initialValues.isLoadingUser);
      setIsConfirmEmailOpen(true);

      createUser(data.user.id);
    } catch (error) {
      sendUserAlert("error", "Something went wrong, please try again.");
    }
  };

  /**
   * Sign out the currently authenticated user.
   * Displays an information alert bidding farewell to the user.
   */
  const signOut = async () => {
    try {
      const { error } = await supabaseConnection.auth.signOut();

      if (error) throw error;

      sendUserAlert("info", `Bye! Come back soon ${user.nickname}`);
    } catch (error) {
      sendUserAlert("error", "Something went wrong, please try again.");
    }
  };

  /* USE EFFECTS */

  /**
   * Set up an authentication state change listener using Supabase.
   * Redirects to the appropriate route based on the authentication state.
   * Retrieves user information if authenticated.
   */
  useEffect(() => {
    // Set up a listener for changes in authentication state
    const { data } = supabaseConnection.auth.onAuthStateChange(
      /**
       * Callback function triggered on authentication state change.
       * @param {string} event - The type of authentication event ("SIGNED_IN" or "SIGNED_OUT").
       * @param {object} session - The authentication session object.
       */
      (event, session) => {
        // Check if a session is present (user is signed in)
        if (session) {
          // Check if user information is already available
          if (!validateObject(user)) {
            // Redirect to the authenticated route and initialize state
            navigate("/");
            setIsConfirmEmailOpen(initialValues.isConfirmEmailOpen);
            setIsSessionUp(true);

            // Retrieve user information
            getUser();
          }
        } else {
          // If no session, redirect to the public part of the web
          setIsSessionUp(initialValues.isSessionUp);
          setUser(initialValues.user);
          setIsAdmin(initialValues.isAdmin);
          navigate("/");
        }
      }
    );
  }, []);

  /* CONTEXT DATA */

  const usersData = {
    signInForm,
    signInFormErrors,
    signUpForm,
    signUpFormErrors,
    isSessionUp,
    user,
    isAdmin,
    isLoadingUser,
    isConfirmEmailOpen,
    updateSignInForm,
    updateSignUpForm,
    handleSignIn,
    handleSignUp,
    signOut,
  };

  return (
    <UsersContext.Provider value={usersData}>{children}</UsersContext.Provider>
  );
};

export default UsersProvider;
export { UsersContext };
