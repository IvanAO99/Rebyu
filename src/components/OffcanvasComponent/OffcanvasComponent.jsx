import React from "react";

import Offcanvas from "react-bootstrap/Offcanvas";

import useGames from "../../hooks/useGames.js";

import "./OffcanvasComponent.css";

/**
 * A React component for displaying an offcanvas that wraps around its children.
 * @param {Object} props - React props for the component.
 * @param {ReactNode} props.children - The content to be displayed within the Offcanvas.
 * @returns {JSX.Element} The rendered OffcanvasComponent.
 */
const OffcanvasComponent = ({ children }) => {
  // Custom hook for managing the state related to games
  const { isGamesOffcanvasShowing, hideGamesOffCanvas } = useGames();

  return (
    <div>
      {/* Offcanvas component */}
      <Offcanvas
        show={isGamesOffcanvasShowing}
        onHide={() => hideGamesOffCanvas()}
        placement={`end`}
        backdrop="static"
      >
        {/* Offcanvas header with close button */}
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>GAME FORM</Offcanvas.Title>
        </Offcanvas.Header>
        {/* Offcanvas body containing children components */}
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default OffcanvasComponent;
