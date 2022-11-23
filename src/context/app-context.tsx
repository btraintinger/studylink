import { createContext, useContext, useState } from 'react';
import { PropsWithChildren } from 'react';

type drawerState = {
  isDrawerOpen: boolean;
  setDrawerOpen: (setTo: boolean) => void;
};

const AppContext = createContext<drawerState | undefined>(undefined);

export function AppContextProvider({ children }: PropsWithChildren<unknown>) {
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  return (
    <AppContext.Provider value={{ isDrawerOpen, setDrawerOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      'useAppContext must be used within a AppContextAppProvider'
    );
  }
  return context;
}
