import React, { Fragment } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import useUsers from "../../hooks/useUsers.js";

import "./SignUp.css";

/**
 * Functional component representing a sign-up form.
 *
 * @returns {JSX.Element} The JSX element for the sign-up form.
 */
const SignUp = () => {
  // Custom hook to access user-related state and functions
  const { signUpForm, signUpFormErrors, updateSignUpForm, handleSignUp } =
    useUsers();

  return (
    <Fragment>
      {/* Card component for styling */}
      <Card className="signup-form shadow">
        {/* Card header */}
        <Card.Header className="text-center">SIGN UP</Card.Header>
        {/* Card body containing the sign-up form */}
        <Card.Body>
          {/* Form component for collecting user input */}
          <Form className="d-flex flex-column">
            {/* Row for name and nickname */}
            <Row className="mb-3">
              {/* Form groups for nickname */}
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="sign-up-nickname"
              >
                {/* Label and input field for nickname */}
                <Form.Label>
                  Nickname <span className="obligatory">(*)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nickname"
                  placeholder="Enter nickname"
                  value={signUpForm.nickname || ""}
                  onChange={(event) => {
                    updateSignUpForm(event.target);
                  }}
                  isInvalid={signUpFormErrors.nickname}
                />
                {/* Helper text and feedback for nickname */}
                <Form.Text className="text-muted">
                  Enter a valid nickname
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {signUpFormErrors.nickname}
                </Form.Control.Feedback>
              </Form.Group>
              {/* Form groups for name */}
              <Form.Group as={Col} className="mb-3" controlId="sign-up-name">
                {/* Label and input field for name */}
                <Form.Label>
                  Name <span className="obligatory">(*)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={signUpForm.name || ""}
                  onChange={(event) => {
                    updateSignUpForm(event.target);
                  }}
                  isInvalid={signUpFormErrors.name}
                />
                {/* Helper text and feedback for name */}
                <Form.Text className="text-muted">Enter a valid name</Form.Text>
                <Form.Control.Feedback type="invalid">
                  {signUpFormErrors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            {/* Form group for email */}
            <Form.Group className="mb-3" controlId="sign-up-email">
              {/* Label and input field for email */}
              <Form.Label>
                Email <span className="obligatory">(*)</span>
              </Form.Label>
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
              {/* Helper text and feedback for email */}
              <Form.Text className="text-muted">
                Enter a valid email address: example@example.com
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {signUpFormErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            {/* Row for password and repeated password */}
            <Row className="mb-3">
              {/* Form groups for password */}
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="sign-up-password"
              >
                {/* Label and input field for password */}
                <Form.Label>
                  Password <span className="obligatory">(*)</span>
                </Form.Label>
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
                {/* Helper text and feedback for password */}
                <Form.Text className="text-muted">
                  The password must contain at least 8 characters, a lowercase
                  letter, an uppercase letter, a number, and a symbol (@, $, *,
                  !, etc.).
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {signUpFormErrors.password}
                </Form.Control.Feedback>
              </Form.Group>
              {/* Form groups for repeated password */}
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="sign-up-repeated-password"
              >
                {/* Label and input field for repeated password */}
                <Form.Label>
                  Repeat password <span className="obligatory">(*)</span>
                </Form.Label>
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
                {/* Helper text and feedback for repeated password */}
                <Form.Text className="text-muted">
                  Enter the password again.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {signUpFormErrors.repeated_password}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            {/* Row for birth date and profile photo */}
            <Row className="mb-3">
              {/* Form groups for birth date */}
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="sign-up-birth-date"
              >
                {/* Label and input field for birth date */}
                <Form.Label>
                  Birth date <span className="obligatory">(*)</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="birth_date"
                  placeholder="Enter your birth date"
                  value={signUpForm.birth_date || ""}
                  onChange={(event) => {
                    updateSignUpForm(event.target);
                  }}
                  isInvalid={signUpFormErrors.birth_date}
                />
                {/* Helper text and feedback for birth date */}
                <Form.Text className="text-muted">Enter a valid date</Form.Text>
                <Form.Control.Feedback type="invalid">
                  {signUpFormErrors.birth_date}
                </Form.Control.Feedback>
              </Form.Group>
              {/* Form groups for profile photo */}
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="sign-up-profile-photo"
              >
                {/* Label and input field for profile photo */}
                <Form.Label>Profile photo</Form.Label>
                <Form.Control
                  type="file"
                  name="profile_photo"
                  placeholder="Enter a photo"
                  value={signUpForm.profile_photo || ""}
                  onChange={(event) => {
                    updateSignUpForm(event.target);
                  }}
                  isInvalid={signUpFormErrors.profile_photo}
                />
                {/* Helper text and feedback for profile photo */}
                <Form.Text className="text-muted">
                  Enter a valid photo
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {signUpFormErrors.profile_photo}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            {/* Form group for accepting terms and services */}
            <Form.Group className="mb-3" controlId="sign-up-checkbox">
              {/* Checkbox for accepting terms and services */}
              <Form.Check
                name="terms_services"
                type="checkbox"
                label="Accept terms and services"
                value={"accepted"}
                checked={signUpForm.terms_services ? true : false}
                onChange={(event) => {
                  updateSignUpForm(event.target);
                }}
                isInvalid={signUpFormErrors.terms_services}
              />
              {/* Feedback for accepting terms and services */}
              <Form.Control.Feedback type="invalid">
                {signUpFormErrors.terms_services}
              </Form.Control.Feedback>
            </Form.Group>
            {/* Button for submitting the sign-up form */}
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
        {/* Card footer with a welcome message */}
        <Card.Footer className="text-muted">
          Welcome to our community! Your privacy is important to us, and we want
          you to know that we are committed to protecting your personal
          information. We will never share your data with third parties without
          your consent. If you have any concerns about privacy or data security,
          please reach out to us.
        </Card.Footer>
      </Card>
    </Fragment>
  );
};

export default SignUp;
