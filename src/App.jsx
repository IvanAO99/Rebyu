import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";

import UsersProvider from "./contexts/UsersProvider.jsx";
import GamesProvider from "./contexts/GamesProvider.jsx";
import ReviewsProvider from "./contexts/ReviewsProvider.jsx";

import Header from "./structure/Header/Header.jsx";
import Main from "./structure/Main/Main.jsx";
import RoutesComponent from "./routes/RoutesComponent.jsx";
import Footer from "./structure/Footer/Footer.jsx";
import MessageAlert from "./components/Alerts/MessageAlert/MessageAlert.jsx";

/**
 * Root component of the application.
 *
 * @returns {JSX.Element} The JSX element for the root of the application.
 */
function App() {
  return (
    <Fragment>
      {/* BrowserRouter for handling application routing */}
      <BrowserRouter>
        {/* UsersProvider for managing user-related state */}
        <UsersProvider>
          {/* Header component for the application header */}
          <Header />
          {/* Main component containing the main content */}
          <Main>
            {/* GamesProvider for managing game-related state */}
            <GamesProvider>
              {/* ReviewsProvider for managing reviews-related state */}
              <ReviewsProvider>
                {/* RoutesComponent for defining application routes */}
                <RoutesComponent />
              </ReviewsProvider>
            </GamesProvider>
          </Main>
        </UsersProvider>
        {/* Footer component for the application footer */}
        <Footer />
      </BrowserRouter>
      {/* MessageAlert component for displaying message alerts */}
      <MessageAlert />
    </Fragment>
  );
}

export default App;
