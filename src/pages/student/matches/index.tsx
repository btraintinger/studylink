import { Box, Button, Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import {
  useGetMatchesOfCurrentUserQuery,
  Match,
  TutorOffering,
  TutorRequest,
  useGetStudentOfCurrentUserQuery,
} from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import { GetMatchesOfCurrentUserQuery } from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { OFFERS_STUDENT } from '../../../constants/menu-items';
import {
  AcceptDialog,
  AcceptDialogInfo,
  AcceptDialogProps,
} from '../../../components/utils/AcceptDialog';
import { Rowdies } from '@next/font/google';

export type MatchListItem = {
  id: number;
  rating: number;
  type: string;
  grade: number;
  schoolSubjectName: string;
  teacherName: string;
};

export default function Matches() {
  const [array, setArray] = useState<MatchListItem[]>([]);
  const [selectedRow, setSelected] = useState<AcceptDialogInfo | null>(null);
  const [open, setOpen] = useState(false);

  const { data: ownStudent } = useGetStudentOfCurrentUserQuery();

  const { data: matches, loading } = useGetMatchesOfCurrentUserQuery({
    onCompleted: (data) => {
      if (data) {
        const matchList: MatchListItem[] = data.getMatchesOfCurrentUser.map(
          (match) => {
            if (match.type === 'REQUEST') {
              return {
                id: match.id,
                rating: match.rating,
                type: 'Anfrage',
                grade: match.tutorOffering.grade,
                schoolSubjectName: `${match.tutorOffering.schoolSubject.name} - ${match.tutorOffering.schoolSubject.longName}`,
                teacherName: `${match.tutorOffering.teacher.name} - ${match.tutorOffering.teacher.longName}`,
              };
            } else {
              return {
                id: match.id,
                rating: match.rating,
                type: 'Angebot',
                grade: match.tutorRequest.grade,
                schoolSubjectName: `${match.tutorRequest.schoolSubject.name} - ${match.tutorRequest.schoolSubject.longName}`,
                teacherName: `${match.tutorRequest.teacher.name} - ${match.tutorRequest.teacher.longName}`,
              };
            }
          }
        );
        setArray(matchList);
      }
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'rating',
      headerName: 'Rating',
      flex: 0.15,
    },
    {
      field: 'type',
      headerName: 'Typ',
      flex: 0.15,
    },
    {
      field: 'schoolSubjectName',
      headerName: 'Fach',
      flex: 0.2,
    },
    {
      field: 'grade',
      headerName: 'Schulstufe',
      flex: 0.2,
    },
    {
      field: 'teacherName',
      headerName: 'Lehrer',
      flex: 0.2,
    },
  ];
  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const match = matches?.getMatchesOfCurrentUser.find(
      (match) => match.id === params.row.id
    );
    if (match === null) return;
    if (match === undefined) return;

    const tutoringAction =
      match.type === 'REQUEST' ? match.tutorOffering : match.tutorRequest;
    setSelected({
      type: match.type,
      rating: match.rating,
      grade: tutoringAction.grade,
      schoolSubjectName: `${tutoringAction.schoolSubject.name} - ${tutoringAction.schoolSubject.longName}`,
      teacherName: `${tutoringAction.teacher.name} - ${tutoringAction.teacher.longName}`,
      description: tutoringAction.description,
    });
    setOpen(true);
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
        <AcceptDialog open={open} info={selectedRow} setOpen={setOpen} />
      </Box>
    </Layout>
  );
}
