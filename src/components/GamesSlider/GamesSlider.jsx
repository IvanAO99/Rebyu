import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Mousewheel } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./GamesSlider.css";
import Game from "../Game/Game";

const GamesSlider = () => {
  const game = {
    id: "",
    cover_pic:
      "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/games/default.jpg?t=2024-02-23T11%3A08%3A06.764Z",
    title: "Test",
    score: "5",
  };

  return (
    <div>
      <Swiper
        autoplay={{
          delay: 0,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        speed={5000}
        freeMode={true}
        freeModeMomentum={false}
        centeredSlides={true}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          type: "progressbar",
        }}
        mousewheel={true}
        /* navigation={true} */
        modules={[Autoplay, Pagination /* Navigation, */ /* Mousewheel */]}
        slidesPerView={4}
        spaceBetween={16}
        className="games-slider"
      >
        {[...Array(13)].map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <div style={{ padding: "1rem" }}>
                <Game game={game} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default GamesSlider;
