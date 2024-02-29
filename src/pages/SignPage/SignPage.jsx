import React, { Fragment } from "react";

import Container from "react-bootstrap/Container";

import useUsers from "../../hooks/useUsers.js";

import SignUp from "../../components/SignUp/SignUp.jsx";
import MessageModal from "../../components/Modals/MessageModal/MessageModal.jsx";
import LoadingModal from "../../components/Modals/LoadingModal/LoadingModal.jsx";

/**
 * Functional component representing the sign-up page.
 *
 * @returns {JSX.Element} The JSX element for the sign-up page.
 */
const SignPage = () => {
  // Custom hook to access user-related state and functions
  const { isLoadingUser, isConfirmEmailOpen } = useUsers();

  return (
    <Fragment>
      {/* Container for the sign-up form */}
      <Container className="h-100 container-sign">
        {/* Sign-up component */}
        <SignUp />
      </Container>
      {/* Show loading modal when user data is loading */}
      {isLoadingUser && <LoadingModal />}
      {/* Show message modal for confirming email */}
      <MessageModal isOpen={isConfirmEmailOpen} />
    </Fragment>
  );
};

export default SignPage;
