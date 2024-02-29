import React, { Fragment } from "react";

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
  const { isLoadingTopGames, topGames } = useGames();

  return (
    <div>
      {isLoadingTopGames ? (
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
            }}
            speed={5000}
            freeMode={true}
            centeredSlides={true}
            loop={true}
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
                slidesPerView: 2,
                spaceBetween: 1,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 1,
              },
              1400: {
                slidesPerView: 4,
                spaceBetween: 1,
              },
            }}
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
        </Fragment>
      )}
    </div>
  );
};

export default GamesSlider;
