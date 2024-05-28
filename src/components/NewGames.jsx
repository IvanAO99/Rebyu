import React, { Fragment, useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
/* import "swiper/css/navigation";
import "swiper/css/pagination"; */
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import NewGame from "./NewGame";
import useGames from "../hooks/useGames";
import { validateArray } from "../libraries/validateData";

const NewGames = () => {
  const swiperRef = useRef();

  const { newGames } = useGames();

  const pagination = {
    el: "#swiper-pagination",
    clickable: true,
    renderBullet: (index, className) => {
      return `<button class="${className} custom-bullet"></button>`;
    },
  };

  const urls = [
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/games/wallpapers/cod.png",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/games/wallpapers/tlou.jpg",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/images/games/wallpapers/uncharted.jpg",
  ];

  return (
    <>
      <div className="h-[800px] relative rounded-3xl overflow-hidden">
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
                <Fragment>
                  <SwiperSlide>
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
