import React from "react";

import Slider from "react-slick";

import useGames from "../hooks/useGames.js";

import Loading from "./Loading.jsx";
import Game from "./Game.jsx";

import { validateArray } from "../libraries/validateData.js";

/**
 * Componente TopGames
 *
 * Este componente muestra una lista de los mejores juegos.
 * Utiliza el hook useGames para obtener la lista de los mejores juegos y su estado de carga.
 * Muestra una animación de carga mientras se cargan los juegos.
 * Si no hay juegos cargados, muestra un mensaje indicando que no hay juegos.
 * Si hay juegos cargados, los muestra en un carrusel utilizando el componente Slider de react-slick.
 *
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
    speed: 50000,
    cssEase: "linear",
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          speed: 25000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 10000,
        },
      },
    ],
  };

  return (
    <>
      <div>
        <div className="flex flex-row justify-stretch items-center gap-2 mb-5 py-2">
          <div className="flex-grow border-y-2 border-purple-600"></div>
          <h2 className="text-3xl md:text-6xl font-bold">TOP GAMES</h2>
          <div className="flex-grow border-y-2 border-purple-600"></div>
        </div>
        {isLoadingTopGames ? (
          <>
            <div className="flex flex-col justify-center items-center px-5 py-2">
              <Loading />
              <p className="px-5 py-2 text-purple-600 font-bold">
                Loading latest games...
              </p>
            </div>
          </>
        ) : (
          <>
            {!validateArray(topGames) ? (
              <p className="text-center text-purple-400 font-bold py-5 px-2 text-lg">
                No top games yet!
              </p>
            ) : (
              <div className="flex flex-col gap-5">
                <Slider {...settings}>
                  {validateArray(topGames) &&
                    topGames.map((game, index) => (
                      <Game
                        key={crypto.randomUUID()}
                        game={game}
                        onSlide={true}
                      />
                    ))}
                </Slider>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default TopGames;
