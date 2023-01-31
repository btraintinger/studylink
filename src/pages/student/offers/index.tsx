import { Typography, Box } from '@mui/material';
import { useState } from 'react';
import type { TutorOffering } from '../../../../generated/graphql';
import { useGetTutorOffersOfCurrentUserQuery } from '../../../../generated/graphql';
import Layout from '../../../components/page/layout';
import LoadingPage from '../../../components/utils/loadingPage';
import XTable from '../../../components/page/x-table';

export default function Offers() {
  const [array, setArray] = useState<TutorOffering[]>([]);
  const { loading } = useGetTutorOffersOfCurrentUserQuery({
    onCompleted: (data) => {
      if (data)
        setArray(
          data.getStudentOfCurrentUser.tutorOfferings as TutorOffering[]
        );
    },
  });

  if (loading)
    return (
      <Layout role="STUDENT">
        <LoadingPage></LoadingPage>
      </Layout>
    );

  return (
    <Layout role="STUDENT">
      <XTable {...array} />
    </Layout>
  );
}
