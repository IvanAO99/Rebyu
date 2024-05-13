import React from "react";
import useUsers from "../hooks/useUsers";

function RegistrationForm() {
  const { signUpForm, signUpFormErrors, updateSignUpForm, handleSignUp } =
    useUsers();

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-6">REGISTER</h1>
      <h2 className="text-lg text-center mb-8">
        And contribute to the community
      </h2>
      <form
        className="flex flex-col md:flex-row justify-center px-10 md:px-0"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="md:w-1/3 md:pr-8 mb-4 md:mb-0 md:border-r">
          <div className="mb-6">
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
              value={signUpForm.name || ""}
              onChange={(event) => {
                updateSignUpForm(event.target);
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
              value={signUpForm.email || ""}
              onChange={(event) => {
                updateSignUpForm(event.target);
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
              value={signUpForm.password || ""}
              onChange={(event) => {
                updateSignUpForm(event.target);
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="repeated_password" className="block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="repeated_password"
              id="repeated_password"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
              value={signUpForm.repeated_password || ""}
              onChange={(event) => {
                updateSignUpForm(event.target);
              }}
            />
          </div>
        </div>
        <div className="md:w-1/3 md:pl-8">
          <div className="mb-6">
            <label htmlFor="nickname" className="block mb-1">
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
              value={signUpForm.nickname || ""}
              onChange={(event) => {
                updateSignUpForm(event.target);
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="birth_date" className="block mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="birth_date"
              name="birth_date"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
              value={signUpForm.birth_date || ""}
              onChange={(event) => {
                updateSignUpForm(event.target);
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="profile_photo" className="block mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              id="profile_photo"
              name="profile_photo"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
              value={signUpForm.profile_photo || ""}
              onChange={(event) => {
                updateSignUpForm(event.target);
              }}
            />
          </div>
          <div className="mb-6">
            <input
              type="checkbox"
              id="terms"
              name="terms_services"
              className="mr-2 focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
              value={"accepted"}
              checked={signUpForm.terms_services ? true : false}
              onChange={(event) => {
                updateSignUpForm(event.target);
              }}
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I accept the terms and conditions
            </label>
          </div>
          <div className="mb-6">
            <button
              className="w-full bg-purple-500 text-white py-2 px-4 hover:bg-purple-700 mt-6"
              onClick={() => handleSignUp()}
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
