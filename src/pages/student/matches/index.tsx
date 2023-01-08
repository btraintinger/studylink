import { signOut } from 'next-auth/react';
import Layout from '../../../components/page/layout';
import { Typography } from '@mui/material';

export default function Matches() {
  return (
    <Layout role="STUDENT">
      <Typography>Matches</Typography>
    </Layout>
  );
}
