import React from "react";

import { Link } from "react-router-dom";

import useUsers from "../hooks/useUsers.js";

/**
 * Component RegistrationForm
 *
 * This component renders a registration form for new users.
 * It uses the useUsers hook to manage the form state and handling functions.
 * The form prompts the user for their nickname, email, password,
 * password confirmation, name, date of birth, profile picture, and acceptance of terms and conditions.
 * The component handles field validation and displays error messages if necessary.
 * It allows the user to register with a "Register" button and also provides a link to log in if they already have an account.
 *
 */
function RegistrationForm() {
  const { signUpForm, signUpFormErrors, updateSignUpForm, handleSignUp } =
    useUsers();

  return (
    <>
      <div className="flex flex-col justify-center gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-6xl font-bold text-center">
            REGISTER
          </h1>
          <h2 className="text-xl md:text-3xl text-center">
            And contribute to the community
          </h2>
        </div>
        <div>
          <form
            className="md:w-full flex flex-col justify-center md:flex-row"
            onSubmit={(e) => e.preventDefault()}
            noValidate
          >
            <div className="md:w-1/3 flex flex-col gap-5 md:pr-5 md:border-r">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="nickname"
                  className="block text-lg md:text-xl font-bold text-purple-600"
                >
                  Nickname
                </label>
                <input
                  autoFocus
                  type="text"
                  id="nickname"
                  name="nickname"
                  placeholder="Enter nickname..."
                  className={`w-full border-none focus:outline-none ${
                    signUpFormErrors.nickname
                      ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                      : "focus:ring-2 focus:ring-purple-600"
                  } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
                  value={signUpForm.nickname || ""}
                  onChange={(event) => {
                    updateSignUpForm(event.target);
                  }}
                />
                {signUpFormErrors.nickname && (
                  <p className="text-red-400">{signUpFormErrors.nickname}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="block text-lg md:text-xl font-bold text-purple-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email..."
                  className={`w-full border-none focus:outline-none ${
                    signUpFormErrors.email
                      ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                      : "focus:ring-2 focus:ring-purple-600"
                  } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
                  value={signUpForm.email || ""}
                  onChange={(event) => {
                    updateSignUpForm(event.target);
                  }}
                />
                {signUpFormErrors.email && (
                  <p className="text-red-400">{signUpFormErrors.email}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="block text-lg md:text-xl font-bold text-purple-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password..."
                  className={`w-full border-none focus:outline-none ${
                    signUpFormErrors.password
                      ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                      : "focus:ring-2 focus:ring-purple-600"
                  } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
                  value={signUpForm.password || ""}
                  onChange={(event) => {
                    updateSignUpForm(event.target);
                  }}
                />
                {signUpFormErrors.password && (
                  <p className="text-red-400">{signUpFormErrors.password}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="repeated_password"
                  className="block text-lg md:text-xl font-bold text-purple-600"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="repeated_password"
                  id="repeated_password"
                  placeholder="Repeat password..."
                  className={`w-full border-none focus:outline-none ${
                    signUpFormErrors.repeated_password
                      ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                      : "focus:ring-2 focus:ring-purple-600"
                  } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
                  value={signUpForm.repeated_password || ""}
                  onChange={(event) => {
                    updateSignUpForm(event.target);
                  }}
                />
                {signUpFormErrors.repeated_password && (
                  <p className="text-red-400">
                    {signUpFormErrors.repeated_password}
                  </p>
                )}
              </div>
            </div>
            <div className="md:w-1/3 flex flex-col gap-5 md:pl-5">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="block text-lg md:text-xl font-bold text-purple-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter name..."
                  className={`w-full border-none focus:outline-none ${
                    signUpFormErrors.name
                      ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                      : "focus:ring-2 focus:ring-purple-600"
                  } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
                  value={signUpForm.name || ""}
                  onChange={(event) => {
                    updateSignUpForm(event.target);
                  }}
                />
                {signUpFormErrors.name && (
                  <p className="text-red-400">{signUpFormErrors.name}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="birth_date"
                  className="block text-lg md:text-xl font-bold text-purple-600"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  className={`w-full border-none focus:outline-none ${
                    signUpFormErrors.birth_date
                      ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                      : "focus:ring-2 focus:ring-purple-600"
                  } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
                  value={signUpForm.birth_date || ""}
                  onChange={(event) => {
                    updateSignUpForm(event.target);
                  }}
                />
                {signUpFormErrors.birth_date && (
                  <p className="text-red-400">{signUpFormErrors.birth_date}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="profile_photo"
                  className="block text-lg md:text-xl font-bold text-purple-600"
                >
                  Profile Picture
                </label>
                <input
                  type="url"
                  name="profile_photo"
                  placeholder="Enter profile url..."
                  id="profile_photo"
                  className={`w-full border-none focus:outline-none ${
                    signUpFormErrors.profile_photo
                      ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                      : "focus:ring-2 focus:ring-purple-600"
                  } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
                  value={signUpForm.profile_photo || ""}
                  onChange={(event) => {
                    updateSignUpForm(event.target);
                  }}
                />
                {signUpFormErrors.profile_photo && (
                  <p className="text-red-400">
                    {signUpFormErrors.profile_photo}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  name="terms_services"
                  className={`border-none focus:outline-none ${
                    signUpFormErrors.terms_services
                      ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                      : "focus:ring-2 focus:ring-purple-600"
                  } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 accent-purple-600 hover:accent-purple-400 shadow`}
                  value={"accepted"}
                  checked={signUpForm.terms_services ? true : false}
                  onChange={(event) => {
                    updateSignUpForm(event.target);
                  }}
                />
                <label
                  htmlFor="terms"
                  className={`ml-1 text-sm ${
                    signUpFormErrors.terms_services && "text-red-600"
                  }`}
                >
                  I accept the terms and conditions
                </label>
              </div>
              <div className="self-center">
                <button
                  className="rounded-3xl bg-purple-600 hover:bg-purple-400 px-4 py-2 text-gray-50 shadow transition-all duration-300"
                  onClick={() => handleSignUp()}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <p className="text-center">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-bold text-purple-600 hover:text-purple-400 transition-all duration-300"
            >
              Sign in
            </Link>{" "}
            now!
          </p>
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
