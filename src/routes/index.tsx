import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { ChatPage, Login, Register } from "../pages";

export const routesObject = {
  home: "/",
  login: "/login",
  register: "/register",
};

const RoutesDeclaration: React.FC = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path={routesObject.home} element={<ChatPage />} />
      <Route path={routesObject.login} element={<Login />} />
      <Route path={routesObject.register} element={<Register />} />
      <Route
        path="*"
        element={<Navigate to={`${routesObject.home}`} replace />}
      />
    </Routes>
  );
};

export const AppRoutes = () => (
  <BrowserRouter>
    <RoutesDeclaration />
  </BrowserRouter>
);
