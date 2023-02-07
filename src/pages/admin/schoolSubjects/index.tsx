import { Box, Button, Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import { useGetAdministeredSchoolQuery } from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import { SchoolSubject } from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { SCHOOL_SUBJECTS_ADMIN } from '../../../constants/menu-items';

export default function SchoolSubjects() {
  const router = useRouter();
  const [array, setArray] = useState<SchoolSubject[]>([]);

  const { loading } = useGetAdministeredSchoolQuery({
    onCompleted: (data) => {
      if (data)
        setArray(data.getAdministeredSchool.schoolSubjects as SchoolSubject[]);
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
    router.push(`${SCHOOL_SUBJECTS_ADMIN}/${params.row.id}`);
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
            router.push(`${SCHOOL_SUBJECTS_ADMIN}/new`);
          }}
        >
          Neues Fach anlegen
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
