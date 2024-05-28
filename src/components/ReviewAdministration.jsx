import React from 'react'
import ReviewsFilter from './ReviewsFilter'
import Reviews from './Reviews'
import useReviews from '../hooks/useReviews'

function ReviewAdministration() {
    const { filteredReviews } = useReviews();
  return (
    <div>
        <ReviewsFilter />
        <Reviews reviews={filteredReviews}/>
    </div>
  )
}

export default ReviewAdministration