import { Box, Grid, Typography, styled, Button } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { LoginRounded } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';

const BGImage =
  'https://images.unsplash.com/photo-1656510922456-e9018507288f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';

function Logo() {
  return (
    <Box alignItems="center" justifyContent="center">
      <Typography
        variant={'h2'}
        sx={{ color: '#000000', fontVariant: { xs: 'h2', md: 'h1' } }}
      >
        STUDYLINK
      </Typography>
      <Box m="auto">
        <Image
          src={'/favicon.ico'}
          alt="Picture of the author"
          height={300}
          width={300}
        />
      </Box>
    </Box>
  );
}

export default function NotSignedInHome() {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: -2,
        backgroundImage: `url(${BGImage})`,
        backgroundColor: '#34f334', // Average color of the background image.
        backgroundPosition: 'center',
        justify: 'center',
        alignItems: 'center',
        padding: { xs: 0, md: 20 },
      }}
    >
      <Grid container direction={'row'}>
        <Grid item md={5} xs={12}>
          <Logo />
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography variant="h4" sx={{ color: '#000000' }}>
            Studylink ist eine{' '}
            <Typography
              variant="h3"
              sx={{
                color: '#029907',
                fontWeight: 'bold',
              }}
            >
              {' '}
              Nachhilfeplattform{' '}
            </Typography>
            die es dir ermöglicht, dich mit
            <Typography
              variant="h4"
              sx={{
                color: '#029907',
                fontWeight: 'bold',
              }}
            >
              {' '}
              Schüler*innen an deiner Schule{' '}
            </Typography>{' '}
            zu verbinden und gemeinsam zu lernen. Du kannst dich als Schüler*in
            oder Lehrer*in registrieren.
          </Typography>
        </Grid>
      </Grid>
      <Box alignItems="center" justifyContent="center">
        <Typography sx={{ mt: 10 }}>
          Hast du bereits einen Account? Dann melde dich an.
        </Typography>
        <Button
          variant="contained"
          sx={{ m: 1 }}
          size="large"
          component={Link}
          href="/auth/signin"
          passHref
          endIcon={<LoginRounded />}
        >
          Anmelden
        </Button>
        <Typography>
          Möchtest du deine Schule registrieren? Dann klicke auf den Button.
        </Typography>
        <Button
          sx={{ m: 1 }}
          component={Link}
          href="/info"
          passHref
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIos />}
        >
          Neue Schule registrieren
        </Button>
      </Box>
    </Box>
  );
}
