import Head from 'next/head';
import Layout from '../components/layout';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title> Studylink </title>
      </Head>
      <Typography variant="h2">Index.tsx</Typography>
    </Layout>
  );
}
