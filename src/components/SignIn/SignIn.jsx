import React, { Fragment } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import useUsers from "../../hooks/useUsers.js";

import "./SignIn.css";

/**
 * Functional component representing a sign-in form.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.homePage - Indicates whether the sign-in form is on the home page.
 * @returns {JSX.Element} The JSX element for the sign-in form.
 */
const SignIn = ({ homePage }) => {
  // Custom hook to access user-related state and functions
  const { signInForm, signInFormErrors, updateSignInForm, handleSignIn } =
    useUsers();

  return (
    <Fragment>
      {/* Card component for styling */}
      <Card className="shadow">
        {/* Render header only if not on the home page */}
        {!homePage && (
          <Card.Header className="text-center">SIGN IN</Card.Header>
        )}
        {/* Card body containing the sign-in form */}
        <Card.Body>
          {/* Form component for collecting user input */}
          <Form className="d-flex flex-column login-form">
            {/* Input field for email address */}
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
            {/* Input field for password */}
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
            {/* Button for submitting the sign-in form */}
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
        {/* Render footer only if not on the home page */}
        {!homePage && (
          <Card.Footer className="text-muted">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
            quasi qui beatae impedit accusamus ad dolore cum repellat voluptatum
            illum voluptate, veritatis optio natus eius minus nesciunt
            consequatur culpa perferendis.
          </Card.Footer>
        )}
      </Card>
    </Fragment>
  );
};

export default SignIn;
