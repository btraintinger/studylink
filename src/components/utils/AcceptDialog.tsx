import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { StayPrimaryLandscape } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import NotesIcon from '@mui/icons-material/Notes';
import CancelIcon from '@mui/icons-material/Cancel';
import { MatchListItem } from '../../pages/student/matches';

export interface AcceptDialogInfo {
  rating: number;
  type: string;
  grade: number;
  schoolSubjectName: string;
  teacherName: string;
  description: string;
}

export interface AcceptDialogProps {
  open: boolean;
  info: AcceptDialogInfo | null;
  setOpen: (open: boolean) => void;
}

export function AcceptDialog(props: AcceptDialogProps) {
  const { setOpen, info, open } = props;

  if (info === null) {
    return null;
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleAccept = () => {
    setOpen(false);
    // TODO Mutation
  };
  if (info !== null && info !== undefined) {
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ bgcolor: '#4caf50' }}>
          {info.type === 'REQUEST' ? 'Anfrage' : 'Angebot'}
        </DialogTitle>
        <Box sx={{ margin: 4 }}>
          <List>
            <ListItem>
              <ClassIcon sx={{ mr: 2 }} />
              <Typography> Fach: {info.schoolSubjectName}</Typography>
            </ListItem>
            <ListItem>
              <PersonIcon sx={{ mr: 2 }} />
              <Typography> Lehrer: {info.teacherName}</Typography>
            </ListItem>
            <ListItem>
              <GroupsIcon sx={{ mr: 2 }} />
              <Typography> Schulstufe: {info.grade}</Typography>
            </ListItem>
            <ListItem>
              <NotesIcon sx={{ mr: 2 }} />
              <Typography> Beschreibung: {info.description}</Typography>
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
