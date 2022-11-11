import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import OfferCard from '../components/cards/offer-card';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>Studylink ist eine Nachhilfeplatform</p>
        <div>
          <OfferCard />
        </div>
        <p>
          <Link href="/blog/first-post">See this post</Link>
        </p>
      </section>
    </Layout>
  );
}
