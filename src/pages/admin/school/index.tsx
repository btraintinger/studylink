import { gql, useQuery } from '@apollo/client';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import LoadingPage from '../../../components/loadingPage';

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

  if (data === null)
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
        <Button component={Link} href="/admin/school/new" passHref>
          Neue Schule erstellen
        </Button>
      </Box>
    );

  return (
    <>
      <Typography>{data.getAdministeredSchool.name}</Typography>
    </>
  );
}
