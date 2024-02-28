import React, { useState, useEffect } from "react";
import "./HomePage.css";
import SignIn from "../../components/SignIn/SignIn.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
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
    "https://xexkwbqgwmfjmghirwgq.supabase.co/storage/v1/object/public/videos/intial_page/production_id_4835516%20(2160p).mp4?t=2024-02-28T10%3A58%3A51.336Z"
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
