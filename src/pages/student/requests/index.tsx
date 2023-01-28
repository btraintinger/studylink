import { Typography } from '@mui/material';
import { useGetTutorRequestsOfCurrentUserQuery } from '../../../../generated/graphql';
import Layout from '../../../components/page/layout';
import LoadingPage from '../../../components/utils/loadingPage';
import MainList from '../../../components/page/main-list';

export default function Requests() {
  const { loading } = useGetTutorRequestsOfCurrentUserQuery();

  if (loading)
    return (
      <Layout role="STUDENT">
        <LoadingPage></LoadingPage>
      </Layout>
    );

  return (
    <Layout role="STUDENT">
      <Typography>
        <MainList
          columnNames={['Fach', ' ', 'Angebot von', 'Klasse', 'Note']}
        />
      </Typography>
    </Layout>
  );
}
