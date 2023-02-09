import { useState } from 'react';
import type { TutorOffering } from '../../../../generated/graphql';
import { useGetTutorOffersOfCurrentUserQuery } from '../../../../generated/graphql';
import Layout from '../../../components/page/layout';
import LoadingPage from '../../../components/utils/loadingPage';

export default function Offers() {
  const [array, setArray] = useState<TutorOffering[]>([]);
  const { loading } = useGetTutorOffersOfCurrentUserQuery({
    onCompleted: (data) => {
      if (data) console.log('conv');
      console.log(data);
      setArray(data.getStudentOfCurrentUser.tutorOfferings as TutorOffering[]);
    },
  });

  if (loading) {
    return (
      <Layout role="STUDENT">
        <LoadingPage></LoadingPage>
      </Layout>
    );
  } else if (!loading) {
    console.log(loading);
    console.log(array);
    return (
      <Layout role="STUDENT">
        <p>fdsa</p>
      </Layout>
    );
  }
}
