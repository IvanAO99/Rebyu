import React from "react";

/**
 * Error Page
 *
 * This page displays a 404 error message when trying to access a non-existent page.
 * It provides a descriptive message to inform the user about the error.
 *
 */
const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center mb-8">404 Not Found</h1>
      <p className="text-lg text-center">
        It seems you are trying to access a page that does not concern you,
        maybe some other time...
      </p>
    </div>
  );
};

export default ErrorPage;
