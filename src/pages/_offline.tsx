import { Box } from '@mui/material';

export default function OfflinePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#ebfff1',
      }}
    >
      <h1>Offline</h1>
      <p>Verbinde dich mit dem Internet um Studylink zu benutzen</p>
    </Box>
  );
}
