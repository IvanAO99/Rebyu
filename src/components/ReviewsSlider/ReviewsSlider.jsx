import React, { Fragment } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import useReviews from "../../hooks/useReviews.js";

import Loading from "../Loading/Loading.jsx";
import Review from "../Review/Review.jsx";

import { validateArray } from "../../libraries/validateData.js";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./ReviewsSlider.css";

/**
 * Functional component representing a slider for displaying recent reviews.
 *
 * @returns {JSX.Element} The JSX element for the reviews slider.
 */
const ReviewsSlider = () => {
  // Custom hook to access review-related state and functions
  const { isLoadingLastReviews, lastReviews } = useReviews();

  return (
    <div>
      {/* Check if last reviews are still loading */}
      {isLoadingLastReviews ? (
        <Fragment>
          {/* Display loading spinner while last reviews are loading */}
          <Loading variant="primary" />
        </Fragment>
      ) : (
        <Fragment>
          {/* Swiper component for sliding through reviews */}
          <Swiper
            autoplay={{
              delay: 0,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            speed={10000}
            freeMode={true}
            centeredSlides={true}
            loop={true}
            loopAddBlankSlides={true}
            pagination={{
              type: "progressbar",
            }}
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={1}
            breakpoints={{
              576: {
                slidesPerView: 1,
                spaceBetween: 1,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 1,
              },
              992: {
                slidesPerView: 2,
                spaceBetween: 1,
              },
              1400: {
                slidesPerView: 3,
                spaceBetween: 1,
              },
            }}
            className="reviews-slider"
          >
            {/* Check if there are last reviews available */}
            {validateArray(lastReviews) ? (
              // Map through last reviews and render Review component for each
              lastReviews.map((lastReview, i) => {
                return (
                  <SwiperSlide key={i}>
                    <div style={{ padding: "1rem" }}>
                      {/* Render individual Review component within a slide */}
                      <Review review={lastReview} />
                    </div>
                  </SwiperSlide>
                );
              })
            ) : (
              <>
                {/* Display loading spinner if there are no last reviews */}
                <div style={{ padding: "1rem" }}>
                  <Loading />
                </div>
              </>
            )}
          </Swiper>
        </Fragment>
      )}
    </div>
  );
};

export default ReviewsSlider;
