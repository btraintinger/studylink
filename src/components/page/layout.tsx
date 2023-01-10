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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const userRole = session?.user?.role;

  if (status === 'loading') return <LoadingPage />;

  if (status === 'unauthenticated') router.push('/401');

  if (role !== userRole) router.push('/401');

  return (
    <Box sx={{ display: 'flex' }}>
      <MiniDrawer />
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 10 }}>
        <Main> {children}</Main>
      </Box>
    </Box>
  );
}
