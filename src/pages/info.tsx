import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { MarketingLogo } from '../components/utils/marketingLogo';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useThemeModeContext } from '../context/mode-context';

export default function InfoPage() {
  const myColorMode = useThemeModeContext();

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <MuiLink
            component={Link}
            href={'/'}
            passHref
            underline="none"
            sx={{ display: 'flex', flexDirection: 'row' }}
          >
            {myColorMode.mode === 'light' ? (
              <Image
                height={30}
                width={30}
                src="/images/studylink_logo_dark.svg"
                alt="logo"
              />
            ) : (
              <Image
                height={30}
                width={30}
                src="/images/studylink_logo_light.svg"
                alt="logo"
              />
            )}

            <Typography variant="h6" noWrap letterSpacing={2} sx={{ ml: 2 }}>
              STUDYLINK
            </Typography>
          </MuiLink>

          <IconButton
            color="inherit"
            aria-label="change theme"
            onClick={myColorMode.colorMode.toggleColorMode}
            edge="start"
            sx={{ display: { xs: 'flex' }, mr: 1 }}
          >
            <Brightness4Icon
              sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 3, mt: 10 }}>
        <Box sx={{ flexDirection: 'row' }}>
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
              Auf Studylink findest du Nachhilfepartner, die deine Schule
              besuchen. Unser Projekt kann an Schulen intern gestartet werden,
              sodass Nutzer*innen der Plattform nur Nachhilfe Partner*innen
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
            }}
          >
            <Typography variant="h5">
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
            <Button
              variant="contained"
              component={Link}
              href="/"
              passHref
              sx={{ mt: 3 }}
            >
              Zurück zur Startseite
            </Button>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
