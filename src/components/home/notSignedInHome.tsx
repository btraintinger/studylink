import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LoginIcon from '@mui/icons-material/Login';
import { Box, Button, Typography, Paper } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '../page/footer';
import BGImage from './image/bg.jpg';

export default function NotSignedInHome() {
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
      <Image height={150} width={150} src="/favicon.ico" alt="logo" />
      <Typography variant="h2">Studylink</Typography>
      <Typography variant="h5" sx={{ m: 1, fontStyle: 'bold' }}>
        Willkommen zurück! Bitte melde dich an
      </Typography>
      <Button
        variant="contained"
        sx={{ m: 1 }}
        size="large"
        component={Link}
        href="/auth/signin"
        passHref
        endIcon={<LoginIcon />}
      >
        Anmelden
      </Button>

      <Button
        sx={{ mt: 10 }}
        component={Link}
        href="/info"
        passHref
        variant="contained"
        size="large"
        endIcon={<ArrowForwardIosIcon />}
      >
        Du willst mehr über Studylink erfahren oder selbst eine Schule
        administrieren?
      </Button>
      <Footer />
    </Box>
  );
}
