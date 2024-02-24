import React, { Fragment } from "react";

import Button from "react-bootstrap/Button";

import ReviewFormModal from "../../components/Modals/ReviewFormModal/ReviewFormModal";
import useReviews from "../../hooks/useReviews";
import Reviews from "../../components/Reviews/Reviews";

const GamePage = () => {
  const { isReviewFormModalOpen, showReviewFormModal } = useReviews();
  return (
    <Fragment>
      <div>
        <Button variant="primary" onClick={() => showReviewFormModal()}>
          Make a review
        </Button>
      </div>
      <div>
        <Reviews />
      </div>
      <ReviewFormModal isOpen={isReviewFormModalOpen} />
    </Fragment>
  );
};

export default GamePage;
