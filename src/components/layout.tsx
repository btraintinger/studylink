import * as React from 'react';
import styles from './layout.module.css';
import Main from './main';
import { Footer } from '../components/footer';
import Box from '@mui/material/Box';
import { styled, Grid } from '@mui/material';
import NavBar from './app-bar';

import { AppContextProvider } from '../context/app-context';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MiniDrawer from './variant-drawer';

const appName = 'Studylink';
export const siteTitle = 'Studylink';

type Props = {
  children: React.ReactNode;
  home: boolean;
};

const ContainerBox = styled(Box)`
  display: flex;
  overflow: hidden;
  height: inherit;
  flex-direction: column;
  min-height: 100vh;
`;

const ItemBox = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: 'row';
  overflow: hidden;
  height: inherit;
`;

export default function Layout({ children, home }: Props) {
  return (
    <AppContextProvider>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <MiniDrawer />
        <Grid item xs={8}>
          <Main>{children}</Main>
        </Grid>
        <Grid></Grid>
      </Grid>
    </AppContextProvider>
  );
}
