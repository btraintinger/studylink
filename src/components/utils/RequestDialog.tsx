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
} from '@mui/material';
import { blue } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { RequestListItem } from '../../pages/student/requests';
import { StayPrimaryLandscape } from '@mui/icons-material';
import { useTheme } from '@emotion/react';

export interface RequestDialogProps {
  open: boolean;
  selectedRow: RequestListItem;
  onClose: (acceptedItem:RequestListItem | null) => void;
}

export function RequestDialog(props: RequestDialogProps) {
  const { onClose, selectedRow, open } = props;
  const theme = useTheme();

  const handleClose = () => {
    onClose(null);
  };
  const handleListItemClick = () => {
    onClose(selectedRow);
  };
  if (selectedRow !== null && selectedRow !== undefined) {
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{bgcolor: '#4caf50'}}>Nachhilfe Anfrage</DialogTitle>
        <List>
          <ListItem>
          <Typography>Fach: </Typography>
            <Typography> ({selectedRow.schoolSubjectName}) {selectedRow.schoolSubjectLongName}</Typography>
          </ListItem>
          <ListItem>
          <Typography>Lehrer: </Typography>
            <Typography> ({selectedRow.teacherName}) {selectedRow.teacherLongName}</Typography>
          </ListItem>
          <ListItem>
          <Typography>Klasse: </Typography>
            <Typography> {selectedRow.grade}</Typography>
          </ListItem>
          <ListItem>
          <Typography>Beschreibung: </Typography>
            <Typography> {selectedRow.description}</Typography>
          </ListItem>
          <ListItemButton sx={{bgcolor:'#4caf50'}} onClick={handleListItemClick}>
            <AddIcon sx={{color: '#ffffff'}}/>
            <Typography sx={{color: '#ffffff'}}>Akzeptieren</Typography>
          </ListItemButton>
        </List>
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
