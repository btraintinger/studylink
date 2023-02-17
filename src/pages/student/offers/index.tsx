import { Box, Button, Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import {
  useGetStudentOfCurrentUserQuery,
  TutorOffering,
} from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import { Teacher } from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { OFFERS_STUDENT } from '../../../constants/menu-items';

export default function Offers() {
  const router = useRouter();
  const [array, setArray] = useState<TutorOffering[]>([]);
  const temp: string[] = ['jodl', 'dodl', 'wodl'];
  const temp2: string[] = ['hans', 'huns', 'hens'];

  const { loading } = useGetStudentOfCurrentUserQuery({
    onCompleted: (data) => {
      console.log(data);
      if (data)
        setArray(
          data.getStudentOfCurrentUser.tutorOfferings as TutorOffering[]
        );
    },
  });

  console.log(array);

  const columns: GridColDef[] = [
    {
      field: 'schoolSubject.name',
      headerName: 'Klasse',
      flex: 0.3,
    },
    {
      field: 'grade',
      headerName: 'Klasse',
      flex: 0.3,
    },
    {
      field: 'description',
      headerName: 'Beschreibung',
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
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          fullWidth
          onClick={() => {
            router.push(`${OFFERS_STUDENT}/new`);
          }}
        >
          Neues Angebot hinzufügen
        </Button>
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
