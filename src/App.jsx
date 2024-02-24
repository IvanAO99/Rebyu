import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";

import UsersProvider from "./contexts/UsersProvider.jsx";
import GamesProvider from "./contexts/GamesProvider.jsx";
import ReviewsProvider from "./contexts/ReviewsProvider.jsx";

import Header from "./structure/Header/Header.jsx";
import Main from "./structure/Main/Main.jsx";
import RoutesComponent from "./routes/RoutesComponent.jsx";
import Footer from "./structure/Footer/Footer.jsx";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <UsersProvider>
          <Header />
          <Main>
            <GamesProvider>
              <ReviewsProvider>
                <RoutesComponent />
              </ReviewsProvider>
            </GamesProvider>
          </Main>
        </UsersProvider>
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
