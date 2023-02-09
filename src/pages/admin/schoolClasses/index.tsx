import Layout from '../../../components/page/layout';
import {
  SchoolClass,
  useGetSchoolClassesOfSchoolQuery,
} from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';
import { useState } from 'react';

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
        <div>test</div>
      </Layout>
    );
  }
}
