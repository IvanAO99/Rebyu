import React, {
  createContext,
  useEffect,
  /* useEffect, */ useState,
} from "react";
/* import { useNavigate } from "react-router-dom";

import { supabaseConnection } from "../config/supabase.js"; */

import { validateObject } from "../libraries/validateData.js";

/* import { regularExpressions } from "../jsons/regularExpressions.json"; */

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
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
      email: "",
      password: "",
      repeated_password: "",
    },
    signUpFormErrors: {},
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

  /* FUNCTIONS */
  const updateSignInForm = (input) => {
    const { name, value } = input;

    setSignInForm({ ...signInForm, [name]: value });
    setSignInFormErrors({ ...signInFormErrors, [name]: null });
  };

  const updateSignUpForm = (input) => {
    const { name, value } = input;

    setSignUpForm({ ...signUpForm, [name]: value });
    setSignUpFormErrors({ ...signUpFormErrors, [name]: null });
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

    return validationErrors;
  };

  const handleSignIn = () => {
    const validationErrors = validateSignIn();

    if (validateObject(validationErrors)) {
      setSignInFormErrors(validationErrors);
    } else {
      setSignInFormErrors(initialValues.signInFormErrors);
      console.log(signInForm);
    }
  };

  const handleSignUp = () => {
    const validationErrors = validateSignUp();

    if (validateObject(validationErrors)) {
      setSignUpFormErrors(validationErrors);
    } else {
      setSignUpFormErrors(initialValues.signUpFormErrors);
      console.log(signUpForm);
    }
  };

  /* USE EFFECTS */
  useEffect(() => {}, []);

  /* CONTEXT DATA */
  const usersData = {
    signInForm,
    signInFormErrors,
    signUpForm,
    signUpFormErrors,
    updateSignInForm,
    updateSignUpForm,
    handleSignIn,
    handleSignUp,
  };

  return (
    <UsersContext.Provider value={usersData}>{children}</UsersContext.Provider>
  );
};

export default UsersProvider;
export { UsersContext };
