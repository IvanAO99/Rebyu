import React, { Fragment } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import useUsers from "../../hooks/useUsers.js";

import ShowObj from "../development/ShowObj.jsx";

const SignUp = () => {
  const { signUpForm, signUpFormErrors, updateSignUpForm, handleSignUp } =
    useUsers();
  return (
    <Fragment>
      {/* <div>
        <ShowObj obj={signUpForm} />
      </div> */}
      <Card className="shadow">
        <Card.Header className="text-center">SIGN UP</Card.Header>
        <Card.Body>
          <Form className="d-flex flex-column">
            <Form.Group className="mb-3" controlId="sign-up-nickname">
              <Form.Label>Nickname</Form.Label>
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
              <Form.Text className="text-muted">
                Enter a valid nickname
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {signUpFormErrors.nickname}
              </Form.Control.Feedback>
            </Form.Group>
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
            <Form.Group className="mb-3" controlId="sign-up-name">
              <Form.Label>Name</Form.Label>
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
              <Form.Text className="text-muted">Enter a valid name</Form.Text>
              <Form.Control.Feedback type="invalid">
                {signUpFormErrors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="sign-up-birth-date">
              <Form.Label>Birth date</Form.Label>
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
              <Form.Text className="text-muted">Enter a valid date</Form.Text>
              <Form.Control.Feedback type="invalid">
                {signUpFormErrors.birth_date}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="sign-up-profile-photo">
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
              <Form.Text className="text-muted">Enter a valid photo</Form.Text>
              <Form.Control.Feedback type="invalid">
                {signUpFormErrors.profile_photo}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="sign-up-checkbox">
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
              <Form.Control.Feedback type="invalid">
                {signUpFormErrors.terms_services}
              </Form.Control.Feedback>
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
