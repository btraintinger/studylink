import * as React from 'react';
import {
  IOffer,
  ISchoolSubject,
  ITeacher,
  ISchoolClass,
  TTableItem,
  TRow,
} from '../../types/interfaces';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { Grade } from '@mui/icons-material';
import type {
  TutorOffering,
  TutorRequest,
  School,
  Department,
  SchoolSubject,
  Teacher,
  Student,
  SchoolClass,
} from '../../../generated/graphql';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'id',
    headerName: 'ID',
    width: 150,
    editable: true,
  },
  {
    field: 'short',
    headerName: 'Short',
    width: 150,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Name',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'else',
    headerName: 'Else',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

function ClassRow(data: SchoolClass[]): ISchoolClass[] {
  const dataRow = data.map(function (c) {
    return {
      departmentId: c.departmentId,
      id: c.id,
      longName: c.longName,
      name: c.name,
      schoolSubjects: c.schoolSubjects,
    };
  });
  return dataRow;
}

function OfferRow(data: TutorOffering[]): IOffer[] {
  const dataRow = data.map(function (o) {
    return {
      id: o.id,
      schoolSubject: o.schoolSubject,
      teacher: o.teacher,
      grade: o.grade,
      description: o.description,
    };
  });
  return dataRow;
}

function SubjectRow(data: SchoolSubject[]): ISchoolSubject[] {
  const dataRow = data.map(function (s) {
    return {
      id: s.id,
      longName: s.longName,
      name: s.name,
    };
  });
  return dataRow;
}

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function XTable(data: TTableItem) {
  if (data.length === 0)
    return (
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        No data
      </Typography>
    );
  if (data[0] === undefined)
    return (
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, backgroundColor: '#A012' }}
      >
        Can't load data elements
      </Typography>
    );
  let dataRow: TRow = [];
  switch (data[0].__typename) {
    case 'TutorOffering':
      dataRow = OfferRow(data as TutorOffering[]);
      break;
    case 'SchoolClass':
      dataRow = ClassRow(data as SchoolClass[]);
      break;
    case 'SchoolSubject':
      dataRow = SubjectRow(data as SchoolSubject[]);
      break;
  }
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={dataRow}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
