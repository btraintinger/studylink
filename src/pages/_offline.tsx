import CloudOffIcon from '@mui/icons-material/CloudOff';
import { Box, Typography } from '@mui/material';

export default function OfflinePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CloudOffIcon sx={{ fontSize: 200 }} />
      <Typography sx={{ fontSize: 40, fontStyle: 'bold' }}>Offline</Typography>
      <Typography>
        Verbinde dich mit dem Internet um Studylink zu benutzen
      </Typography>
    </Box>
  );
}
