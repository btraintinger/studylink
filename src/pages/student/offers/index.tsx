import { gql, useQuery } from '@apollo/client';
import { Typography, ListItem } from '@mui/material';
import Layout from '../../../components/page/layout';
import LoadingPage from '../../../components/utils/loadingPage';
import { useRouter } from 'next/router';
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useEffect, useState } from 'react';
import ItemRequestOffer from '../../../components/student/itemRequestOffer';
import type { TutorOfferingInput } from './[offerId]';
import { IOffer } from '../../../types/interfaces';

const OFFERS_QUERY = gql`
  query GetStudentOfCurrentUser {
    getStudentOfCurrentUser {
      tutorOfferings {
        description
        grade
        id
        teacher
        studentId
        schoolSubject {
          extendedName
          name
          id
        }
      }
    }
  }
`;

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
  const { data, loading, error } = useQuery(OFFERS_QUERY);
  const [array, setArray] = useState([]);

  useEffect(() => {
    console.log(data);
    if (data) setArray(data.getStudentOfCurrentUser.tutorOfferings);
  }, [data]);

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
