import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { MarketingLogo } from '../components/utils/marketingLogo';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function InfoPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MarketingLogo />
      <Button
        variant="contained"
        component={Link}
        href="/auth/signup"
        passHref
        sx={{ mt: 3 }}
      >
        Administrator Registrierung
      </Button>
      <Button
        variant="contained"
        component={Link}
        href="/"
        passHref
        sx={{ mt: 3 }}
      >
        <ArrowBackIcon />
      </Button>
      <Typography
        sx={{
          mt: 4,
          textAlign: 'center',
          alignSelf: 'center',
          maxWidth: '70vw',
        }}
      >
        ## Dummy Text Schüle, Lerninhalte zu verstehen. Oft ist es für Lernende
        sogar leichter, diese Hilfe anzunehmen, wenn sie von einer Mitschülerin
        oder einem Mitschüler kommt, da kein so starkes Autoritätsgefälle
        besteht. Es besteht keine Gefahr, einer Lehrperson den Eindruck zu
        vermitteln, in ihrem Unterricht nicht aufgepasst zu haben, oder Inhalte
        nicht verstehen zu können. Mitschüler*innen waren wahrscheinlich schon
        einmal in einer ähnlichen Situation und so kann gemeinsam ein Weg zum
        Erfolg eingeschlagen werden.
      </Typography>
      <Box sx={{ padding: 3 }}>
        <Image
          src="/images/friends1.jpg"
          alt="friends studying"
          height={300}
          width={500}
        />
      </Box>
    </Box>
  );
}
