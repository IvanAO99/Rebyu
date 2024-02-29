import React, { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import useGames from "../../hooks/useGames.js";

import Loading from "../Loading/Loading.jsx";
import Game from "../Game/Game.jsx";

import { validateArray } from "../../libraries/validateData.js";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./GamesSlider.css";

/**
 * A React component for displaying a slider of top games.
 * @function GamesSlider
 * @returns {JSX.Element} The rendered component.
 */
const GamesSlider = () => {
  const { isLoadingTopGames, topGames } = useGames();

  return (
    <div>
      {/* Display loading spinner while top games are being loaded */}
      {isLoadingTopGames ? (
        <Fragment>
          <Loading variant="primary" />
        </Fragment>
      ) : (
        <Fragment>
          {/* Swiper component for the slider */}
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
            {/* Mapping through topGames to create each slide */}
            {validateArray(topGames) ? (
              topGames.map((topGame, i) => {
                return (
                  <SwiperSlide key={i}>
                    {/* Game component for each top game */}
                    <div style={{ padding: "1rem" }}>
                      <Game game={topGame} />
                    </div>
                  </SwiperSlide>
                );
              })
            ) : (
              // Display loading spinner when topGames array is empty
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
