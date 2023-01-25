import { createContext, PropsWithChildren, useContext, useState } from 'react';
import * as items from '../constants/menu-items';

type drawerState = {
  selectedItem: string;
  isDrawerOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setDrawerOpen: (setTo: boolean) => void;
  // eslint-disable-next-line no-unused-vars
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
