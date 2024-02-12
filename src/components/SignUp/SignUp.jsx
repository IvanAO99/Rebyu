import React, { Fragment } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import useUsers from "../../hooks/useUsers.js";

const SignUp = () => {
  const { signUpForm, signUpFormErrors, updateSignUpForm, handleSignUp } =
    useUsers();
  return (
    <Fragment>
      <Card>
        <Card.Header className="text-center">SIGN UP</Card.Header>
        <Card.Body>
          <Form className="d-flex flex-column">
            <Form.Group className="mb-3" controlId="sign-up-email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={signUpForm.email || ""}
                onChange={(event) => {
                  updateSignUpForm(event.target);
                }}
                isInvalid={signUpFormErrors.email}
              />
              <Form.Text className="text-muted">
                Enter a valid email address: example@example.com
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {signUpFormErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="sign-up-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={signUpForm.password || ""}
                onChange={(event) => {
                  updateSignUpForm(event.target);
                }}
                isInvalid={signUpFormErrors.password}
              />
              <Form.Text className="text-muted">
                The password must contain at least 8 characters, a lowercase
                letter, an uppercase letter, a number, and a symbol (@, $, *, !,
                etc.).
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {signUpFormErrors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="sign-up-repeated-password">
              <Form.Label>Repeat password</Form.Label>
              <Form.Control
                type="password"
                name="repeated_password"
                placeholder="Repeat password"
                value={signUpForm.repeated_password || ""}
                onChange={(event) => {
                  updateSignUpForm(event.target);
                }}
                isInvalid={signUpFormErrors.repeated_password}
              />
              <Form.Text className="text-muted">
                Enter the password again.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {signUpFormErrors.repeated_password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="sign-up-checkbox">
              <Form.Check type="checkbox" label="Accept terms and services" />
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              className="align-self-center"
              onClick={() => handleSignUp()}
            >
              Sign Up
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

export default SignUp;
