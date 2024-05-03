import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import RouterComponent from "./routes/RouterComponent";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <RouterComponent />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
