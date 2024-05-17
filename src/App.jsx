import React from "react";
import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import RouterComponent from "./routes/RouterComponent";
import Header from "./structure/Header";
import Footer from "./structure/Footer";
import UsersProvider from "./contexts/UsersProvider";
import GamesProvider from "./contexts/GamesProvider";
import ReviewsProvider from "./contexts/ReviewsProvider";
import Main from "./structure/Main";
import ListsProvider from "./contexts/ListsProvider";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <UsersProvider>
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
        </UsersProvider>
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
