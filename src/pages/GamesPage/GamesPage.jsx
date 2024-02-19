import React, { Fragment } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Games from "../../components/Games/Games.jsx";

const GamesPage = () => {
  return (
    <Fragment>
      <Container className="py-5 h-100">
        <Row className="g-5">
          <Games />
        </Row>
      </Container>
    </Fragment>
  );
};

export default GamesPage;
