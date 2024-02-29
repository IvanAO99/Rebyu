import React, { Fragment } from "react";

/**
 * Functional component representing the main content section of the application.
 *
 * @param {Object} props - React props passed to the component.
 * @param {React.ReactNode} props.children - The child components or elements.
 *
 * @returns {JSX.Element} The JSX element for the main content section.
 */
const Main = ({ children }) => {
  return (
    <Fragment>
      {/* Main content section with dynamic children */}
      <main className="flex-grow-1">{children}</main>
    </Fragment>
  );
};

export default Main;
