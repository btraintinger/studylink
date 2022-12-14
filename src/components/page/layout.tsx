import * as React from 'react';
import Main from './main';
import Box from '@mui/material/Box';
import { styled, Grid } from '@mui/material';
import NavBar from './app-bar';

import { AppContextProvider } from '../../context/app-context';
import MiniDrawer from './variant-drawer';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import LoadingPage from '../utils/loadingPage';

export const siteTitle = 'Studylink';

type Props = {
  children: React.ReactNode;
  role: string;
};

export default function Layout({ children, role }: Props) {
  const router = useRouter();

  const { data: session, status } = useSession();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const userRole = session?.user?.role;

  if (status === 'loading') return <LoadingPage />;

  if (status === 'unauthenticated') router.push('/401');

  if (role !== userRole) router.push('/401');

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
