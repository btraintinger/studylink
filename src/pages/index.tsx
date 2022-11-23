import Head from 'next/head';
import Layout from '../components/layout';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title> Studylink </title>
      </Head>
      <Typography>
        Von Schülern, für Schüler, um Schülern zu helfen, Schülern zu helfen.
        Das Ziel des Projekts ist die Entwicklung einer schulinternen
        Nachhilfeplattform. Die Zeit der Covid-Pandemie hat gezeigt, dass
        Schülerinnen und Schüler, die keine ausreichende Unterstützung erhalten,
        drohen, immer weiter zurückzufallen. Diesem Problem mithilfe der
        Solidarität unter der Schülerschaft entgegenzutreten, ist das Ziel von
        Studylink. Über unsere Website wird es möglich, eine „Schüler helfen
        Schüler“ Initiative an einer Schule umzusetzen. Den schwächeren Schülern
        sollte durch die gegenseitige Unterstützung zwischen den Schülerinnen
        und Schülern geholfen werden. Über eine Webapp kann durch eine Datenbank
        der beste Nachhilfepartner gefunden werden.
      </Typography>
    </Layout>
  );
}
