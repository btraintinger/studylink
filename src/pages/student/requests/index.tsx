import { gql, useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import LoadingPage from '../../../components/utils/loadingPage';
import { useGetTutorRequestsOfCurrentUserQuery } from '../../../../generated/graphql';

export default function Requests() {
  const { data, loading, error } = useGetTutorRequestsOfCurrentUserQuery();

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
