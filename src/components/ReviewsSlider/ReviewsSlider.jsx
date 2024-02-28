import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./ReviewsSlider.css";
import Game from "../Game/Game";
import useGames from "../../hooks/useGames";
import { validateArray } from "../../libraries/validateData";
import Loading from "../Loading/Loading";
import useReviews from "../../hooks/useReviews";
import Review from "../Review/Review";

const ReviewsSlider = () => {
  const { topGames } = useGames();
  const { lastReviews } = useReviews();

  return (
    <div>
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
        modules={[Autoplay, Grid, Pagination]}
        slidesPerView={2}
        spaceBetween={16}
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
    </div>
  );
};

export default ReviewsSlider;
