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
 * Componente App
 *
 * Este componente es el punto de entrada principal de la aplicación.
 * Engloba la aplicación dentro del enrutador BrowserRouter de
 * React Router y proporciona los contextos y proveedores necesarios para
 * el funcionamiento de la aplicación.
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
