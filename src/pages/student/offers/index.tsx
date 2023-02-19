import { Box, Button, Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import {
  useGetStudentOfCurrentUserQuery,
  TutorOffering,
  useGetTutorOfferingsQuery,
} from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import { Teacher } from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { OFFERS_STUDENT } from '../../../constants/menu-items';

interface OfferListItem {
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
  const [array, setArray] = useState<OfferListItem[]>([]);

  const { loading } = useGetTutorOfferingsQuery({
    onCompleted: (data) => {
      if (data) {
        const temp: OfferListItem[] = [];
        data.getStudentOfCurrentUser.tutorOfferings.map((tutorOffering) => {
          temp.push({
            id: tutorOffering.id,
            description: tutorOffering.description,
            grade: tutorOffering.grade,
            schoolSubjectLongName: tutorOffering.schoolSubject.longName,
            schoolSubjectName: tutorOffering.schoolSubject.name,
            teacherLongName: tutorOffering.teacher.longName,
            teacherName: tutorOffering.teacher.name,
          });
        });
        setArray(temp);
      }
    },
  });
  const columns: GridColDef[] = [
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
      headerName: 'Schulstufe',
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
