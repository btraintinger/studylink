import * as React from 'react';
import Main from './main';
import Box from '@mui/material/Box';
import { styled, Grid, Link } from '@mui/material';
import NavBar from './app-bar';

import { DrawerContextProvider } from '../../context/app-context';
import MiniDrawer from './variant-drawer';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import LoadingPage from '../utils/loadingPage';
import Typography from '@mui/material/Typography';
import { Footer } from './footer';

export const siteTitle = 'Studylink';

type Props = {
  children: React.ReactNode;
  role: string;
};

export default function Layout({ children, role }: Props) {
  const router = useRouter();

  const { data: session, status } = useSession();

  const userRole = session?.user?.role;

  if (status === 'loading') return <LoadingPage />;

  if (status === 'unauthenticated') router.push('/401');

  if (role !== userRole) router.push('/401');

  return (
    <DrawerContextProvider>
      <Grid container xs={12}>
        <Grid item>
          <MiniDrawer />
          <NavBar />
        </Grid>
        <Grid item padding={3} paddingTop={1}>
          <Main>{children}</Main>
        </Grid>
        <Footer />
      </Grid>
    </DrawerContextProvider>
  );
}
