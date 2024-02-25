import React from "react";

import Offcanvas from "react-bootstrap/Offcanvas";

import "./OffcanvasComponent.css";
import useGames from "../../hooks/useGames";

const OffcanvasComponent = ({ children }) => {
  const { isGamesOffcanvasShowing, hideGamesOffCanvas } = useGames();

  return (
    <div>
      <Offcanvas
        show={isGamesOffcanvasShowing}
        onHide={() => hideGamesOffCanvas()}
        placement={`end`}
        backdrop="static"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>GAME FORM</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default OffcanvasComponent;
