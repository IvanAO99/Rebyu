import React from "react";

import { useInView } from "react-intersection-observer";

/**
 * Componente AboutUs
 *
 * Este componente presenta información sobre los fundadores de la empresa y su objetivo, utilizando animaciones
 * para una experiencia de usuario dinámica y atractiva. Utiliza `react-intersection-observer` para detectar
 * cuándo los elementos están en la vista y aplicar las animaciones correspondientes.
 *
 */
function AboutUs() {
  const { ref: firstRowRef, inView: firstRowInView } = useInView({
    triggerOnce: true,
  });

  const { ref: secondRowRef, inView: secondRowInView } = useInView({
    triggerOnce: true,
  });

  return (
    <>
      <div className="self-stretch flex flex-row justify-stretch items-center gap-2 mb-5 py-2">
        <div className="flex-grow border-y-2 border-purple-600"></div>
        <h2 className="text-3xl md:text-6xl font-bold"> Who Are We?</h2>
        <div className="flex-grow border-y-2 border-purple-600"></div>
      </div>
      <div className="shadow rounded-3xl bg-gray-100 dark:bg-gray-800 py-5 overflow-x-hidden">
        <div className="container mx-auto text-center w-3/4">
          <div
            ref={firstRowRef}
            className={`flex flex-col md:flex-row mb-5 items-center transition-all duration-1000 transform ${
              firstRowInView
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            <div className="md:w-1/2 flex items-center justify-center">
              <img
                src="src/assets/ivan.jpeg"
                alt="Ivan's profile"
                className="w-48 h-48 rounded-full object-cover border-2"
              />
            </div>
            <div className="md:w-1/2 px-5 py-2">
              <p className="text-lg text-gray-900 dark:text-gray-50 text-justify">
                <span className="text-purple-600 font-bold">Iván</span>{" "}
                discovered his passion for{" "}
                <span className="text-blue-600">web development</span> while
                working at <span className="text-blue-600">Teralco</span>. An
                avid gamer since childhood, he strives to streamline the gaming
                experience through innovative solutions.
              </p>
            </div>
          </div>
          <div
            ref={secondRowRef}
            className={`flex flex-col md:flex-row mb-5 items-center transition-all duration-1000 transform ${
              secondRowInView
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <div className="md:w-1/2 order-2 md:order-1 px-5 py-2">
              <p className="text-lg text-gray-900 dark:text-gray-50 text-justify">
                <span className="text-purple-600 font-bold">Diana's</span>{" "}
                expertise in{" "}
                <span className="text-blue-600">web development</span> and her
                love for gaming have driven her to co-found{" "}
                <span className="text-blue-600">Wizard Software</span>, aiming
                to create solutions that address common gaming challenges.
              </p>
            </div>
            <div className="md:w-1/2 order-1 md:order-2 flex items-center justify-center">
              <img
                src="src/assets/diana.jpg"
                alt="Diana's profile"
                className="w-48 h-48 rounded-full object-cover border-2"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-5 text-purple-600">
              What Is Our Goal?
            </h2>
            <p className="text-lg text-gray-900 dark:text-gray-50">
              Our goal is to{" "}
              <span className="text-purple-600 font-bold">
                simplify the gaming experience
              </span>{" "}
              by centralizing relevant information, providing accurate answers,
              and offering personalized recommendations. We aim to innovate and
              provide tools that positively impact various communities.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
