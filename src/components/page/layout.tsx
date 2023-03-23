import * as React from 'react';
import Main from './main';
import Box from '@mui/material/Box';
import NavBar from './app-bar';

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
