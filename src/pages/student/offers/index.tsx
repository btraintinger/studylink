import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import Layout from '../../../components/page/layout';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Greiml', firstName: 'Thomas', fach: 'Mathematik' },
  { id: 2, lastName: 'Schatzmann', firstName: 'Max', fach: 'Mathematik' },
  { id: 3, lastName: 'Weilch', firstName: 'Thomas', fach: 'Mathematik' },
  { id: 4, lastName: 'Öttl', firstName: 'Sophie', fach: 'Mathematik' },
  { id: 5, lastName: 'Sas', firstName: 'Tom', fach: 'Mathematik' },
  { id: 6, lastName: 'Themen', firstName: 'Axel', fach: 'Mathematik' },
  { id: 7, lastName: 'Scheisner', firstName: 'Lola', fach: 'Mathematik' },
  {
    id: 8,
    lastName: 'Rasslkopf',
    firstName: 'Raskolnikov',
    fach: 'Mathematik',
  },
  { id: 9, lastName: 'Templer', firstName: 'Teter', fach: 'Mathematik' },
  { id: 10, lastName: 'Tacker', firstName: 'Sara', fach: 'Mathematik' },
  { id: 11, lastName: 'Senshuber', firstName: 'Lazarus', fach: 'Mathematik' },
];

export default function Offers() {
  return (
    <Layout role="STUDENT">
      <Typography variant="h5" mb={2}>
        Zur Vefügung stehende Nachhilfelehrer
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 8000, bgcolor: 'background.paper' }}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </Box>
    </Layout>
  );
}
