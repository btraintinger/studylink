import { Typography } from '@mui/material';
import {
  useGetTutorRequestsOfCurrentUserQuery,
  TutorRequest,
} from '../../../../generated/graphql';
import Layout from '../../../components/page/layout';
import LoadingPage from '../../../components/utils/loadingPage';
import { useState } from 'react';
import XTable from '../../../components/page/x-table';

export default function Requests() {
  const [array, setArray] = useState<TutorRequest[]>([]);
  const { loading } = useGetTutorRequestsOfCurrentUserQuery();
  // const { loading } = useGetTutorRequestsOfCurrentUserQuery({
  //  onCompleted: (data) => {
  //    if (data)
  //      setArray(data.getStudentOfCurrentUser.tutorRequests as TutorRequest[]);
  //  },
  // });
  // .tutorRequest aktuell noch nicht in getStudentOfCurrentUser vorhanden

  if (loading)
    return (
      <Layout role="STUDENT">
        <LoadingPage></LoadingPage>
      </Layout>
    );

  return (
    <Layout role="STUDENT">
      <Typography>
        <XTable {...array} />
      </Typography>
    </Layout>
  );
}
