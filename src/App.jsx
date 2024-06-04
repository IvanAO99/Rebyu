import React, { Fragment } from "react";

import { BrowserRouter } from "react-router-dom";

import RouterComponent from "./routes/RouterComponent.jsx";

import UsersProvider from "./contexts/UsersProvider.jsx";
import ListsProvider from "./contexts/ListsProvider.jsx";
import GamesProvider from "./contexts/GamesProvider.jsx";
import ReviewsProvider from "./contexts/ReviewsProvider.jsx";

import Container from "./structure/Container.jsx";
import Header from "./structure/Header.jsx";
import Main from "./structure/Main.jsx";
import Footer from "./structure/Footer.jsx";

import Alert from "./components/Alert.jsx";

/**
 * App Component
 *
 * This component is the main entry point of the application.
 * It wraps the application within the BrowserRouter of React Router
 * and provides the contexts and providers necessary for the application to function.
 *
 */
function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <UsersProvider>
          <Container>
            <Header />
            <ListsProvider>
              <GamesProvider>
                <ReviewsProvider>
                  <Main>
                    <RouterComponent />
                  </Main>
                </ReviewsProvider>
              </GamesProvider>
            </ListsProvider>
            <Footer />
          </Container>
        </UsersProvider>
      </BrowserRouter>
      <Alert />
    </Fragment>
  );
}

export default App;
