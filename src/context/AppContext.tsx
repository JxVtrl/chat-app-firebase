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
  const [contacts, setContacts] = useState<iUser[] | null>(null);
  const [contactSelected, setContactSelected] = useState<iUser | undefined>(
    undefined
  );

  useEffect(() => {
    const getFakeUsers = async () => {
      let photos: any;
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
          setContacts(data);
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

      if (contacts && photos) {
        const usersWithPhotos = contacts.map((contact) => {
          const photo = photos?.find((photo: any) => photo.id === contact.id);
          return {
            ...contact,
            photos: photo?.url,
          };
        });
        setContacts(usersWithPhotos);
      }
    };

    getFakeUsers();
  }, []);

  const value = {
    contactSelected,
    setContactSelected,
    contacts,
    setContacts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
