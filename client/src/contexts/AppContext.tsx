import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  name: string;
  setName: (name: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage or use default
  const [name, setNameState] = useState(() => {
    const saved = localStorage.getItem("app_name");
    return saved || "Shagun";
  });
  

  // Wrapper functions that also save to localStorage
  const setName = (newName: string) => {
    setNameState(newName);
    localStorage.setItem("app_name", newName);
  };

  return (
    <AppContext.Provider value={{ name, setName }}>
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
