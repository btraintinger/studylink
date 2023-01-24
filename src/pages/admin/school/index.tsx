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
  const { data, loading } = useQuery(SCHOOL_QUERY);

  if (loading)
    <Layout role="ADMIN">
      <LoadingPage></LoadingPage>
    </Layout>;

  if (data === undefined)
    return (
      <Layout role="ADMIN">
        <Box>
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
      </Layout>
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
