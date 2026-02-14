import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  name: string;
  setName: (name: string) => void;
  message: string;
  setMessage: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  return (
    <AppContext.Provider value={{ name, setName, message, setMessage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
