import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast, Slide } from "react-toastify";

import { supabaseConnection } from "../.config/supabase.js";

import { validateObject } from "../libraries/validateData.js";

/* import { regularExpressions } from "../jsons/regularExpressions.json"; */

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const navigate = useNavigate();

  const passwdRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* console.log(regularExpressions.password); */

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

  const sendUserAlert = (type, message) => {
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

  const updateSignInForm = (input) => {
    const { name, value } = input;

    setSignInForm({ ...signInForm, [name]: value });
    setSignInFormErrors({ ...signInFormErrors, [name]: null });
  };

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

  const validateSignIn = () => {
    let validationErrors = {};

    if (!signInForm.email) {
      validationErrors = {
        ...validationErrors,
        email: "The email field is required.",
      };
    } /* else if (!emailRegex.test(formUser.email)) {
      validationErrors = {
        ...validationErrors,
        email: "The email is invalid.",
      };
    } */

    if (!signInForm.password) {
      validationErrors = {
        ...validationErrors,
        password: "The password field is required.",
      };
    } /* else if (!passwdRegex.test(formUser.password)) {
      validationErrors = {
        ...validationErrors,
        password: "The password is invalid.",
      };
    } */

    return validationErrors;
  };

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
        repeated_password: "Enter you password again.",
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

  const handleSignIn = () => {
    const validationErrors = validateSignIn();

    if (validateObject(validationErrors)) {
      setSignInFormErrors(validationErrors);
    } else {
      setSignInFormErrors(initialValues.signInFormErrors);

      signInWithPassword();
    }
  };

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
        email: "Invalid sign in credentials",
        password: "Invalid sign in credentials",
      });
    } finally {
      setIsLoadingUser(initialValues.isLoadingUser);
      setSignInForm(initialValues.signInForm);
      setSignInFormErrors(initialValues.signInFormErrors);
    }
  };

  const getUserByID = async (authUser) => {
    try {
      const { data: users, error } = await supabaseConnection
        .from("users")
        .select("*")
        .eq("auth_id", authUser.id);

      if (error) throw error;

      console.log(authUser);

      setUser({ ...authUser, ...users[0] });
      sendUserAlert("info", `Welcome! ${users[0].nickname}`);
    } catch (error) {
      sendUserAlert("error", "Something went wrong, please try again.");
    }
  };

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

  const createUser = async (authUserID) => {
    try {
      const { data, error } = await supabaseConnection.from("users").insert({
        auth_id: authUserID,
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
  useEffect(() => {
    const { data } = supabaseConnection.auth.onAuthStateChange(
      (event, session) => {
        // Se puede utilizar el operador negación para invertir el orden.
        if (session) {
          if (validateObject(user)) {
            console.log(user);
          } else {
            navigate("/games");

            setIsConfirmEmailOpen(initialValues.isConfirmEmailOpen);
            setIsSessionUp(true);

            getUser();
          }
        } else {
          // Si no hay sesión, se redirige a la parte pública de la web.
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
