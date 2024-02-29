import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import NavComponent from "../../components/NavComponent/NavComponent.jsx";

/**
 * Functional component representing the header section of the application.
 *
 * @returns {JSX.Element} The JSX element for the header.
 */
const Header = () => {
  // Hook to get the current location object from React Router
  const location = useLocation();

  // State to determine whether to hide the header based on the current page
  const [hideHeader, setHideHeader] = useState(false);

  // useEffect to update the state when the location changes
  useEffect(() => {
    // Check if the current page is the home page
    const isHomePage = location.pathname === "/";
    setHideHeader(isHomePage);
  }, [location.pathname]);

  // Render the header only if it is not set to be hidden
  return (
    !hideHeader && (
      <Fragment>
        {/* Header section with navigation component */}
        <header>
          <NavComponent />
        </header>
      </Fragment>
    )
  );
};

export default Header;
