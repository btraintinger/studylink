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

const OFFERS_QUERY = gql`
  query GetStudentOfCurrentUser {
    getStudentOfCurrentUser {
      tutorOfferings {
        description
        grade
        id
        teacher
        schoolSubject {
          extendedName
          name
          id
        }
      }
    }
  }
`;

export default function Offers() {
  const { data, loading, error } = useQuery(OFFERS_QUERY);
  const [array, setArray] = useState([]);

  useEffect(() => {
    if (data) {
      setArray(data.getStudentOfCurrentUser.tutorOfferings.teacher);
    }
  }, [data]);

  if (loading)
    return (
      <Layout role="STUDENT">
        <LoadingPage></LoadingPage>
      </Layout>
    );

  return (
    <Layout role="STUDENT">
      <Typography>Offers</Typography>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>
            {array.map(function (array) {
              return <ListItem> {array} </ListItem>;
            })}
          </List>
        </nav>
      </Box>
    </Layout>
  );
}
