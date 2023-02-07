import { Box, Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import XTable from '../../../components/page/x-table';
import { useGetAdministeredSchoolQuery } from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import { SchoolSubject } from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function SchoolSubjects() {
  const [pageSize, setPageSize] = useState(50);
  const [array, setArray] = useState<SchoolSubject[]>([]);

  const { loading } = useGetAdministeredSchoolQuery({
    onCompleted: (data) => {
      if (data)
        setArray(data.getAdministeredSchool.schoolSubjects as SchoolSubject[]);
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Kürzel',
    },
    {
      field: 'longName',
      headerName: 'Name',
    },
  ];

  if (loading)
    return (
      <Layout role="ADMIN">
        <LoadingPage />
      </Layout>
    );

  return (
    <Layout role="ADMIN">
      <Box sx={{ height: '700', width: '100%' }}>
        <DataGrid
          rows={array}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[50, 100, 500]}
          pagination
          disableSelectionOnClick
        ></DataGrid>
      </Box>
    </Layout>
  );
}
