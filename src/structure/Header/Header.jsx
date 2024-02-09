import React, { Fragment } from "react";
import NavComponent from "../../components/NavComponent/NavComponent.jsx";

const Header = () => {
  return (
    <Fragment>
      <header className="row">
        <NavComponent />
      </header>
    </Fragment>
  );
};

export default Header;
