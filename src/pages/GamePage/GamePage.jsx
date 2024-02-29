import React, { Fragment } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import useReviews from "../../hooks/useReviews.js";

import Reviews from "../../components/Reviews/Reviews.jsx";
import ReviewFormModal from "../../components/Modals/ReviewFormModal/ReviewFormModal.jsx";
import ReviewDeleteModal from "../../components/Modals/ReviewDeleteModal/ReviewDeleteModal.jsx";

/**
 * Functional component representing a page for a game, displaying reviews and allowing users to add new reviews.
 *
 * @returns {JSX.Element} The JSX element for the game page.
 */
const GamePage = () => {
  const { showReviewFormModal, isReviewFormModalOpen, deletingReview } =
    useReviews();

  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <div>
              <Button
                variant="primary"
                onClick={() => showReviewFormModal(false)}
              >
                Make a review
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Reviews />
          </Col>
        </Row>
      </Container>
      <ReviewFormModal isOpen={isReviewFormModalOpen} />
      <ReviewDeleteModal isOpen={deletingReview} />
    </Fragment>
  );
};

export default GamePage;
