import { Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import {
  SchoolClass,
  useGetSchoolClassesOfSchoolQuery,
} from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';
import { useState } from 'react';
import XTable from '../../../components/page/x-table';

export default function Class() {
  const [array, setArray] = useState<SchoolClass[]>([]);
  const { loading } = useGetSchoolClassesOfSchoolQuery({
    onCompleted: (data) => {
      if (data) setArray(data.getSchoolClassesOfSchool as SchoolClass[]);
    },
  });

  if (loading) {
    return (
      <Layout role="ADMIN">
        <LoadingPage></LoadingPage>
      </Layout>
    );
  } else if (!loading) {
    console.log(loading);
    console.log(array);
    return (
      <Layout role="ADMIN">
        <XTable {...array} />
      </Layout>
    );
  }
}
