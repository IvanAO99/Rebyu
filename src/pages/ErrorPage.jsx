import React from "react";

/**
 * Página de Error
 *
 * Esta página muestra un mensaje de error 404 cuando se intenta acceder a una página que no existe.
 * Proporciona un mensaje descriptivo para informar al usuario sobre el error.
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
