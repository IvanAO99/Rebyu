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
                <a href="/about">Sobre nosotros</a>
              </li>
              <li>
                <a href="/contact">Contacto</a>
              </li>
              <li>
                <a href="/privacy-policy">Política de privacidad</a>
              </li>
              <li>
                <a href="/terms-of-use">Términos de uso</a>
              </li>
            </ul>
          </div>
          <div className="right-block">
            <h3>Síguenos</h3>
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
