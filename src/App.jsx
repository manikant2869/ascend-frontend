import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import GlobalContext from "./context/GlobalContext";
import './index.css'
import { useState } from "react";
function App() {
  return (
    <BrowserRouter>
    <GlobalContext>
        <AllRoutes />
    </GlobalContext>
    </BrowserRouter>
  );
}

export default App;