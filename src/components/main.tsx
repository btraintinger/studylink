import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';


const StyledMain = styled('main')({
  flexGrow: 1, p: 3 ,
  minHeight: '100vh',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Main( {children}:PropsWithChildren<unknown>) {
  const theme = useTheme();
  return (
  <StyledMain>
    <DrawerHeader/>
    <Box paddingLeft={6} padding = {4}>
      {children}
    </Box>
  </StyledMain>
  );
}