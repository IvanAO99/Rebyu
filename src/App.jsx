import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./structure/Header/Header";
import Main from "./structure/Main/Main";
import Footer from "./structure/Footer/Footer";
import RoutesComponent from "./routes/RoutesComponent";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Main>
          <RoutesComponent />
        </Main>
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
