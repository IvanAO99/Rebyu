import React from "react";
import { useInView } from "react-intersection-observer";

function AboutUs() {
  const { ref: firstRowRef, inView: firstRowInView } = useInView({
    triggerOnce: true,
  });

  const { ref: secondRowRef, inView: secondRowInView } = useInView({
    triggerOnce: true,
  });

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white py-12 overflow-x-hidden">
      <div className="container mx-auto text-center w-3/4">
        {/* Título */}
        <h1 className="text-4xl font-bold mb-8 text-purple-600 dark:text-purple-400">Who Are We?</h1>

        {/* Primera fila */}
        <div
          ref={firstRowRef}
          className={`flex flex-col md:flex-row mb-8 items-center transition-all duration-1000 transform ${firstRowInView ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
        >
          <div className="md:w-1/2 flex items-center justify-center">
            <img
              src="src/assets/ivan.jpeg"
              alt="Ivan's profile"
              className="w-48 h-48 rounded-full object-cover border-4"
            />
          </div>
          <div className="md:w-1/2 px-4 py-2">
            <p className="text-lg text-justify text-gray-700 dark:text-gray-300">
              <span className="text-purple-600 dark:text-purple-400 font-bold">Iván</span> discovered his passion for <span className="text-blue-600 dark:text-blue-400">web development</span> while working at <span className="text-blue-600 dark:text-blue-400">Teralco</span>. An avid gamer since childhood, he strives to streamline the gaming experience through innovative solutions.
            </p>
          </div>
        </div>

        {/* Segunda fila */}
        <div
          ref={secondRowRef}
          className={`flex flex-col md:flex-row mb-8 items-center transition-all duration-1000 transform ${secondRowInView ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
        >
          <div className="md:w-1/2 order-2 md:order-1 px-4 py-2">
            <p className="text-lg text-justify text-gray-700 dark:text-gray-300">
              <span className="text-purple-600 dark:text-purple-400 font-bold">Diana's</span> expertise in <span className="text-blue-600 dark:text-blue-400">web development</span> and her love for gaming have driven her to co-found <span className="text-blue-600 dark:text-blue-400">Wizard Software</span>, aiming to create solutions that address common gaming challenges.
            </p>
          </div>
          <div className="md:w-1/2 order-1 md:order-2 flex items-center justify-center">
            <img
              src="src/assets/diana.jpg"
              alt="Diana's profile"
              className="w-48 h-48 rounded-full object-cover border-4 "
            />
          </div>
        </div>

        {/* Subtítulo y párrafo */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-purple-600 dark:text-purple-400">What Is Our Goal?</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Our goal is to <span className="text-purple-600 dark:text-purple-400 font-bold">simplify the gaming experience</span> by centralizing relevant information, providing accurate answers, and offering personalized recommendations. We aim to innovate and provide tools that positively impact various communities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
