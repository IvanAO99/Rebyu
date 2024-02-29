import React, { Fragment } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./ReviewsSlider.css";
import { validateArray } from "../../libraries/validateData";
import Loading from "../Loading/Loading";
import useReviews from "../../hooks/useReviews";
import Review from "../Review/Review";

const ReviewsSlider = () => {
  const { isLoadingLastReviews, lastReviews } = useReviews();

  return (
    <div>
      {isLoadingLastReviews ? (
        <Fragment>
          <Loading variant="primary" />
        </Fragment>
      ) : (
        <Fragment>
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
            {validateArray(lastReviews) ? (
              lastReviews.map((lastReview, i) => {
                return (
                  <SwiperSlide key={i}>
                    <div style={{ padding: "1rem" }}>
                      <Review review={lastReview} />
                    </div>
                  </SwiperSlide>
                );
              })
            ) : (
              <>
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
