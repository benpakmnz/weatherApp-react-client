import React from "react";
import AppHeader from "./components/AppHeader";
import "./theme/index.scss";
import StoreContextProvider from "./shared/store";
import AppMain from "./components/AppMain";
import AppBackground from "./components/AppBackground/AppBackground";
import AppSnackbar from "./components/AppSnackbar";
import ReactGA from "react-ga4";

const App: React.FC = () => {
  ReactGA.initialize("G-TT8184QK2Z");
  return (
    <StoreContextProvider>
      <div className="app-container">
        <AppSnackbar />
        <AppHeader />
        <AppMain />
        <AppBackground />
      </div>
    </StoreContextProvider>
  );
};

export default App;
