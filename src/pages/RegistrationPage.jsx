import React from "react";

import RegistrationForm from "../components/RegistrationForm.jsx";

/**
 * Registration Page
 *
 * This page provides a registration form for users to create
 * a new account on the platform. The form includes fields
 * for username, email address, and password.
 *
 */
function RegistrationPage() {
  return (
    <>
      <div>
        <RegistrationForm />
      </div>
    </>
  );
}

export default RegistrationPage;
