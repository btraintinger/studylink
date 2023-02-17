import { Box, Button, Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import {
  useGetMatchesOfCurrentUserQuery,
  Match,
  TutorOffering,
  TutorRequest,
} from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import { Teacher } from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { OFFERS_STUDENT } from '../../../constants/menu-items';

export default function Matches() {
  const router = useRouter();
  const [array, setArray] = useState<Match[]>([]);

  type MatchesDisplay = {
    id: number;
    rating: number;
    subject: string;
  };

  const matchesDisplay: MatchesDisplay[] = [];

  const { loading } = useGetMatchesOfCurrentUserQuery({
    onCompleted: (data) => {
      if (data) setArray(data.getMatchesOfCurrentUser as Match[]);
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'rating',
      headerName: '#',
      flex: 0.3,
    },
  ];
  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    router.push(`${OFFERS_STUDENT}/${params.row.id}`);
  };

  if (loading)
    return (
      <Layout role="STUDENT">
        <LoadingPage />
      </Layout>
    );

  return (
    <Layout role="STUDENT">
      <Box sx={{ height: '80vh', width: '100%' }}>
        <DataGrid
          rows={array}
          columns={columns}
          autoPageSize
          pagination
          disableSelectionOnClick
          onRowClick={handleRowClick}
          sx={{
            border: 1,
            borderColor: 'primary.main',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'primary.main',
              fontSize: '1.2rem',
            },
            '& .MuiDataGrid-cell': {
              cursor: 'pointer',
            },
          }}
        ></DataGrid>
      </Box>
    </Layout>
  );
}
