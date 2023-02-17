import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { RequestListItem } from "../../pages/student/requests";

export interface RequestDialogProps {
  open: boolean;
  selectedRow: RequestListItem;
  onClose: () => void;
}

export function RequestDialog(props: RequestDialogProps) {
  const { onClose, selectedRow, open } = props;

  const handleClose = () => {
    onClose();
  };
  const handleListItemClick = () => {
    onClose();
  };

  if(selectedRow !== null && selectedRow !== undefined){
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Nachhilfe Anfrage</DialogTitle>
      <Box>
      {selectedRow.grade}
      </Box>
    </Dialog>
  );
  }
  return (
    <Dialog onClose={handleClose} open={open}>
    <DialogTitle>Nachhilfe Anfrage</DialogTitle>
    <Box>
      Nachhilfeinformation kann nicht angezeigt werden
    </Box>
  </Dialog>
  )
}