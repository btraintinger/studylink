import { Typography } from '@mui/material';
import List from '@mui/material/List';
import { useState } from 'react';
import type { TutorOffering } from '../../../../generated/graphql';
import { useGetTutorOffersOfCurrentUserQuery } from '../../../../generated/graphql';
import Layout from '../../../components/page/layout';
import ItemRequestOffer from '../../../components/student/itemRequestOffer';
import LoadingPage from '../../../components/utils/loadingPage';

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
      <Typography>Offers</Typography>
      <List>
        {array.map((offer: TutorOffering) => {
          return (
            <ItemRequestOffer
              baseRoute="/student/offers"
              id={offer.id}
              teacher={offer.teacher}
              description={offer.description}
              grade={offer.grade}
              schoolSubject={`${offer.schoolSubject.name} (${offer.schoolSubject.extendedName})`}
            ></ItemRequestOffer>
          );
        })}
      </List>
    </Layout>
  );
}
