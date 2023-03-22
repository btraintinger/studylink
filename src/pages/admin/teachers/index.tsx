import { Box, Button } from '@mui/material';
import Layout from '../../../components/page/layout';
import { useGetAdministeredTeachersQuery } from '../../../../generated/graphql';
import { useState } from 'react';
import { Teacher } from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { TEACHERS_ADMIN } from '../../../constants/menu-items';

export default function Teachers() {
  const router = useRouter();
  const [array, setArray] = useState<Teacher[]>([]);

  const { loading } = useGetAdministeredTeachersQuery({
    onCompleted: (data) => {
      if (data) setArray(data.getAdministeredSchool.teachers as Teacher[]);
      console.log(array);
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Kürzel',
      flex: 0.3,
    },
    {
      field: 'longName',
      headerName: 'Name',
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
          sx={{
            mb: 2,
            alignSelf: 'center',
            borderRadius: 100,
          }}
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
