import React, { Fragment } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SignIn from "../../components/SignIn/SignIn.jsx";
import SignUp from "../../components/SignUp/SignUp.jsx";
import MessageModal from "../../components/Modals/MessageModal/MessageModal.jsx";
import useUsers from "../../hooks/useUsers.js";
import ShowObj from "../../components/development/ShowObj.jsx";
import LoadingModal from "../../components/Modals/LoadingModal/LoadingModal.jsx";

const SignPage = () => {
  const { isLoadingUser, isConfirmEmailOpen } = useUsers();

  return (
    <Fragment>
      <Container fluid="sm" className="h-100">
        <Row className="align-items-center h-100">
          {/* <Col>
            <ShowObj obj={isConfirmEmailOpen} />
          </Col> */}
          <Col>
            <SignIn />
          </Col>
          {/* <Col>
          <div className="vr"></div>
        </Col> */}
          <Col>
            <SignUp />
          </Col>
        </Row>
      </Container>
      {isLoadingUser && <LoadingModal />}
      <MessageModal isOpen={isConfirmEmailOpen} />
    </Fragment>
  );
};

export default SignPage;
