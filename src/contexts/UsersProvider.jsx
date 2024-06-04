import React, { createContext, useState, useEffect } from "react";

import { supabaseConnection } from "../.config/supabase.js";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";

import AlertIcon from "../components/AlertIcon.jsx";

import { isValidURL, validateObject } from "../libraries/validateData.js";

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
    userCreation: false,
    idUserCreated: "",
    allUsers: [],
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
  const [userCreation, setUserCreation] = useState(initialValues.userCreation);
  const [idUserCreated, setIDUserCreated] = useState(
    initialValues.idUserCreated
  );
  const [allUsers, setAllUsers] = useState(initialValues.allUsers);

  /* FUNCTIONS */

  /**
   * Sends a user alert with the specified type and message.
   *
   * @param {string} type - The type of alert to display (info or error).
   * @param {string} message - The message to display in the alert.
   *
   */
  const sendUserAlert = (type, message) => {
    const notify = () => {
      switch (type) {
        case "info":
          toast.info(message, {
            position: "bottom-right",
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
            position: "bottom-right",
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

  /**
   * Updates the sign-in form state with the provided input.
   *
   * @param {object} input - The input object containing the name and value of the updated field.
   *
   */
  const updateSignInForm = (input) => {
    const { name, value } = input;

    setSignInForm({ ...signInForm, [name]: value });
    setSignInFormErrors({ ...signInFormErrors, [name]: null });
  };

  /**
   * Updates the sign-up form state with the provided input.
   *
   * @param {object} input - The input object containing the name and value of the updated field.
   *
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
   * Validates the sign-in form fields and returns an object containing validation errors.
   *
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
   * Validates the sign-up form fields and returns an object containing validation errors.
   *
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
        password:
          "Password must be at least 8 characters long, and include at least one lowercase letter, one uppercase letter, one number, and one special character.",
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

    if (signUpForm.profile_photo && !isValidURL(signUpForm.profile_photo)) {
      validationErrors = {
        ...validationErrors,
        profile_photo: "The URL doesn't exist.",
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
   * Handles the sign-in process by validating the form and initiating the sign-in request.
   *
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
   * Handles the sign-up process by validating the form and initiating the user creation request.
   *
   */
  const handleSignUp = () => {
    const validationErrors = validateSignUp();

    if (validateObject(validationErrors)) {
      setSignUpFormErrors(validationErrors);
    } else {
      setSignUpFormErrors(initialValues.signUpFormErrors);

      createAuthUser();
    }
  };

  /* SUPABASE FETCHS */

  /**
   * Signs in a user with their email and password using Supabase authentication.
   *
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
      setIsLoadingUser(initialValues.isLoadingUser);

      setSignInFormErrors({
        email: "Invalid sign-in credentials",
        password: "Invalid sign-in credentials",
      });

      sendUserAlert("error", error.message);
    } finally {
      setSignInForm(initialValues.signInForm);
      setSignInFormErrors(initialValues.signInFormErrors);
    }
  };

  /**
   * Fetches user data from the database based on the provided user ID and updates the user state.
   *
   * @param {object} authUser - The authenticated user object.
   *
   */
  const getUserByID = async (authUser) => {
    try {
      const { data: users, error } = await supabaseConnection
        .from("users")
        .select("*")
        .eq("id", authUser.id);

      if (error) throw error;

      setUser({ ...authUser, ...users[0] });

      navigate("/");
    } catch (error) {
      sendUserAlert("error", "Something went wrong!");
    } finally {
      setIsLoadingUser(initialValues.isLoadingUser);
    }
  };

  /**
   * Fetches all users from the database and sets the state with the fetched data.
   *
   */
  const getAllUsers = async () => {
    try {
      const { data, error } = await supabaseConnection
        .from("users")
        .select("*");

      if (error) throw error;

      setAllUsers(data);
    } catch (error) {
      sendUserAlert("error", "Something went wrong!");
    }
  };

  /**
   * Fetches user data from Supabase authentication and sets the user state.
   *
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
   * Creates a new user in the database with the provided user data.
   *
   * @param {string} authUserID - The ID of the authenticated user.
   *
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

      setUserCreation(true);
      setIDUserCreated(authUserID);
      sendUserAlert("info", "Please, validate your email to continue.");
    } catch (error) {
      sendUserAlert("error", "Something went wrong!");
    } finally {
      setSignUpForm(initialValues.signUpForm);
      setSignUpFormErrors(initialValues.signUpFormErrors);
    }
  };

  /**
   * Creates a new user authentication account using the provided email and password.
   *
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
      sendUserAlert("error", "Something went wrong!");
    }
  };

  /**
   * Signs the current user out of the application.
   *
   */
  const signOut = async () => {
    try {
      const { error } = await supabaseConnection.auth.signOut();

      if (error) throw error;

      sendUserAlert("info", `Bye! Come back soon ${user.nickname}`);
    } catch (error) {
      sendUserAlert("error", "Something went wrong!");
    }
  };

  /**
   * Cancels the user creation process and resets the userCreation state to false.
   *
   */
  const cancelUserCreation = () => {
    setUserCreation(false);
  };

  /* USE EFFECTS */

  /**
   * Handles authentication state changes and updates user-related states accordingly.
   *
   */
  useEffect(() => {
    const { data } = supabaseConnection.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          if (!validateObject(user)) {
            setIsLoadingUser(true);

            setIsConfirmEmailOpen(initialValues.isConfirmEmailOpen);
            setIsSessionUp(true);

            getUser();
          }
        } else {
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
    userCreation,
    cancelUserCreation,
    idUserCreated,
    allUsers,
    getAllUsers,
  };

  return (
    <UsersContext.Provider value={usersData}>{children}</UsersContext.Provider>
  );
};

export default UsersProvider;
export { UsersContext };
