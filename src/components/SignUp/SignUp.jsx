import React, { Fragment } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignUp = () => {
  return (
    <Fragment>
      <Card className="text-center">
        <Card.Header>Lorem</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="userEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="userPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userRepeatedPassword">
              <Form.Label>Repeat password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userCheckbox">
              <Form.Check type="checkbox" label="Accept terms and services" />
            </Form.Group>
            <Button variant="primary" type="button">
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
