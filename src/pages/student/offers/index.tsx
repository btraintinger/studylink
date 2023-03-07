import React from 'react';
import { Box, Button, Link, Popover, Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import { useGetTutorOfferingsQuery } from '../../../../generated/graphql';
import { useState } from 'react';
import LoadingPage from '../../../components/utils/loadingPage';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { OFFERS_STUDENT } from '../../../constants/menu-items';
import InfoIcon from '@mui/icons-material/Info';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

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
        <Box sx={{ ml: 5 }}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            <VolunteerActivismIcon /> Offers{' '}
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              sx={{ backgroundColor: '#ffffff', ml: 1 }}
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
                Wenn du ein Fach sehr gut beherrscht, kannst du ein Offer
                anbieten, mit dem du einen Nachhilfeschüler finden kannst.
                Besuche unsere <Link href="/info"> Infoseite </Link> wenn du
                mehr Informationen benötigst.
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
              router.push(`${OFFERS_STUDENT}/new`);
            }}
          >
            Neues Angebot hinzufügen
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
