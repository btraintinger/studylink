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
      <Box>
        <Typography>Offers</Typography>

        <List sx={{ width: 500 }}>
          {array.map((offer: IOffer) => (
            <ItemRequestOffer
              baseRoute="/student/offers"
              id={offer.id}
              teacher={offer.teacher}
              description={offer.description}
              grade={offer.grade}
              schoolSubjectNameAbbr={offer.schoolSubject.name}
              schoolSubjectNameFull={offer.schoolSubject.extendedName}
              displayWidth={500}
            />
          ))}
        </List>
      </Box>
    </Layout>
  );
}
