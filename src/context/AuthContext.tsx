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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

interface AuthError {
  code: string;
  message: string;
}

const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<iUser | null>(null);
  const [photo, setPhoto] = useState<any>();

  const [registerError, setRegisterError] = useState<AuthError | undefined>(
    undefined
  );
  const [LoginError, setLoginError] = useState<AuthError | undefined>(
    undefined
  );

  // Criando a referencia para as coleções do firestore
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
      setRegisterError(error);
    }
  };

  const handleLogin = async (values: any, redirect: any) => {
    setLoginError(undefined);
    try {
      // fazendo login com as credenciais do usuario
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // Redirecionando para home
      if (userCredential.user.uid) redirect();
    } catch (error: any) {
      setLoginError(error);
    }
  };

  const createUserObject = (user: any) => {
    if (user) {
      // Criando um objeto com as informações do usuario
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

  const findUser = async (username: string) => {
    const querySnapshot = await getDocs(
      query(usersCollection, where("username", "==", username))
    );
    const data = querySnapshot.docs[0].data();
    return data;
  };

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

  const usernameAvailable = async (username: string) => {
    const querySnapshot = await getDocs(
      query(usersCollection, where("username", "==", username))
    );
    console.log(querySnapshot.docs.length);

    return querySnapshot.empty;
  };

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

  useEffect(() => {
    // Verificando o estado do usuario
    const unsub = onAuthStateChanged(auth, (user) => {
      createUserObject(user);
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

  useEffect(() => {
    if (user) console.log(user);
  }, [user]);

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
    findUser,
    usernameAvailable,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
