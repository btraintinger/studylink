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
        backgroundColor: 'background.default',
      }}
    >
      <Typography variant="h1">401</Typography>
      <Typography variant="h6">
        Melden Sie sich an um diese Seite sehen zu können
      </Typography>
      <Button component={Link} href="/" variant="contained" passHref>
        Zurück auf die Startseite
      </Button>
    </Box>
  );
}
