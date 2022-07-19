import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { App } from "./App";
import "./styles.scss"; //scss base

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </HashRouter>
);
