import { PaletteMode, ThemeProvider, createTheme } from '@mui/material';
import React, { PropsWithChildren, useContext } from 'react';
import { getDesignTokens } from '../utils/theme';

type modeType = {
  mode: PaletteMode;
  colorMode: { toggleColorMode: () => void };
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
//const ThemeModeContext = React.createContext({ toggleColorMode: () => {} });
const ThemeModeContext = React.createContext<modeType | undefined>(undefined);

export default function ThemeModeContextProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [mode, setMode] = React.useState<PaletteMode>('light');

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ThemeModeContext.Provider value={{ mode, colorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeModeContext() {
  const context = useContext(ThemeModeContext);
  if (context === undefined) {
    throw new Error(
      'useAppContext must be used within a AppContextAppProvider'
    );
  }
  return context;
}
