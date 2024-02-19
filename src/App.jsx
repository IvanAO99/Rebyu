import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import UsersProvider from "./contexts/UsersProvider.jsx";

import Header from "./structure/Header/Header.jsx";
import Main from "./structure/Main/Main.jsx";
import RoutesComponent from "./routes/RoutesComponent.jsx";
import Footer from "./structure/Footer/Footer.jsx";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <UsersProvider>
          <Row>
            <Col>
              <Header />
            </Col>
          </Row>
          <Row /* className="flex-grow-1" */ className="h-100">
            <Col>
              <Main>
                <RoutesComponent />
              </Main>
            </Col>
          </Row>
        </UsersProvider>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
