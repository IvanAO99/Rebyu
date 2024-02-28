import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import NavComponent from "../../components/NavComponent/NavComponent.jsx";

const Header = () => {
  const location = useLocation(); 
  const [hideHeader, setHideHeader] = useState(false); 

  useEffect(() => {
    const isHomePage = location.pathname === "/";
    setHideHeader(isHomePage); 
  }, [location.pathname]);

  return (
    !hideHeader && (
    <Fragment>
      <header>
        <NavComponent />
      </header>
    </Fragment>
  ));
};

export default Header;
