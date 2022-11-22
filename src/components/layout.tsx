import * as React from 'react';
import styles from './layout.module.css';
import ClippedDrawer from './drawer';
import Main from './main';
import { Footer } from '../components/footer';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';

import {AppContextProvider} from '../context/app-context';
import { useState } from 'react';

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


export default function Layout({ 
children, home }: Props) {

  const [nameState, setNameState] = useState("default");
  const value = {nameState, setNameState};

  return (
    <AppContextProvider>
      <Box>
        <ClippedDrawer/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </AppContextProvider>
  );
}