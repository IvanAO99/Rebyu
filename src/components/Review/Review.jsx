import React, { Fragment } from "react";

import Card from "react-bootstrap/Card";

import {
  StarFill,
  StarHalf,
  Star,
  PencilSquare,
  Trash,
} from "react-bootstrap-icons";
import useReviews from "../../hooks/useReviews";

const Review = ({ review }) => {
  const { showReviewFormModal, showReviewDeleteModal } = useReviews();
  return (
    <Fragment>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-row align-items-center gap-2">
            <img
              src="https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/users/default.jpg"
              className="rounded me-2"
              alt=""
              width={30}
              height={30}
            />
            <p>
              <strong className="me-auto">{review.user_id}</strong>
            </p>
            <p>
              <small>{review.date_time}</small>
            </p>
          </div>
          <div className="d-flex align-items-center gap-5">
            <div className="d-flex align-items-center">
              <StarFill></StarFill>
              <StarFill></StarFill>
              <StarFill></StarFill>
              <StarHalf></StarHalf>
              <Star></Star>
            </div>
            <div className="d-flex align-items-center gap-2">
              <PencilSquare
                onClick={() => showReviewFormModal(true, review.id)}
              />
              <Trash onClick={() => showReviewDeleteModal(review.id)} />
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Text>{review.message}</Card.Text>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Review;