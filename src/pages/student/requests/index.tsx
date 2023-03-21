import React, { useState } from 'react';
import { Box, Button, Link, Popover, Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import { useGetTutorRequestsQuery } from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { REQUESTS_STUDENT } from '../../../constants/menu-items';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import SosIcon from '@mui/icons-material/Sos';

interface RequestListItem {
  id: number;
  description: string;
  grade: number;
  schoolSubjectLongName: string;
  schoolSubjectName: string;
  teacherLongName: string;
  teacherName: string;
}

export default function Requests() {
  const router = useRouter();
  const [array, setArray] = useState<RequestListItem[]>([]);
  const [InfoAnchorEl, setInfoAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(InfoAnchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setInfoAnchorEl(event.currentTarget);
  };
  const handleInfoClose = () => {
    setInfoAnchorEl(null);
  };

  const { loading } = useGetTutorRequestsQuery({
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
    router.push(`${REQUESTS_STUDENT}/${params.row.id}`);
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
        <Box sx={{ ml: 5 }}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            <SosIcon /> Anfragen{' '}
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              sx={{ backgroundColor: '#ffffff', ml: 2 }}
            >
              <InfoIcon />
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={InfoAnchorEl}
              onClose={handleInfoClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              sx={{ width: 1000 }}
            >
              <Typography sx={{ p: 2 }}>
                Wenn du einen Nachhilfebedarf hast, erstelle ein Request um
                deinen Nachhilfelehrer zu finden. Besuch unsere{' '}
                <Link href="/info"> Infoseite </Link> wenn du mehr Informationen
                benötigst.
              </Typography>
            </Popover>
          </Typography>
          <Button
            variant="contained"
            sx={{
              mb: 2,
              alignSelf: 'center',
              borderRadius: 100,
            }}
            onClick={() => {
              router.push(`${REQUESTS_STUDENT}/new`);
            }}
          >
            <AddIcon />
            Neu Anfrage hinzufügen
          </Button>
        </Box>
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
