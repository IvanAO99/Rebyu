import React, { Fragment } from "react";

import Container from "react-bootstrap/Container";

import SignUp from "../../components/SignUp/SignUp.jsx";
import MessageModal from "../../components/Modals/MessageModal/MessageModal.jsx";
import useUsers from "../../hooks/useUsers.js";
import LoadingModal from "../../components/Modals/LoadingModal/LoadingModal.jsx";
import './SignPage.css'

const SignPage = () => {
  const { isLoadingUser, isConfirmEmailOpen } = useUsers();

  return (
    <Fragment>
      <Container className="h-100 container-sign">
        <SignUp />
      </Container>
      {isLoadingUser && <LoadingModal />}
      <MessageModal isOpen={isConfirmEmailOpen} />
    </Fragment>
  );
};

export default SignPage;
