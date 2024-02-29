import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import SignIn from "../../components/SignIn/SignIn.jsx";

import "./HomePage.css";

/**
 * Functional component representing the home page of the application.
 *
 * @returns {JSX.Element} The JSX element for the home page.
 */
const HomePage = () => {
  // Array of video URLs for the background video
  const videoUrls = [
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/pexels-luanmote-6685366%20(1080p).mp4?t=2024-02-28T10%3A56%3A59.186Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/pexels-pavel-danilyuk-7667867%20(1080p).mp4?t=2024-02-28T10%3A57%3A09.185Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/pexels-pavel-danilyuk-7668110%20(1080p).mp4?t=2024-02-28T10%3A57%3A16.764Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/pexels-rodnae-productions-7914778%20(1080p).mp4?t=2024-02-28T10%3A57%3A25.794Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/pexels-rodnae-productions-7914850%20(1080p).mp4?t=2024-02-28T10%3A57%3A33.713Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/pexels-rodnae-productions-7915041%20(1080p).mp4?t=2024-02-27T10%3A13%3A16.604Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/pexels-ron-lach-7856705%20(2160p).mp4?t=2024-02-28T10%3A57%3A48.149Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/production_id_3946076%20(2160p).mp4?t=2024-02-28T10%3A58%3A19.011Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/production_id_4010188%20(2160p).mp4?t=2024-02-28T10%3A58%3A27.181Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/production_id_4247319%20(1080p).mp4?t=2024-02-28T10%3A58%3A34.984Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/production_id_4354243%20(2160p).mp4?t=2024-02-28T10%3A58%3A41.968Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/production_id_4835516%20(2160p).mp4?t=2024-02-28T10%3A58%3A51.336Z",
  ];

  /**
   * Gets a random index for the video URLs array.
   *
   * @returns {number} A random index for the video URLs array.
   */
  function getRandomVideoIndex() {
    return Math.floor(Math.random() * videoUrls.length);
  }

  // State to track the current video index
  const [currentVideoIndex, setCurrentVideoIndex] = useState(
    getRandomVideoIndex()
  );

  // useEffect to change the video every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex(getRandomVideoIndex());
    }, 10000);

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <main id="hero">
        <div className="promo">
          <div className="welcome-message">
            <p className="welcome-text">GAME DILEMMA?</p>
            <h1 className="web-name">REBYU</h1>
          </div>
          <div className="user-form">
            <h2 className="login-heading">Log In</h2>
            {/* SignIn component for user login */}
            <SignIn homePage={true} className="signin-component" />
            {/* Link to browse without logging in */}
            <Link as={Link} to={"/games"} className="browse-link">
              Or browse without logging in…
            </Link>
          </div>
        </div>
        <div className="video-container">
          {/* Background video element */}
          <video
            muted
            autoPlay
            loop
            className="background-video"
            key={videoUrls[currentVideoIndex]}
          >
            <source src={videoUrls[currentVideoIndex]} type="video/mp4" />
          </video>
        </div>
        {/* Capa element */}
        <div className="capa"></div>
      </main>
    </Fragment>
  );
};

export default HomePage;
