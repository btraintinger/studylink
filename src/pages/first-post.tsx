import Head from 'next/head';
import Layout from '../components/layout';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

export default function FirstPost() {
  return (
    <Box>
      <Layout home={false}>
        <Head>
          <title>First Post</title>
        </Head>
        <Typography variant="h3"> What is studylink?</Typography>
        <Typography>
          Viele Schüler benötigen Nachhilfe in bestimmten Fächern, oder können
          für andere Nachhilfe anbieten. Schüler lernen oft besser von anderen
          Schülern, da Nachhilfe-gebende sich gut in Nachhilfe-beziehende
          hineinversetzen können, doch aktuell gibt es keine bekannte
          Standardmöglichkeit an Schulen, Kontakt zwischen Nachhilfe-beziehenden
          und Nachhilfe-gebenden Schülern herzustellen.
        </Typography>
        <Link style={{ color: '#fefefe' }} href="/">
          Studyl
        </Link>
      </Layout>
    </Box>
  );
}
