import { createContext, useContext, useState } from 'react';
import { PropsWithChildren } from 'react';
import { ThemeContext, ThemeProvider } from '@emotion/react';
import * as items from '../constants/menu-items';

type drawerState = {
  selectedItem: string;
  isDrawerOpen: boolean;
  setDrawerOpen: (setTo: boolean) => void;
  setSelectedItem: (setTo: string) => void;
};

const DrawerContext = createContext<drawerState | undefined>(undefined);

export function DrawerContextProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(items.HOME);

  return (
    <DrawerContext.Provider
      value={{ selectedItem, isDrawerOpen, setDrawerOpen, setSelectedItem }}
    >
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
