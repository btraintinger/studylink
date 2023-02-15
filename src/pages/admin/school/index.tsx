import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGetAdministeredSchoolQuery } from '../../../../generated/graphql';
import Layout from '../../../components/page/layout';
import LoadingPage from '../../../components/utils/loadingPage';

export default function School() {
  const { data, loading } = useGetAdministeredSchoolQuery();

  const router = useRouter();

  if (loading)
    return (
      <Layout role="ADMIN">
        <LoadingPage></LoadingPage>
      </Layout>
    );

  if (data !== undefined)
    router.push(`/admin/school/${data.getAdministeredSchool.id}`);

  return (
    <Layout role="ADMIN">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '80vh',
        }}
      >
        <Typography variant="h5">Keine Schule gefunden</Typography>
        <Button
          component={Link}
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
          href="/admin/school/new"
          passHref
        >
          Neue Schule erstellen
        </Button>
      </Box>
    </Layout>
  );
}
