import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context";

interface Props {
  children: JSX.Element;
}

export const Private: FC<Props> = ({ children }) => {
  const { user }: any = useAuth();

  // if (!user?.uid) {
  //   return <Navigate to={"/login"} replace />;
  // }
  return children;
};
