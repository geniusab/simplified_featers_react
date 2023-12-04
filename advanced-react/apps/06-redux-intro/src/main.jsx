/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import store from "./app/store.js";
import storeRTK from "./app/store-rtk.js";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={storeRTK}>
      <App />
    </Provider>
  </React.StrictMode>
);
