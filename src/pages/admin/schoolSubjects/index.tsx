import { Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import XTable from '../../../components/page/x-table';
import { useGetAdministeredSchoolQuery } from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import { SchoolSubject } from '../../../../generated/graphql';

export default function SchoolSubjects() {
  const [array, setArray] = useState<SchoolSubject[]>([]);
  const { loading } = useGetAdministeredSchoolQuery({
    onCompleted: (data) => {
      if (data)
        setArray(
          data.getAdministeredSchool.schoolSubjects as SchoolSubject[]
        );
    },
  });
  return (
    <Layout role="ADMIN">
      <XTable data={array}/>
    </Layout>
  );
}
