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
import { useGetTutorOffersOfCurrentUserQuery } from '../../../../generated/graphql';
import type { TutorOffering } from '../../../../generated/graphql';

export default function Offers() {
  const [array, setArray] = useState<TutorOffering[]>([]);
  const { data, loading, error } = useGetTutorOffersOfCurrentUserQuery({
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
        {array.map((offer: any) => {
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
