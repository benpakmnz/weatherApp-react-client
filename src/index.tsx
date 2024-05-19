import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ReactGA from "react-ga4";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

ReactGA.initialize("G-E6L3DQCGR4");
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
