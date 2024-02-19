import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SignIn from "../../components/SignIn/SignIn.jsx";
import SignUp from "../../components/SignUp/SignUp.jsx";

const SignPage = () => {
  return (
    <Container fluid="sm" className="h-100">
      <Row className="align-items-center h-100">
        <Col>
          <SignIn />
        </Col>
        <Col>
          <div className="vr"></div>
        </Col>
        <Col>
          <SignUp />
        </Col>
      </Row>
    </Container>
  );
};

export default SignPage;
