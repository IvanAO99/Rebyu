import React, { Fragment } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import useUsers from "../../hooks/useUsers.js";

const SignIn = () => {
  const { signInForm, signInFormErrors, updateSignInForm, handleSignIn } =
    useUsers();
  return (
    <Fragment>
      <Card className="shadow">
        <Card.Header className="text-center">SIGN IN</Card.Header>
        <Card.Body>
          <Form className="d-flex flex-column">
            <Form.Group className="mb-3" controlId="sign-in-email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={signInForm.email || ""}
                onChange={(event) => {
                  updateSignInForm(event.target);
                }}
                isInvalid={signInFormErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {signInFormErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="sign-in-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={signInForm.password || ""}
                onChange={(event) => {
                  updateSignInForm(event.target);
                }}
                isInvalid={signInFormErrors.password}
              />
              <Form.Control.Feedback type="invalid">
                {signInFormErrors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              className="align-self-center"
              onClick={() => handleSignIn()}
            >
              Sign In
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat quasi
          qui beatae impedit accusamus ad dolore cum repellat voluptatum illum
          voluptate, veritatis optio natus eius minus nesciunt consequatur culpa
          perferendis.
        </Card.Footer>
      </Card>
    </Fragment>
  );
};

export default SignIn;
