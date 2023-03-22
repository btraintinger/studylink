import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { MarketingLogo } from '../components/utils/marketingLogo';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function InfoPage() {
  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ flexDirection: 'row' }}>
        <Link href="/" passHref>
          <Image
            src={'/favicon.ico'}
            alt="Studylink logo"
            height={50}
            width={50}
          />
        </Link>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Nachhilfe an deiner Schule
        </Typography>
      </Box>
      <Typography
        variant="h3"
        component="h2"
        align="center"
        gutterBottom
        sx={{ mb: 8 }}
      >
        Finde einen Nachhilfepartner 🚀
      </Typography>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" component="h3" gutterBottom>
            Relevante Nachhilfe 👩‍🎓
          </Typography>
          <Typography variant="body1" gutterBottom>
            Auf Studylink findest du Nachhilfepartner, die die deine Schule
            besuchen. Unser Projekt kann an Schulen intern gestartet werden,
            sodass Nutzer*innen der Plattform nur Nachhilfe Partnerinnen
            vorgeschlagen bekommen, die zu ihren schulischen Anforderungen
            relevante Erfahrungen haben und ihnen wirklich helfen können.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" component="h3" gutterBottom>
            Wir suchen deinen Nachhilfepartner 🔎
          </Typography>
          <Typography variant="body1" gutterBottom>
            Das „Match-Making“, das Finden eines geeigneten Nachhilfepartners,
            übernimmt unser Algorithmus. Wenn zwei Partner*innen gefunden
            wurden, wird ein „Match“ und somit eine Kontaktmöglichkeit
            hergestellt.
          </Typography>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            mt: 2,
            backgroundColor: '#121121',
          }}
        >
          <Typography variant="h5" sx={{ color: '#ffffff' }}>
            Bring Studylink an deine Schule indem du deinen Administrator
            bittest, deine Schule zu registieren. 🏫
          </Typography>
          <Button
            variant="contained"
            component={Link}
            href="/auth/signup"
            passHref
            sx={{ mt: 3 }}
          >
            Administrator Anmeldung
          </Button>
        </Box>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 5,
        }}
      >
        <Link href="/" passHref>
          Zurück zur Startseite
        </Link>
      </Box>
    </Box>
  );
}
