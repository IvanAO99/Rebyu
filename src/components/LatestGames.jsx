import React from "react";
import useGames from "../hooks/useGames";
import Game from "./Game";
import Loading from "./Loading";
import Slider from "react-slick";
import { validateArray } from "../libraries/validateData";

const LatestGames = () => {
  const { latestGames, isLoadingLatestGames } = useGames();

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
          <h2 className="text-6xl font-bold">LATEST GAMES</h2>
          <div className="flex-grow border-y-2 border-purple-600"></div>
        </div>
        {/* Display loading spinner while top games are being loaded */}
        {isLoadingLatestGames ? (
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
            {!validateArray(latestGames) ? (
              <p className="text-center text-purple-400 font-bold py-5 px-2 text-lg">
                No games were found!
              </p>
            ) : (
              <div className="flex flex-col gap-5">
                <Slider {...settings} rtl={true}>
                  {validateArray(latestGames) &&
                    latestGames.map((game, index) => (
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

export default LatestGames;
