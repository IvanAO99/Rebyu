import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./GamesSlider.css";
import Game from "../Game/Game";
import useGames from "../../hooks/useGames";
import { validateArray } from "../../libraries/validateData";
import Loading from "../Loading/Loading";

const GamesSlider = () => {
  const { topGames } = useGames();

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
        centeredSlides={true}
        loop={true}
        pagination={{
          type: "progressbar",
        }}
        modules={[Autoplay, Pagination]}
        slidesPerView={4}
        spaceBetween={16}
        className="games-slider"
      >
        {validateArray(topGames) ? (
          topGames.map((topGame, i) => {
            return (
              <SwiperSlide key={i}>
                <div style={{ padding: "1rem" }}>
                  <Game game={topGame} />
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

export default GamesSlider;
