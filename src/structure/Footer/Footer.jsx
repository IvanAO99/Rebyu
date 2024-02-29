import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { FaFacebook, FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";

import "./Footer.css";

/**
 * Functional component representing the footer section of the application.
 *
 * @returns {JSX.Element} The JSX element for the footer.
 */
const Footer = () => {
  // Hook to get the current location object from React Router
  const location = useLocation();

  // State to determine whether to hide the footer based on the current page
  const [hideFooter, setHideFooter] = useState(false);

  // useEffect to update the state when the location changes
  useEffect(() => {
    // Check if the current page is the home page
    const isHomePage = location.pathname === "/";
    setHideFooter(isHomePage);
  }, [location.pathname]);

  // Render the footer only if it is not set to be hidden
  return (
    !hideFooter && (
      <Fragment>
        {/* Footer section */}
        <footer className="footer">
          {/* Left block with general links */}
          <div className="left-block">
            <h3>General</h3>
            <ul>
              <li>
                <a href="/about">About us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-of-use">Terms of Use</a>
              </li>
            </ul>
          </div>
          {/* Right block with social media icons */}
          <div className="right-block">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <div>
                {/* Facebook and Twitter icons with links */}
                <a href="https://facebook.com">
                  <FaFacebook />
                </a>
                <a href="https://twitter.com">
                  <FaTwitter />
                </a>
              </div>
              <div>
                {/* Instagram and Discord icons with links */}
                <a href="https://instagram.com">
                  <FaInstagram />
                </a>
                <a href="https://discord.com">
                  <FaDiscord />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </Fragment>
    )
  );
};

export default Footer;
