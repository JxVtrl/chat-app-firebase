import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { iUser } from "src/interfaces";

const AppContext = createContext({});

export function AppProvider({ children }: any) {
  const [menuOpened, setMenuOpened] = useState<0 | 1 | 2 | undefined>(
    undefined
  );
  const [contacts, setContacts] = useState<iUser[] | null>(null);
  const [contactSelected, setContactSelected] = useState<iUser | undefined>(
    undefined
  );
  const [filterContact, setFilterContact] = useState<string | undefined>(
    undefined
  );

  const value = {
    contactSelected,
    setContactSelected,
    contacts,
    setContacts,
    setMenuOpened,
    menuOpened,
    setFilterContact,
    filterContact,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
