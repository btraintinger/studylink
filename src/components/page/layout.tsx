import * as React from 'react';
import Main from './main';
import { Grid } from '@mui/material';
import NavBar from './app-bar';

import { DrawerContextProvider } from '../../context/app-context';
import MiniDrawer from './variant-drawer';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import LoadingPage from '../utils/loadingPage';
import { Footer } from './footer';
import StudylinkHead from '../utils/head';

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
    <>
      <StudylinkHead></StudylinkHead>
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
    </>
  );
}
