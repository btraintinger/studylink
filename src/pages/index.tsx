import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
        <p>Studylink ist eine Nachhilfeplatform</p>
        <div>
          jodel
        </div>
        <p>
          <Link href="/blog/first-post">See this post</Link>
        </p>
      </section>
    </Layout>
  );
}
