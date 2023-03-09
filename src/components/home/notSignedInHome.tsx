import { Box, Typography, Button } from '@mui/material';

import Link from 'next/link';
import { Footer } from '../page/footer';
import { MarketingLogo } from '../utils/marketingLogo';

export default function NotSignedInHome() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          flexDirection: 'column',
        }}
      >
        <MarketingLogo />
        <Typography
          variant="h5"
          sx={{ mt: 2, textAlign: 'center', color: '#000000' }}
        >
          Studylink ist eine Plattform, die es Schülern innerhalb der Schule
          ermöglicht Nachhilfe anzubieten.
        </Typography>
        <Typography variant="h6" sx={{ m: 1, color: '#000000' }}>
          Anmelden oder Registrieren um fortzufahren.
        </Typography>
        <Button
          variant="contained"
          sx={{ m: 1 }}
          component={Link}
          href="/auth/signin"
          passHref
        >
          Anmelden
        </Button>
        <Button
          variant="contained"
          sx={{ m: 1 }}
          component={Link}
          href="/auth/signup"
          passHref
        >
          Neue Schule registrieren
        </Button>
      </Box>
      <Footer />
    </>
  );
}
