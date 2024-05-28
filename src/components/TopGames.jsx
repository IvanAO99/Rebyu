import React from "react";
import Slider from "react-slick";

import useGames from "../hooks/useGames.js";

import Loading from "./Loading.jsx";
import Game from "./Game.jsx";

import { validateArray } from "../libraries/validateData.js";

/**
 * A React component for displaying a slider of top games.
 * @function GamesSlider
 * @returns {JSX.Element} The rendered component.
 */

const TopGames = () => {
  const { isLoadingTopGames, topGames } = useGames();

  const settings = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0,
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    speed: 20000,
    cssEase: "linear",
    variableWidth: true,
  };

  return (
    <>
      <div>
        <div className="flex flex-row justify-stretch items-center gap-1 py-2">
          <div className="flex-grow border-y-2 border-purple-600"></div>
          <h2 className="text-6xl font-bold">TOP GAMES</h2>
          <div className="flex-grow border-y-2 border-purple-600"></div>
        </div>
        {/* Display loading spinner while top games are being loaded */}
        {isLoadingTopGames ? (
          <>
            {/* <Loading variant="primary" /> */}
            <div className="flex flex-col justify-center items-center px-5 py-2">
              <Loading />
              <p className="px-5 py-2 text-purple-600 font-bold">
                Loading latest games...
              </p>
            </div>
          </>
        ) : (
          <>
            {/*             <div>
              <p>{JSON.stringify(topGames)}</p>
            </div> */}
            <div className="flex flex-col gap-5">
              <Slider {...settings}>
                {validateArray(topGames) &&
                  topGames.map((game, index) => (
                    <Game key={crypto.randomUUID()} game={game} />
                  ))}
              </Slider>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TopGames;