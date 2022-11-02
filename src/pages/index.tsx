import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>


      <section className={utilStyles.headingMd}>
        <p>Studylink ist eine Nachhilfeplatform</p>
        <p>
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform


          Studylink ist eine NachhilfeplatformStudylink ist eine NachhilfeplatformStudylink ist eine Nachhilfeplatform

          Studylink ist eine NachhilfeplatformStudylink ist eine Nachhilfeplatform

          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
          Studylink ist eine Nachhilfeplatform
        </p>
        <p>
          <Link href= "/blog/first-post">
            <a> See this post</a>
          </Link>       
          </p>
      </section>
    </Layout>
  );
}