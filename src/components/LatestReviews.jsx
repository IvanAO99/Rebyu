import React, { useEffect, useState } from "react";

import Slider from "react-slick";

import useReviews from "../hooks/useReviews.js";

import Loading from "./Loading.jsx";
import Review from "./Review.jsx";

import { validateArray } from "../libraries/validateData.js";

/**
 * Component LatestReviews
 *
 * This component displays a list of the latest reviews added.
 * It uses the useReviews hook to fetch the latest reviews and loading state.
 * It utilizes the Review component to represent each review in the list.
 *
 */
const LatestReviews = () => {
  const { lastReviews, isLoadingLastReviews } = useReviews();

  const [firstSlide, setFirstSlide] = useState();
  const [secondSlide, setSecondSlide] = useState();
  const [thirdSlide, setThirdSlide] = useState();

  const settings = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0,
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
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

  useEffect(() => {
    if (validateArray(lastReviews)) {
      setFirstSlide(lastReviews.slice(0, 8));
      setSecondSlide(lastReviews.slice(8, 16));
      setThirdSlide(lastReviews.slice(16, 24));
    }
  }, [lastReviews]);

  return (
    <>
      <div>
        <div className="flex flex-row justify-stretch items-center gap-2 mb-5 py-2">
          <div className="flex-grow border-y-2 border-purple-600"></div>
          <h2 className="text-6xl font-bold">LATEST REVIEWS</h2>
          <div className="flex-grow border-y-2 border-purple-600"></div>
        </div>
        {isLoadingLastReviews ? (
          <>
            <div className="flex flex-col justify-center items-center px-5 py-2">
              <Loading />
              <p className="px-5 py-2 text-purple-600 font-bold">
                Loading latest reviews...
              </p>
            </div>
          </>
        ) : (
          <>
            {!validateArray(lastReviews) ? (
              <p className="text-center text-purple-400 font-bold py-5 px-2 text-lg">
                Be our first reviewer!
              </p>
            ) : (
              <div className="flex flex-col gap-5">
                <Slider {...settings}>
                  {validateArray(firstSlide) &&
                    firstSlide.map((review, index) => (
                      <Review
                        key={crypto.randomUUID()}
                        review={review}
                        onSlide={true}
                      />
                    ))}
                </Slider>
                <Slider {...settings} rtl={true}>
                  {validateArray(secondSlide) &&
                    secondSlide.map((review, index) => (
                      <Review
                        key={crypto.randomUUID()}
                        review={review}
                        onSlide={true}
                      />
                    ))}
                </Slider>
                <Slider {...settings}>
                  {validateArray(thirdSlide) &&
                    thirdSlide.map((review, index) => (
                      <Review
                        key={crypto.randomUUID()}
                        review={review}
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

export default LatestReviews;
