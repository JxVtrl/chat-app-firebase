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
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { iUser, AuthError } from "../interfaces";

const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<iUser | null>(null);
  const [photo, setPhoto] = useState<any>();
  const [userFound, setUserFound] = useState<iUser | null>(null);

  const [registerError, setRegisterError] = useState<AuthError | undefined>(
    undefined
  );
  const [LoginError, setLoginError] = useState<AuthError | undefined>(
    undefined
  );

  // Criando a referencia para as coleções do firestore
  const usersCollection = collection(db, "users");
  const chatsCollection = collection(db, "chats");

  // Função para registrar um novo usuário
  const handleRegister = async (values: any, redirect: any) => {
    setRegisterError(undefined);
    try {
      // Criando as credenciais do usuario com auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const uid = userCredential.user.uid;

      if (uid) {
        // Criando um documento especifico no db p/ usuario criado
        await setDoc(doc(usersCollection, uid), {
          uid: uid,
          name: values.name,
          username: values.username,
          email: values.email,
          photoURL: "",
        });

        // Criando um documento especifico de chat p/ usuario criado
        await setDoc(doc(chatsCollection, uid), {});

        // Redirecionando para home
        redirect();
      }
    } catch (error: any) {
      setRegisterError(error);
    }
  };

  // Função para fazer login
  const handleLogin = async (values: any, redirect: any) => {
    setLoginError(undefined);
    try {
      // fazendo login com as credenciais do usuario
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const uid = userCredential.user.uid;

      const querySnapshot = await getDocs(
        query(usersCollection, where("uid", "==", uid))
      );

      const data = querySnapshot.docs[0].data();

      setUser({
        uid: data.uid,
        name: data.name,
        photoURL: data.photoURL,
        username: data.username,
        email: data.email,
      });

      redirect();
    } catch (error: any) {
      setLoginError(error);
    }
  };

  // Criando o state User com as informações do usuario
  const createUserObject = (user: any) => {
    if (user) {
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
    }
  };

  // Procurando um usuario pelo username
  const findUser = async (username: string) => {
    const querySnapshot = await getDocs(
      query(usersCollection, where("username", "==", username))
    );
    const data = querySnapshot.docs[0].data();

    setUserFound({
      uid: data.uid,
      email: data.email,
      name: data.name,
      username: data.username,
      photoURL: data.photoURL,
    });
  };

  // Atualizando a foto do usuario
  const handleUpdateAvatar = async (photoURL: string) => {
    if (user) {
      // Criando a referencia para o arquivo
      const userRef = doc(usersCollection, user.uid);
      // Atualizando o documento do usuario com a nova foto
      await setDoc(userRef, { photoURL }, { merge: true });
      // Atualizando o estado do usuario com a nova foto
      setUser({ ...user, photoURL });
    }
  };

  // Verificar se há disponibilidade de um username
  const usernameAvailable = async (username: string) => {
    const querySnapshot = await getDocs(
      query(usersCollection, where("username", "==", username))
    );
    return querySnapshot.empty;
  };

  // Alterar o nome do usuario
  const handleUsername = async (username: string) => {
    if (user) {
      // Criando a referencia para o arquivo
      const userRef = doc(usersCollection, user.uid);
      // Atualizando o documento do usuario com o novo username
      await setDoc(userRef, { username }, { merge: true });
      // Atualizando o estado do usuario com o novo username
      setUser({ ...user, username });
    }
  };

  // Verificando o estado do usuario
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.uid) createUserObject(user);
      else setUser(null);
    });

    return () => {
      unsub();
    };
  }, []);

  // Criando URL da foto do usuario
  const getPhotoURL = async (photo: any) => {
    // Criando referencia para o arquivo
    const avatarRef = ref(
      storage,
      `avatars/${user?.uid}.${photo?.type.split("/")[1]}`
    );

    // Pegando o metadata da imagem
    const metadata = {
      contentType: photo?.type,
    };

    // Fazendo upload da imagem
    await uploadBytes(avatarRef, photo, metadata).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        handleUpdateAvatar(url);
      });
    });
  };

  const value = {
    user,
    setUser,
    handleRegister,
    handleLogin,
    registerError,
    LoginError,
    usersCollection,
    handleUpdateAvatar,
    photo,
    setPhoto,
    getPhotoURL,
    usernameAvailable,
    findUser,
    userFound,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
