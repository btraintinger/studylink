import Head from 'next/head';

export default function StudylinkHead() {
  return (
    <Head>
      <title>Studylink</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta
        name="description"
        content="Studylink - Die Nachhilfeplattform für Schüler"
      />
      <meta
        name="keywords"
        content="Studylink student school Schule Nachhilfe Tutoring"
      />
      <meta name="author" content="Studylink" />
      <meta name="theme-color" content="#000000" />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:site_name" content="Studylink" />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="Studylink - Die Nachhilfeplattform für Schüler"
      />
    </Head>
  );
}
