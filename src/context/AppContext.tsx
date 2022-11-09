import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { iUser } from "../interfaces";

const AppContext = createContext({});

export function AppProvider({ children }: any) {
  const [users, setUsers] = useState<iUser[] | null>(null);
  const [contactSelected, setContactSelected] = useState<iUser | undefined>(
    undefined
  );

  useEffect(() => {
    console.log(contactSelected);
  }, [contactSelected]);

  useEffect(() => {
    const getFakeUsers = async () => {
      let photos: any;
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        })
        .catch((err) => {
          console.log(err);
        });

      await fetch("https://jsonplaceholder.typicode.com/photos")
        .then((res) => res.json())
        .then((data) => {
          photos = data;
        })
        .catch((err) => {
          console.log(err);
        });

      if (users && photos) {
        const usersWithPhotos = users.map((user) => {
          const photo = photos?.find((photo: any) => photo.id === user.id);
          return {
            ...user,
            photos: photo?.url,
          };
        });
        setUsers(usersWithPhotos);
      }
    };

    getFakeUsers();
  }, []);

  const value = {
    contactSelected,
    setContactSelected,
    users,
    setUsers,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
