import React, { useState, useEffect } from "react";
import "./HomePage.css";
import SignIn from "../../components/SignIn/SignIn.jsx";
import SignUp from "../../components/SignUp/SignUp.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
  const videoUrls = [
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/pexels-luanmote-6685366%20(1080p).mp4?t=2024-02-27T10%3A12%3A20.111Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/pexels-pavel-danilyuk-7667867%20(1080p).mp4?t=2024-02-27T10%3A12%3A29.646Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/pexels-pavel-danilyuk-7668110%20(1080p).mp4?t=2024-02-27T10%3A12%3A35.039Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/pexels-rodnae-productions-7914778%20(1080p).mp4?t=2024-02-27T10%3A12%3A57.619Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/pexels-rodnae-productions-7914850%20(1080p).mp4?t=2024-02-27T10%3A13%3A02.746Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/pexels-rodnae-productions-7915041%20(1080p).mp4?t=2024-02-27T10%3A13%3A16.604Z",
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/pexels-ron-lach-7856705%20(2160p).mp4?t=2024-02-27T10%3A13%3A22.114Z",
  ];

  function getRandomVideoIndex() {
    return Math.floor(Math.random() * videoUrls.length);
  }

  const [currentVideoIndex, setCurrentVideoIndex] = useState(
    getRandomVideoIndex()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex(getRandomVideoIndex());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main id="hero">
        <div className="promo">
          <div className="welcome-message">
            <p className="welcome-text">GAME DILEMMA?</p>
            <h1 className="web-name">REBYU</h1>
          </div>
          <div className="user-form">
            <h2 className="login-heading">Log In</h2>
            <SignIn homePage={true} className="signin-component" />
            <Link as={Link} to={"/games"} className="browse-link">
              Or browse without logging in…
            </Link>
          </div>
        </div>
        <div className="video-container">
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
        <div className="capa"></div>
      </main>
    </>
  );
};

export default HomePage;
