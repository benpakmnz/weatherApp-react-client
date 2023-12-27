import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import WeatherPage from "../Pages/Weather/Weather";
import Login from "../Pages/Login";
import RequireAuth from "./RequireAuth";

const AppMain: React.FC = () => {
  return (
    <main>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <WeatherPage />
              </RequireAuth>
            }
          />
        </Routes>
      </HashRouter>
    </main>
  );
};

export default AppMain;
