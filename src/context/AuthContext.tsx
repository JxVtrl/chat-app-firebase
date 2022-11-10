import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { iUser } from "../interfaces";
import { UserInfo } from "firebase/auth";

interface AuthError {
  code: string;
  message: string;
}

const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserInfo | undefined>(undefined);
  const [registerError, setRegisterError] = useState<AuthError | undefined>(
    undefined
  );

  const handleRegister = async (values: any) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (userCredential.user) {
        console.log(userCredential.user);
        setUser(userCredential.user);
      }
    } catch (error: any) {
      setRegisterError(error);
    }
  };

  const value = {
    user,
    setUser,
    handleRegister,
    registerError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
