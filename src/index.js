import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"; // Assuming 'App.js' is in the same directory as 'index.js'

import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from "./reportWebVitals";
import "./styles/authstyle.css";
import Ipfsfile from "./pages/Property";
// import IPFSData from "./pages/Ipfs";
import { BrowserRouter } from "react-router-dom";
// import IPFSImage from "./pages/IPFSImage";

import Marketplace from "./pages/Marketplace";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />

    {/* <Marketplace /> */}
    {/* <PropertyForm></PropertyForm> */}
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
