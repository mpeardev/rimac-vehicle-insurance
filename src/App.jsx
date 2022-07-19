import React from "react";
import { ConfirmPage } from "./pages/ConfirmPage/ConfirmPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { PlanPage } from "./pages/PlanPage/PlanPage";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserProvider";
import { PrivateRouter } from "./router/PrivateRouter";

export const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <PrivateRouter>
              <Routes>
                <Route path="/plan" element={<PlanPage />} />
                <Route path="/confirm" element={<ConfirmPage />} />
              </Routes>
            </PrivateRouter>
          }
        />
      </Routes>
    </UserProvider>
  );
};
