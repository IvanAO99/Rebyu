import React, { Fragment, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import useGames from "../hooks/useGames.js";

import NewGame from "./NewGame.jsx";

import { validateArray } from "../libraries/validateData.js";

import "swiper/css";

/**
 * Component NewGames
 *
 * This component displays a list of new games in a sliding carousel.
 * It uses the useGames hook to fetch the list of new games.
 *
 */
const NewGames = () => {
  const { newGames } = useGames();

  const swiperRef = useRef();

  const pagination = {
    el: "#swiper-pagination",
    clickable: true,
    renderBullet: (index, className) => {
      return `<button class="${className} custom-bullet"></button>`;
    },
  };

  return (
    <>
      <div className="h-[400px] md:h-[800px] relative rounded-3xl overflow-hidden">
        <div className="absolute h-full w-full">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            pagination={pagination}
            modules={[Autoplay, Navigation, Pagination]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="h-full w-full"
          >
            {validateArray(newGames) &&
              newGames.map((newGame, index) => (
                <Fragment key={crypto.randomUUID()}>
                  <SwiperSlide key={crypto.randomUUID()}>
                    <NewGame game={newGame} />
                  </SwiperSlide>
                </Fragment>
              ))}
          </Swiper>
        </div>
        <button
          className="z-10 absolute top-2/4 ml-5 shadow-2xl rounded-full bg-gray-800/50 hover:bg-gray-800 p-2 text-purple-600 hover:text-purple-400 transition-all duration-300"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <FaAngleLeft size={24} />
        </button>
        <button
          className="z-10 absolute top-2/4 right-0 mr-5 shadow-2xl rounded-full bg-gray-800/50 hover:bg-gray-800 p-2 text-purple-600 hover:text-purple-400 transition-all duration-300"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <FaAngleRight size={24} />
        </button>
        <div className="z-10 absolute bottom-0 w-full flex justify-center items-center mb-5">
          <div
            id="swiper-pagination"
            className="custom-pagination flex flex-row gap-2"
          ></div>
        </div>
      </div>
    </>
  );
};

export default NewGames;
