import "./App.css";
import { BrowserRouter } from "react-router-dom";

import MainRoutes from "./Routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
