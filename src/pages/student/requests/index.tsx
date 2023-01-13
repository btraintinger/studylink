import { gql, useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import LoadingPage from '../../../components/utils/loadingPage';

const OFFERS_QUERY = gql`
  query GetSchoolClassesOfSchool {
    getStudentOfCurrentUser {
      tutorOfferings {
        description
        grade
        id
        teacher
        schoolSubject {
          extendedName
          name
          id
        }
      }
    }
  }
`;

export default function Requests() {
  const { data, loading, error } = useQuery(OFFERS_QUERY);

  if (loading)
    return (
      <Layout role="STUDENT">
        <LoadingPage></LoadingPage>
      </Layout>
    );

  return (
    <Layout role="STUDENT">
      <Typography>Requests</Typography>
    </Layout>
  );
}
