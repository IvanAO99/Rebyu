import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

function DecorativeCounter() {
  const registeredGames = 232;
  const affiliates = 323;

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
      <h1 className="text-5xl font-bold text-gray-800 mb-6">¡Already Many of Us!</h1>
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
              className="text-purple-500 text-7xl font-bold"
            />
          ) : (
            <p className="text-purple-500 text-7xl font-bold">{registeredGames}</p>
          )}
          <p className="text-3xl">Registered Games</p>
        </div>
        <div className="flex flex-col items-center" ref={affiliatesInViewRef}>
          {affiliatesInView ? (
            <CountUp
              end={affiliates}
              duration={3}
              className="text-purple-500 text-7xl font-bold"
            />
          ) : (
            <p className="text-purple-500 text-7xl font-bold">{affiliates}</p>
          )}
          <p className="text-3xl">Affiliated People</p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <p className="text-lg">What are you waiting for?</p>
        <a
          href="enlace/a/otra/web"
          className="text-purple-500 hover:underline text-2xl"
        >
          Become a member and support the project!
        </a>
      </div>
    </div>
  );
}

export default DecorativeCounter;
