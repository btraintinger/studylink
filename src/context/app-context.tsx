import { createContext, useContext, useState } from 'react';
import { PropsWithChildren } from 'react';
import { ThemeContext, ThemeProvider } from '@emotion/react';

type drawerState = {
  isDrawerOpen: boolean;
  setDrawerOpen: (setTo: boolean) => void;
};

const DrawerContext = createContext<drawerState | undefined>(undefined);

export function DrawerContextProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [isDrawerOpen, setDrawerOpen] = useState(true);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, setDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawerContext() {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error(
      'useAppContext must be used within a AppContextAppProvider'
    );
  }
  return context;
}
