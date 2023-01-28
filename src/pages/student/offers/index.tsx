import { Typography, Box } from '@mui/material';
import List from '@mui/material/List';
import { useState } from 'react';
import type { TutorOffering } from '../../../../generated/graphql';
import { useGetTutorOffersOfCurrentUserQuery } from '../../../../generated/graphql';
import Layout from '../../../components/page/layout';
import ItemRequestOffer from '../../../components/student/itemRequestOffer';
import LoadingPage from '../../../components/utils/loadingPage';

const STUDENT_QUERY = gql`
  query GetStudentOfCurrentUser($getStudentByIdId: Float!) {
    getStudentById(id: $getStudentByIdId) {
      user {
        name
        email
      }
      schoolClass {
        departmentId
        grade
        name
      }
    }
  }
`;

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
              schoolSubjectNameAbbr={offer.schoolSubject.name}
              schoolSubjectNameFull="jodl"
              displayWidth={500}
            />
          );
        })}
      </List>
    </Layout>
  );
}
