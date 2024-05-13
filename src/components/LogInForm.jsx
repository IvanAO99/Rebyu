import React from "react";
import { Link } from "react-router-dom";

import useUsers from "../hooks/useUsers.js";

function LogInForm() {
  const { signInForm, signInFormErrors, updateSignInForm, handleSignIn } =
    useUsers();

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-6">LOG IN</h1>
      <h2 className="text-lg text-center mb-8">Access your account</h2>
      <pre>{JSON.stringify(signInFormErrors)}</pre>
      <pre>{JSON.stringify(signInForm)}</pre>
      <div className="flex justify-center px-10 md:px-0">
        <form
          className="w-full md:w-1/2 flex flex-col items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-6 w-1/2">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={signInForm.email || ""}
              id="email"
              className="w-full  border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
              onChange={(e) => updateSignInForm(e.target)}
            />
          </div>
          <div className="mb-6 w-1/2">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={signInForm.password || ""}
              id="password"
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-4"
              onChange={(e) => updateSignInForm(e.target)}
            />
          </div>
          <div className="mb-6 w-1/2">
            <button
              className="w-full bg-purple-500 text-white py-2 px-4 hover:bg-purple-700"
              onClick={() => handleSignIn()}
            >
              Log In
            </button>
          </div>
        </form>
        <div>
          <Link to={"/register"}>register</Link>
        </div>
      </div>
    </div>
  );
}

export default LogInForm;
