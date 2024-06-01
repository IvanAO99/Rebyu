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
    <div className="flex flex-col items-center justify-center bg-cover w-3/4 mx-auto">
      <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        ¡Already Many of Us!
      </h1>
      <div className="w-full h-64 relative">
        <img
          src="src/assets/layout-image.png"
          alt="Decorative Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-fade-edge"></div>
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
              className="text-purple-500 dark:text-purple-400 text-7xl font-bold"
            />
          ) : (
            <p className="text-purple-500 dark:text-purple-400 text-7xl font-bold">
              {registeredGames}
            </p>
          )}
          <p className="text-3xl text-gray-800 dark:text-gray-200">
            Registered Games
          </p>
        </div>
        <div className="flex flex-col items-center" ref={affiliatesInViewRef}>
          {affiliatesInView ? (
            <CountUp
              end={affiliates}
              duration={3}
              className="text-purple-500 dark:text-purple-400 text-7xl font-bold"
            />
          ) : (
            <p className="text-purple-500 dark:text-purple-400 text-7xl font-bold">
              {affiliates}
            </p>
          )}
          <p className="text-3xl text-gray-800 dark:text-gray-200">
            Affiliated People
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <p className="text-lg text-gray-800 dark:text-gray-200">
          What are you waiting for?
        </p>
        {isSessionUp && validateObject(user) ? (
          <>
            <Link
              to="/affiliate"
              className="text-purple-500 dark:text-purple-400 hover:underline text-2xl"
            >
              Become a member and support the project!
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-purple-500 dark:text-purple-400 hover:underline text-2xl"
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
