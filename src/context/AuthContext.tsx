import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { iUser } from "../interfaces";
import { UserInfo } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";

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

  // Criando a referencia para a coleção desejada
  const usersCollection = collection(db, "users");

  const handleRegister = async (values: any, redirect: any) => {
    setRegisterError(undefined);
    try {
      // Criando as credenciais do usuario com auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (userCredential.user.uid) {
        // Criando um documento especifico no db p/ usuario criado
        await setDoc(doc(usersCollection, userCredential.user.uid), {
          uid: userCredential.user.uid,
          name: values.name,
          email: values.email,
          photoURL: "",
        });

        // Redirecionando para /login
        redirect();
      }
    } catch (error: any) {
      console.log(error);
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
