import React from 'react';
import { Box, Button, Link, Popover, Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import {
  useGetMatchesOfCurrentUserQuery,
  Match,
  TutorOffering,
  TutorRequest,
} from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import { Teacher } from '../../../../generated/graphql';
import LoadingPage from '../../../components/utils/loadingPage';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { OFFERS_STUDENT } from '../../../constants/menu-items';
import { AcceptDialog } from '../../../components/utils/AcceptDialog';
import InfoIcon from '@mui/icons-material/Info';

export type MatchListItem = {
  id: number;
  rating: number;
  requestGrade: number;
  offeringGrade: number;
  schoolSubjectLongName: string;
  schoolSubjectName: string;
  offeringDescription: string;
  requestDescription: string;
  offeringTeacherLongName: string;
  offeringTeacherName: string;
  requestTeacherLongName: string;
  requestTeacherName: string;
};

export default function Matches() {
  const router = useRouter();
  const [array, setArray] = useState<MatchListItem[]>([]);
  const [selectedRow, setSelected] = useState<MatchListItem>(array[0]);
  const [open, setOpen] = useState(false);

  const [InfoAnchorEl, setInfoAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const infoOpen = Boolean(InfoAnchorEl);
  const id = infoOpen ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setInfoAnchorEl(event.currentTarget);
  };
  const handleInfoClose = () => {
    setInfoAnchorEl(null);
  };

  const { loading } = useGetMatchesOfCurrentUserQuery({
    onCompleted: (data) => {
      if (data) {
        const matchList: MatchListItem[] = [];
        let i = 0;
        data.getMatchesOfCurrentUser.map((match) => {
          matchList.push({
            id: i++,
            rating: match.rating,
            requestGrade: match.tutorRequest.grade,
            offeringGrade: match.tutorOffering.grade,
            schoolSubjectLongName: match.tutorOffering.schoolSubject.longName,
            schoolSubjectName: match.tutorOffering.schoolSubject.name,
            offeringDescription: match.tutorOffering.description,
            requestDescription: match.tutorRequest.description,
            offeringTeacherLongName: match.tutorOffering.teacher.longName,
            offeringTeacherName: match.tutorOffering.teacher.name,
            requestTeacherLongName: match.tutorRequest.teacher.longName,
            requestTeacherName: match.tutorRequest.teacher.name,
          });
        });
        setArray(matchList);
      }
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'rating',
      headerName: 'Rating',
      flex: 0.3,
    },
    {
      field: 'requestGrade',
      headerName: 'Anfrage Schulstufe',
      flex: 0.3,
    },
    {
      field: 'offerGrade',
      headerName: 'Angebot Schulstufe',
      flex: 0.3,
    },
    {
      field: 'schoolSubjectLongName',
      headerName: 'Schulfach',
      flex: 0.3,
    },
    {
      field: 'schoolSubjectName',
      headerName: 'Schulfach Kürzel',
      flex: 0.3,
    },
    {
      field: 'offeringDescription',
      headerName: 'Angebot Beschreibung',
      flex: 0.3,
    },
    {
      field: 'requestDescription',
      headerName: 'Anfrage Beschreibung',
      flex: 0.3,
    },
    {
      field: 'offeringTeacherLongName',
      headerName: 'Angebot Lehrer',
      flex: 0.3,
    },
    {
      field: 'offeringTeacherName',
      headerName: 'Angebot Lehrer Kürzel',
      flex: 0.3,
    },
    {
      field: 'requestTeacherLongName',
      headerName: 'Anfrage Lehrer',
      flex: 0.3,
    },
    {
      field: 'requestTeacherName',
      headerName: 'Anfrage Lehrer Kürzel',
      flex: 0.3,
    },
  ];
  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    setSelected(params.row);
    setOpen(true);
  };

  function closeDialog(acceptedMatch: MatchListItem | null) {
    if (acceptedMatch != null) {
      console.log(acceptedMatch);
      setOpen(false);
    }
    setOpen(false);
  }

  if (loading)
    return (
      <Layout role="STUDENT">
        <LoadingPage />
      </Layout>
    );

  return (
    <Layout role="STUDENT">
      <Box sx={{ height: '80vh', width: '100%' }}>
        <Typography sx={{ mb: 1 }} variant="h4">
          Vorgeschlagene Nachhilfekontakte
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            sx={{ backgroundColor: '#ffffff', ml: 1 }}
          >
            <InfoIcon />
          </Button>
        </Typography>
        <Popover
          id={id}
          open={infoOpen}
          anchorEl={InfoAnchorEl}
          onClose={handleInfoClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          sx={{ width: 1000 }}
        >
          <Typography sx={{ p: 2 }}>
            Hier werden Vorschläge für Nachhilfekontakte ngezeigt, also deine
            Nachhilfetutoren, die dir helfen oder deine Nachhilfeschüler, denen
            du helfen kannst. Besuche unsere{' '}
            <Link href="/info"> Infoseite </Link> wenn du mehr Informationen
            benötigst.
          </Typography>
        </Popover>
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
        <AcceptDialog
          open={open}
          selectedRow={selectedRow}
          onClose={closeDialog}
        />
      </Box>
    </Layout>
  );
}
