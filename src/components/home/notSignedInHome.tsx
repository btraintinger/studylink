import { Box, Grid, Typography, styled, Button } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { LoginRounded } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '../page/footer';
import { MarketingLogo } from '../utils/marketingLogo';

const BGImage =
  'https://images.unsplash.com/photo-1656510922456-e9018507288f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';

export default function NotSignedInHome() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#ebfff1',
          flexDirection: 'column',
        }}
      >
        <MarketingLogo />
        <Typography variant="h5" sx={{ mt: 2, textAlign: 'center', color:'#000000' }}>
          Studylink ist eine Plattform, die es Schülern innerhalb der Schule
          ermöglicht sich Nachhilfe anzubieten.
        </Typography>
        <Typography variant="h6" sx={{ m: 1, color:'#000000'  }}>
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
