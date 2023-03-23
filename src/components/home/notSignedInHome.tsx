import { Box, Typography, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
        <Typography variant="h6" sx={{ m: 1 }}></Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            maxWidth: '50%',
          }}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{ m: 1 }}
            component={Link}
            href="/auth/signin"
            passHref
          >
            Anmelden <ArrowForwardIosIcon />
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{ m: 1 }}
            component={Link}
            href="/auth/resetPassword"
            passHref
          >
            Erstanmeldung <ArrowForwardIosIcon />
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{ m: 1 }}
            component={Link}
            href="/info"
            passHref
          >
            Informationen <ArrowForwardIosIcon />
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
