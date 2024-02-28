import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";

const Footer = () => {
  const location = useLocation(); 
  const [hideFooter, setHideFooter] = useState(false); 

  useEffect(() => {
    const isHomePage = location.pathname === "/";
    setHideFooter(isHomePage); 
  }, [location.pathname]);

  return (
    !hideFooter && (
      <Fragment>
        <footer className="footer">
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
          <div className="right-block">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <div>
                <a href="https://facebook.com">
                  <FaFacebook />
                </a>
                <a href="https://twitter.com">
                  <FaTwitter />
                </a>
              </div>
              <div>
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
