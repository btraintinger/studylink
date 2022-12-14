import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { Footer } from '../page/footer';

export default function NotSignedInHome() {
  return (
    <>
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
        <Typography variant="h5">
          Studylink ist eine Plattform, die es Schülern innerhalb der Schule
          ermöglicht sich Nachhilfe anzubieten.
        </Typography>
        <Typography variant="h6" sx={{ m: 1 }}>
          Anmelden oder Registrieren um fortzufahren.
        </Typography>
        <Button variant="contained" sx={{ m: 1 }}>
          <Link href="/auth/signin">Anmelden</Link>
        </Button>
        <Button variant="contained" sx={{ m: 1 }}>
          <Link href="/auth/signup">Registrieren</Link>
        </Button>
      </Box>
      <Footer />
    </>
  );
}
