import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { Footer } from './footer';

export default function NotSignedInHome() {
  return (
    <>
      <Typography variant="h1">Studylink</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h6">
          Studylink ist eine Plattform, die es Schülern innerhalb der Schule
          ermöglicht sich Nachhilfe anzubieten.
        </Typography>
        <Typography variant="h6">
          Anmelden oder Registrieren um fortzufahren.
        </Typography>
        <Button variant="contained">
          <Link href="/auth/signin">Anmelden</Link>
        </Button>
        <Button variant="contained">
          <Link href="/auth/signup">Registrieren</Link>
        </Button>
      </Box>
      <Footer />
    </>
  );
}
