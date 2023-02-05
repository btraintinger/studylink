import { Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import XTable from '../../../components/page/x-table';
import { useGetSchoolSubjectByIdQuery } from '../../../../generated/graphql';

export default function SchoolSubjects() {
  return (
    <Layout role="ADMIN">
      <Typography>School Subjects</Typography>
    </Layout>
  );
}
