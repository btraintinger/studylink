import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function Error() {
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
      <Typography variant="h1">401</Typography>
      <Typography variant="h5">
        Bitte melden Sie sich mit einem Account an, der über die notwendigen
        Berechtigung verfügt.
      </Typography>
      <Button
        sx={{ marginTop: 1 }}
        component={Link}
        href="/"
        variant="contained"
        passHref
      >
        Zurück auf die Startseite
      </Button>
    </Box>
  );
}
