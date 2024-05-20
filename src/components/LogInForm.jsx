import React from "react";
import { Link } from "react-router-dom";

import useUsers from "../hooks/useUsers.js";

function LogInForm() {
  const { signInForm, signInFormErrors, updateSignInForm, handleSignIn } =
    useUsers();

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-6xl font-bold text-center">LOG IN</h1>
          <h2 className="text-3xl text-center">Access your account</h2>
        </div>
        <pre>{JSON.stringify(signInFormErrors)}</pre>
        <pre>{JSON.stringify(signInForm)}</pre>
        <div className="flex flex-col gap-5">
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-5">
              <label
                htmlFor="email"
                className="block text-xl font-bold text-purple-600"
              >
                Email
              </label>
              <input
                autoFocus
                type="email"
                name="email"
                placeholder="Enter email..."
                value={signInForm.email || ""}
                id="email"
                className={`border-none focus:outline-none ${
                  signInFormErrors.email
                    ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                    : "focus:ring-2 focus:ring-purple-600"
                } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
                onChange={(e) => updateSignInForm(e.target)}
              />
            </div>
            <div className="flex flex-col gap-5">
              <label
                htmlFor="password"
                className="block text-xl font-bold text-purple-600"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password..."
                value={signInForm.password || ""}
                id="password"
                className={`border-none focus:outline-none ${
                  signInFormErrors.password
                    ? "ring-2 ring-red-600 focus:ring-red-600 placeholder-red-600"
                    : "focus:ring-2 focus:ring-purple-600"
                } rounded-3xl bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600 shadow`}
                onChange={(e) => updateSignInForm(e.target)}
              />
            </div>
            <div className="self-center">
              <button
                className="rounded-3xl bg-purple-600 hover:bg-purple-400 px-4 py-2 text-gray-50"
                onClick={() => handleSignIn()}
              >
                Log In
              </button>
            </div>
          </form>
          <div>
            <p>
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="font-bold text-purple-600 hover:text-purple-400"
              >
                Register
              </Link>{" "}
              now!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogInForm;
