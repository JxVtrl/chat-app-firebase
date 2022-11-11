import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { auth, storage, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { iUser } from "../interfaces";
import { UserInfo } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

interface AuthError {
  code: string;
  message: string;
}

const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<iUser | null>(null);
  const [registerError, setRegisterError] = useState<AuthError | undefined>(
    undefined
  );
  const [LoginError, setLoginError] = useState<AuthError | undefined>(
    undefined
  );

  // Criando a referencia para a coleção desejada
  const usersCollection = collection(db, "users");
  const chatsCollection = collection(db, "chats");

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
          username: values.username,
          email: values.email,
          photoURL: "",
        });

        // Criando um documento especifico de chat p/ usuario criado
        await setDoc(doc(chatsCollection, userCredential.user.uid), {});

        // Redirecionando para home
        redirect();
      }
    } catch (error: any) {
      console.log(error);
      setRegisterError(error);
    }
  };

  const handleLogin = async (values: any, redirect: any) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      if (userCredential.user.uid) {
        redirect();
      }
    } catch (error: any) {
      console.log(error);
      setLoginError(error);
    }
  };

  const createUserObject = (user: any) => {
    const userRef = doc(usersCollection, user.uid);
    getDoc(userRef).then((doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setUser({
          uid: user.uid,
          name: userData.name,
          username: userData.username,
          email: userData.email,
          photoURL: userData.photoURL,
        });
      }
    });
  };

  const handleUpdateAvatar = async (photoURL: string) => {
    if (user) {
      const userRef = doc(usersCollection, user.uid);
      await setDoc(userRef, { photoURL }, { merge: true });
      setUser({ ...user, photoURL });
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      createUserObject(user);
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    console.log(user)
  },[user])

  const value = {
    user,
    setUser,
    handleRegister,
    handleLogin,
    registerError,
    LoginError,
    usersCollection,
    handleUpdateAvatar
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
