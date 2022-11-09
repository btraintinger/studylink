import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import OfferCard from '../components/cards/offer-card';

export default function Home() {
  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>


      <section className={utilStyles.headingMd}>
        <p>Studylink ist eine Nachhilfeplatform</p>
        <div>
          <OfferCard />
        </div>
        <p>
          <Link href="/blog/first-post">
            <a> See this post</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
}