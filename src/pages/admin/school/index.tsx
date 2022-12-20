import { gql, useQuery } from '@apollo/client';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import LoadingPage from '../../../components/utils/loadingPage';
import Layout from '../../../components/page/layout';
import { signOut } from 'next-auth/react';

const SCHOOL_QUERY = gql`
  query GetAdministeredSchool {
    getAdministeredSchool {
      id
      name
      departments {
        schoolClasses {
          grade
          id
          name
        }
        name
        id
      }
      admins {
        id
        user {
          email
          id
          name
        }
      }
    }
  }
`;

export default function School() {
  const { data, loading, error } = useQuery(SCHOOL_QUERY);

  if (loading) {
    return <LoadingPage />;
  }

  if (data === undefined)
    return (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography>Keine Schule gefunden</Typography>
        <Button
          component={Link}
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 1, mb: 2 }}
          href="/admin/school/new"
          passHref
        >
          Neue Schule erstellen
        </Button>
        <Button onClick={() => signOut()}>Sign out</Button>
      </Box>
    );

  return (
    <Layout role="ADMIN">
      <Typography>{data.getAdministeredSchool.name}</Typography>
      <Button
        component={Link}
        variant="contained"
        fullWidth
        type="submit"
        sx={{ mt: 1, mb: 2 }}
        href={'/admin/school/' + data.getAdministeredSchool.id}
        passHref
      >
        Schule bearbeiten
      </Button>
      <Button onClick={() => signOut()}>Sign out</Button>
    </Layout>
  );
}
