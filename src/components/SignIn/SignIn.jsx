import React, { Fragment } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignIn = () => {
  return (
    <Fragment>
      <Card className="text-center">
        <Card.Header>Lorem</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Button variant="primary" type="button">
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
