import { Box, Button, Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import { useGetTutorOffersOfCurrentUserQuery, TutorOffering} from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import { Teacher } from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { TEACHERS_ADMIN } from '../../../constants/menu-items';

export default function Offers() {
  const router = useRouter();
  const [array, setArray] = useState<TutorOffering[]>([]);

  const { loading } = useGetTutorOffersOfCurrentUserQuery({
    onCompleted: (data) => {
      if (data)
        setArray(data.getStudentOfCurrentUser.tutorOfferings as TutorOffering[]);
      console.log(array);
    },
  });


  const columns: GridColDef[] = [
    {
      field: 'schoolSubject',
      headerName: 'Fach',
      flex: 0.3,
    },
    {
      field: 'grade',
      headerName: 'Klasse',
      flex: 1,
    },
  ];

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    router.push(`${TEACHERS_ADMIN}/${params.row.id}`);
  };

  if (loading)
    return (
      <Layout role="ADMIN">
        <LoadingPage />
      </Layout>
    );

  return (
    <Layout role="ADMIN">
      <Box sx={{ height: '80vh', width: '100%' }}>
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          fullWidth
          onClick={() => {
            router.push(`${TEACHERS_ADMIN}/new`);
          }}
        >
          Neuen Lehrer hinzufügen
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
