import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import NotesIcon from '@mui/icons-material/Notes';
import CancelIcon from '@mui/icons-material/Cancel';
import MailIcon from '@mui/icons-material/Mail';
import {
  GetMatchConnectionInfoQuery,
  useAcceptMatchMutation,
  useGetMatchConnectionInfoLazyQuery,
} from '../../../generated/graphql';
import wrongNumberToNumber from '../../utils/wrongNumberToString';
import { useEffect, useState } from 'react';

export interface Match {
  __typename?: 'Match';
  id: number;
  rating: number;
  type: string;
  tutorOffering: {
    __typename?: 'TutorOffering';
    id: number;
    description: string;
    grade: number;
    studentId: number;
    schoolSubject: {
      __typename?: 'SchoolSubject';
      id: number;
      name: string;
      longName: string;
    };
    teacher: {
      __typename?: 'Teacher';
      id: number;
      longName: string;
      name: string;
      schoolId: number;
    };
  };
  tutorRequest: {
    __typename?: 'TutorRequest';
    description: string;
    grade: number;
    id: number;
    studentId: number;
    schoolSubject: {
      __typename?: 'SchoolSubject';
      id: number;
      longName: string;
      name: string;
    };
    teacher: {
      __typename?: 'Teacher';
      id: number;
      longName: string;
      name: string;
      schoolId: number;
    };
  };
}

export interface AcceptDialogProps {
  open: boolean;
  match: Match | null;
  setOpen: (open: boolean) => void;
}

export function AcceptDialog(props: AcceptDialogProps) {
  const { setOpen, match, open } = props;

  const [matchedStudentInfo, setMatchedStudentInfo] =
    useState<GetMatchConnectionInfoQuery | null>(null);

  const [acceptMatchFunction] = useAcceptMatchMutation();

  const [getMatchConnectionInfoFunction] = useGetMatchConnectionInfoLazyQuery({
    onCompleted: (data) => {
      setMatchedStudentInfo(data);
    },
  });

  useEffect(() => {
    if (open) {
      const matchedStudentId =
        match?.type === 'REQUEST'
          ? match?.tutorRequest.studentId
          : match?.tutorOffering.studentId;

      getMatchConnectionInfoFunction({
        variables: {
          matchConnectionInfoInput: {
            studentId: wrongNumberToNumber(matchedStudentId),
          },
        },
      });
    }
  }, [open]);

  if (match === null) {
    return null;
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleAccept = () => {
    acceptMatchFunction({
      variables: {
        acceptMatchInput: {
          tutorOfferingId: wrongNumberToNumber(match.tutorOffering.id),
          tutorRequestId: wrongNumberToNumber(match.tutorRequest.id),
        },
      },
    });
    setOpen(false);
  };

  const otherMatchPart =
    match.type === 'REQUEST' ? match.tutorRequest : match.tutorOffering;
  const yourMatchPart =
    match.type === 'REQUEST' ? match.tutorOffering : match.tutorRequest;

  if (match !== null && match !== undefined) {
    return (
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{
          style: { borderRadius: 2 },
        }}
      >
        <DialogTitle sx={{ bgcolor: '#4caf50' }}>
          {match.type === 'REQUEST' ? 'Anfrage' : 'Angebot'}
        </DialogTitle>
        <Box sx={{ margin: 4 }}>
          <List>
            <ListItem>
              <Typography sx={{ fontWeight: 'bold' }}>Match</Typography>
            </ListItem>
            <ListItem>
              <PersonIcon sx={{ mr: 2 }} />
              <Typography>
                Dein Match:{' '}
                {
                  matchedStudentInfo?.getMatchConnectionInfo.student.user
                    .firstName
                }{' '}
                {
                  matchedStudentInfo?.getMatchConnectionInfo.student.user
                    .lastName
                }
              </Typography>
            </ListItem>
            <ListItem>
              <MailIcon sx={{ mr: 2 }} />
              <Typography>
                E-Mail:{' '}
                {matchedStudentInfo?.getMatchConnectionInfo.student.user.email}
              </Typography>
            </ListItem>
            <ListItem>
              <ClassIcon sx={{ mr: 2 }} />
              <Typography>
                Schulklasse:{' '}
                {matchedStudentInfo?.getMatchConnectionInfo.schoolClass.name}
                {' - '}
                {
                  matchedStudentInfo?.getMatchConnectionInfo.schoolClass
                    .longName
                }
              </Typography>
            </ListItem>

            <Divider />

            <ListItem>
              <Typography sx={{ fontWeight: 'bold' }}>
                {match.type === 'REQUEST' ? 'Anfrage' : 'Angebot'}
              </Typography>
            </ListItem>

            <ListItem>
              <ClassIcon sx={{ mr: 2 }} />
              <Typography>
                Fach: {otherMatchPart.schoolSubject.name}
                {' - '}
                {otherMatchPart.schoolSubject.longName}
              </Typography>
            </ListItem>
            <ListItem>
              <PersonIcon sx={{ mr: 2 }} />
              <Typography>
                Lehrer: {otherMatchPart.teacher.name}
                {' - '}
                {otherMatchPart.teacher.longName}
              </Typography>
            </ListItem>
            <ListItem>
              <GroupsIcon sx={{ mr: 2 }} />
              <Typography>Schulstufe: {otherMatchPart.grade}</Typography>
            </ListItem>
            <ListItem>
              <NotesIcon sx={{ mr: 2 }} />
              <Typography>
                {' '}
                Beschreibung: {otherMatchPart.description}
              </Typography>
            </ListItem>

            <Divider />

            <ListItem>
              <Typography sx={{ fontWeight: 'bold' }}>
                {match.type === 'REQUEST' ? 'Dein Angebot' : 'Deine Anfrage'}
              </Typography>
            </ListItem>
            <ListItem>
              <ClassIcon sx={{ mr: 2 }} />
              <Typography>
                Fach: {yourMatchPart.schoolSubject.name}
                {' - '}
                {yourMatchPart.schoolSubject.longName}
              </Typography>
            </ListItem>
            <ListItem>
              <PersonIcon sx={{ mr: 2 }} />
              <Typography>
                Lehrer: {yourMatchPart.teacher.name}
                {' - '}
                {yourMatchPart.teacher.longName}
              </Typography>
            </ListItem>
            <ListItem>
              <GroupsIcon sx={{ mr: 2 }} />
              <Typography>Schulstufe: {yourMatchPart.grade}</Typography>
            </ListItem>
            <ListItem>
              <NotesIcon sx={{ mr: 2 }} />
              <Typography>
                {' '}
                Beschreibung: {yourMatchPart.description}
              </Typography>
            </ListItem>
            <ListItemButton
              sx={{ bgcolor: '#4caf50', mt: 5 }}
              onClick={handleAccept}
            >
              <AddIcon sx={{ color: '#ffffff' }} />
              <Typography sx={{ color: '#ffffff' }}>Akzeptieren</Typography>
            </ListItemButton>
            <ListItemButton
              sx={{ bgcolor: '#f51414', mt: 1 }}
              onClick={handleClose}
            >
              <CancelIcon sx={{ color: '#ffffff' }} />
              <Typography sx={{ color: '#ffffff' }}>Abbrechen</Typography>
            </ListItemButton>
          </List>
        </Box>
      </Dialog>
    );
  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Nachhilfe Anfrage</DialogTitle>
      <Box>Nachhilfeinformation kann nicht angezeigt werden</Box>
    </Dialog>
  );
}
