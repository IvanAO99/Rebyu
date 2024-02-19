import React, { Fragment } from "react";

import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <Fragment>
      <footer>
        <Col>
          <p className="text-center">
            &copy; <span>2024</span> Software Wizards
          </p>
        </Col>
      </footer>
    </Fragment>
  );
};

export default Footer;
