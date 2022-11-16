import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { Home, Login, Register } from "src/pages";
import { Private } from "./Private";

export const routesObject = {
  home: "/",
  login: "/login",
  register: "/register",
};

const RoutesDeclaration: React.FC = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path={routesObject.home}
        element={
          <Private>
            <Home />
          </Private>
        }
      />
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
