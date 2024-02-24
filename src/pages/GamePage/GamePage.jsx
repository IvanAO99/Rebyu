import React, { Fragment } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import ReviewFormModal from "../../components/Modals/ReviewFormModal/ReviewFormModal";
import useReviews from "../../hooks/useReviews";
import Reviews from "../../components/Reviews/Reviews";
import ReviewDeleteModal from "../../components/Modals/ReviewDeleteModal/ReviewDeleteModal";

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
