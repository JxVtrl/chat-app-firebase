import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "src/context";
import { iPrivate } from "src/interfaces";

export const Private: FC<iPrivate> = ({ children }) => {
  const { user }: any = useAuth();

  if (!user?.uid) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};
