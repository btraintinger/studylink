import * as React from 'react';
import Main from '../main';
import Box from '@mui/material/Box';
import { styled, Grid } from '@mui/material';
import NavBar from './app-bar';

import { DrawerContextProvider } from '../../context/app-context';
import MiniDrawer from './variant-drawer';

export const siteTitle = 'Studylink';

type Props = {
  children: React.ReactNode;
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

export default function Layout({ children }: Props) {
  return (
    <DrawerContextProvider>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <MiniDrawer />
        <Grid item xs={9}>
          <Main>{children}</Main>
        </Grid>
        <Grid> xs={3}</Grid>
      </Grid>
    </DrawerContextProvider>
  );
}
