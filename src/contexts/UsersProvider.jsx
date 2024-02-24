import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      console.log(signInForm);
      signInWithPassword();
    }
  };

  const handleSignUp = () => {
    const validationErrors = validateSignUp();

    if (validateObject(validationErrors)) {
      setSignUpFormErrors(validationErrors);
    } else {
      setSignUpFormErrors(initialValues.signUpFormErrors);
      console.log(signUpForm);
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
        .eq("id", authUser.id);

      if (error) throw error;

      console.log(`Aditional user data:`);
      console.log(users[0]);

      setUser({ ...authUser, ...users[0] });
    } catch (error) {
      console.log(`User by ID error: ${error.message}`);
    }
  };

  const getUser = async () => {
    try {
      const { data, error } = await supabaseConnection.auth.getUser();

      if (error) throw error;

      console.log(`User obj:\n ${data}`);

      if (data.user.role === "rebyu_admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(initialValues.isAdmin);
      }

      getUserByID(data.user);
    } catch (error) {
      console.log(`User error: ${error.message}`);
    }
  };

  /*
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

      console.log(data);
    } catch (error) {
      console.log(`User error: ${error.message}`);
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

      console.log(data);

      setIsLoadingUser(initialValues.isLoadingUser);
      setIsConfirmEmailOpen(true);

      createUser(data.user.id);
    } catch (error) {
      console.log(`User error: ${error.message}`);
    }
  };

  const signOut = async () => {
    try {
      await supabaseConnection.auth.signOut();
    } catch (error) {}
  };

  /* USE EFFECTS */
  useEffect(() => {
    const { data } = supabaseConnection.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);

        if (session) {
          if (!validateObject(user)) {
            navigate("/");

            setIsConfirmEmailOpen(initialValues.isConfirmEmailOpen);
            setIsSessionUp(true);

            getUser();
          }
        } else {
          setIsSessionUp(initialValues.isSessionUp);
          setUser(initialValues.user);
          setIsAdmin(initialValues.isAdmin);

          navigate("/sign-in");
        }

        /* if (event === "INITIAL_SESSION") {
          // handle initial session
          navigate("/");

          setIsConfirmEmailOpen(initialValues.isConfirmEmailOpen);
          setIsSessionUp(true);

          getUser();
        } else if (event === "SIGNED_IN") {
          // handle sign in event
          navigate("/");

          setIsConfirmEmailOpen(initialValues.isConfirmEmailOpen);
          setIsSessionUp(true);

          getUser();
        } else if (event === "SIGNED_OUT") {
          // handle sign out event
          setIsSessionUp(initialValues.isSessionUp);
          setUser(initialValues.user);
          setIsAdmin(initialValues.isAdmin);

          navigate("/sign-in");
        } else if (event === "PASSWORD_RECOVERY") {
          // handle password recovery event
        } else if (event === "TOKEN_REFRESHED") {
          // handle token refreshed event
        } else if (event === "USER_UPDATED") {
          // handle user updated event
        } */
      }
    );

    // call unsubscribe to remove the callback
    //data.subscription.unsubscribe();
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
