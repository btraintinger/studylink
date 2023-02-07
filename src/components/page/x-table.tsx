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
import { DataGrid, GridColDef, GridEventListener, GridValueGetterParams } from '@mui/x-data-grid';
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
import { useState } from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Short',
    width: 150,
    editable: false,
  },
  {
    field: 'longName',
    headerName: 'Name',
    type: 'number',
    width: 110,
    editable: false,
  },
  {
    field: 'else',
    headerName: 'Else',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
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
  console.log('SubjectRow');
  console.log(data);
  const dataRow = data.map(function (s) {
    return {
      id: s.id,
      longName: s.longName,
      name : s.name,
    };
  });
  return dataRow;
}

export default function XTable({data, handleEvent}: {data:TTableItem, handleEvent: GridEventListener<'rowClick'>} ) {
  const [pageSize, setPageSize] = useState(50);

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
    <Box sx={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={dataRow}
        onRowClick={handleEvent}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}