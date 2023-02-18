import { Box, Button, Popover, Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import {
  useGetStudentOfCurrentUserQuery,
  TutorRequest,
} from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import { Teacher } from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { OFFERS_STUDENT } from '../../../constants/menu-items';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { RequestDialog } from '../../../components/utils/RequestDialog';

export interface RequestListItem {
  id: number;
  description: string;
  grade: number;
  schoolSubjectLongName: string;
  schoolSubjectName: string;
  teacherLongName: string;
  teacherName: string;
}

export default function Offers() {
  const router = useRouter();
  const [array, setArray] = useState<RequestListItem[]>([]);
  const [selectedRow, setSelectedRow] = React.useState(array[0]);
  const [open, setOpen] = React.useState(false);

  const { loading } = useGetStudentOfCurrentUserQuery({
    onCompleted: (data) => {
      if (data) {
        const temp: RequestListItem[] = [];
        data.getStudentOfCurrentUser.tutorRequests.map((tutorRequest) => {
          temp.push({
            id: tutorRequest.id,
            description: tutorRequest.description,
            grade: tutorRequest.grade,
            schoolSubjectLongName: tutorRequest.schoolSubject.longName,
            schoolSubjectName: tutorRequest.schoolSubject.name,
            teacherLongName: tutorRequest.teacher.longName,
            teacherName: tutorRequest.teacher.name,
          });
        });
        setArray(temp);
      }
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'acceptance',
      align: 'center',
      headerName: 'Akzeptieren',
      renderCell() {
        return <PersonIcon />;
      },
    },
    {
      field: 'schoolSubjectName',
      headerName: 'Fach Kürzel',
      flex: 0.3,
    },
    {
      field: 'schoolSubjectLongName',
      headerName: 'Fach Name',
      flex: 0.3,
    },
    {
      field: 'teacherName',
      headerName: 'Lehrer Kürzel',
      flex: 0.3,
    },
    {
      field: 'teacherLongName',
      headerName: 'Lehrer Name',
      flex: 0.3,
    },
    {
      field: 'grade',
      headerName: 'Klasse',
      flex: 0.3,
    },
  ];

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    console.log('params');
    router.push(`${OFFERS_STUDENT}/${params.row.id}`);
  };

  if (loading)
    return (
      <Layout role="STUDENT">
        <LoadingPage />
      </Layout>
    );

  const handleClickOpen = (params) => {
    setSelectedRow(params.row as RequestListItem);
    setOpen(true);
  };

  const handleClose = (acceptedItem: RequestListItem | null) => {
    if (acceptedItem !== null) {
      console.log(acceptedItem);
      //make match and delete acceptedItem from array
    }
    setOpen(false);
  };

  return (
    <Layout role="STUDENT">
      <Box sx={{ height: '80vh', width: '100%' }}>
        <DataGrid
          rows={array}
          columns={columns}
          autoPageSize
          pagination
          disableSelectionOnClick
          onRowClick={handleClickOpen}
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
        <RequestDialog
          selectedRow={selectedRow}
          open={open}
          onClose={handleClose}
        />
      </Box>
    </Layout>
  );
}
