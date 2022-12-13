import Head from 'next/head';
import Layout from '../components/page/layout';

export default function FirstPost() {
  return (
    <div>
      <Layout>
        <Head>
          <title>First Post</title>
        </Head>
        <h1>First Post</h1>
        <p>
          Viele Schüler benötigen Nachhilfe in bestimmten Fächern, oder können
          für andere Nachhilfe anbieten. Schüler lernen oft besser von anderen
          Schülern, da Nachhilfe-gebende sich gut in Nachhilfe-beziehende
          hineinversetzen können, doch aktuell gibt es keine bekannte
          Standardmöglichkeit an Schulen, Kontakt zwischen Nachhilfe-beziehenden
          und Nachhilfe-gebenden Schülern herzustellen.
        </p>
      </Layout>
    </div>
  );
}
