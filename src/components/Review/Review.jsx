import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";

import { FaHeart, FaPen, FaTrash } from "react-icons/fa";

import useReviews from "../../hooks/useReviews.js";
import useUsers from "../../hooks/useUsers.js";

import Stars from "../Stars/Stars.jsx";

import { formatDateString } from "../../libraries/manipulateData.js";
import { validateObject } from "../../libraries/validateData.js";

/**
 * Functional React component representing a user review card.
 *
 * @param {Object} props - React component properties.
 * @param {Object} props.review - Review object containing information about the review.
 * @returns {JSX.Element} - Rendered component.
 */
const Review = ({ review }) => {
  const { showReviewFormModal, showReviewDeleteModal } = useReviews();
  const { isSessionUp, user, isAdmin } = useUsers();

  return (
    <Fragment>
      <Card>
        <Card.Header className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <img
                src={
                  review.reviewer.profile_photo ||
                  `https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/users/default.jpg`
                }
                className="rounded me-2"
                alt=""
                width={30}
                height={30}
                loading="lazy"
              />
              <span>
                <strong className="me-auto">{`@${review.reviewer.nickname}`}</strong>
              </span>
            </div>
            <div className="d-flex align-items-center gap-5">
              <Stars score={review.score} size={25} />
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Text>{review.message}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div>
              <span>{formatDateString(review.date_time)}</span>
            </div>
            {review.edited && (
              <div>
                <span>Edited</span>
              </div>
            )}
            <div className="d-flex flex-row justify-content-between align-items-center">
              <FaHeart color="#e4e5e9" size={25} />
              <span className="mx-2">{review.likes}</span>
            </div>
            {isSessionUp && validateObject(user) && isAdmin && (
              <Fragment>
                <div className="d-flex align-items-center gap-2">
                  <FaPen onClick={() => showReviewFormModal(true, review.id)} />
                  <FaTrash onClick={() => showReviewDeleteModal(review.id)} />
                </div>
              </Fragment>
            )}
          </div>
        </Card.Footer>
      </Card>
    </Fragment>
  );
};

export default Review;
