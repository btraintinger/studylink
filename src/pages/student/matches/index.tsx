import React from 'react';
import { Box, Button, Link, Popover, Typography } from '@mui/material';
import Layout from '../../../components/page/layout';
import { useGetMatchesOfCurrentUserQuery } from '../../../../generated/graphql';
import { useState } from 'react';
import LoadingPage from '../../../components/utils/loadingPage';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { AcceptDialog, Match } from '../../../components/utils/AcceptDialog';
import InfoIcon from '@mui/icons-material/Info';

export interface MatchListItem {
  id: number;
  rating: number;
  type: string;
  grade: number;
  schoolSubjectName: string;
  teacherName: string;
}

export default function Matches() {
  const [array, setArray] = useState<MatchListItem[]>([]);
  const [selectedRow, setSelected] = useState<Match | null>(null);
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
                grade: match.tutorRequest.grade,
                schoolSubjectName: `${match.tutorRequest.schoolSubject.name} - ${match.tutorRequest.schoolSubject.longName}`,
                teacherName: `${match.tutorRequest.teacher.name} - ${match.tutorRequest.teacher.longName}`,
              };
            } else {
              return {
                id: match.id,
                rating: match.rating,
                type: 'Angebot',
                grade: match.tutorOffering.grade,
                schoolSubjectName: `${match.tutorOffering.schoolSubject.name} - ${match.tutorOffering.schoolSubject.longName}`,
                teacherName: `${match.tutorOffering.teacher.name} - ${match.tutorOffering.teacher.longName}`,
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
      flex: 0.05,
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
      flex: 0.05,
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

    setSelected(match);
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
            Hier werden Vorschläge für Nachhilfekontakte angezeigt, also deine
            Nachhilfetutoren, die dir helfen oder deine Nachhilfeschüler, denen
            du helfen kannst. Besuche unsere{' '}
            <Link href="/info"> Infoseite, </Link> wenn du mehr Informationen
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
        <AcceptDialog open={open} match={selectedRow} setOpen={setOpen} />
      </Box>
    </Layout>
  );
}
