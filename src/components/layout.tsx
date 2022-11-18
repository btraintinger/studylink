import * as React from 'react';
import styles from './layout.module.css';
import ClippedDrawer from './drawer';
import Main from './main';
import { Footer } from '../components/footer';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';



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
    <ContainerBox>
      <ItemBox>
        <ClippedDrawer/>
        <Main> {children} </Main>
      </ItemBox>
    </ContainerBox>
    
  );
}