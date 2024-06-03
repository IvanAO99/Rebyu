import React, { Fragment } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import useGames from "../hooks/useGames";
import useUsers from "../hooks/useUsers";
import { validateObject } from "../libraries/validateData";

function DecorativeCounter() {
  const { filteredGames } = useGames();
  const { user, isSessionUp } = useUsers();

  const registeredGames = filteredGames.length;
  const affiliates = 232;

  const [registeredGamesInViewRef, registeredGamesInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [affiliatesInViewRef, affiliatesInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div className="flex flex-col items-center justify-center bg-cover">
      <div className="self-stretch flex flex-row justify-stretch items-center gap-2 mb-5 py-2">
        <div className="flex-grow border-y-2 border-purple-600"></div>
        <h2 className="text-3xl md:text-6xl font-bold">¡Already Many of Us!</h2>
        <div className="flex-grow border-y-2 border-purple-600"></div>
      </div>
      <div className="w-full h-64 relative overflow-hidden">
        <img
          src="src/assets/layout-image.png"
          alt="Decorative Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-fade-edge-light dark:bg-fade-edge-dark "></div>
      </div>
      <div className="flex flex-col md:flex-row justify-evenly w-full px-8 my-10">
        <div
          className="flex flex-col items-center"
          ref={registeredGamesInViewRef}
        >
          {registeredGamesInView ? (
            <CountUp
              end={registeredGames}
              duration={3}
              className="text-purple-600 text-6xl font-bold"
            />
          ) : (
            <p className="text-purple-600 text-6xl font-bold">
              {registeredGames}
            </p>
          )}
          <p className="text-3xl text-gray-900 dark:text-gray-50">
            Registered Games
          </p>
        </div>
        <div className="flex flex-col items-center" ref={affiliatesInViewRef}>
          {affiliatesInView ? (
            <CountUp
              end={affiliates}
              duration={3}
              className="text-purple-600 text-6xl font-bold"
            />
          ) : (
            <p className="text-purple-600 text-6xl font-bold">{affiliates}</p>
          )}
          <p className="text-3xl text-gray-900 dark:text-gray-50">
            Affiliated People
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-5">
        <p className="text-lg text-gray-900 dark:text-gray-50">
          What are you waiting for?
        </p>
        {isSessionUp && validateObject(user) ? (
          <>
            <Link
              to="/affiliate"
              className="text-purple-600 hover:underline text-3xl"
            >
              Become a member and support the project!
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-purple-600 hover:underline text-3xl"
            >
              Log in and discover our advantages!
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default DecorativeCounter;
