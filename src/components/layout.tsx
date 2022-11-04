import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import NavBar from './navbar-depr';
import ResponsiveAppBar from './resp-app-bar';

const name = 'Studylink';
export const siteTitle = 'Studylink';

type Props = {
    children: React.ReactNode
    home: boolean
}

export default function Layout({ children, home }: Props) {
  return (
    <div className={styles.container}>

      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="{name}Website"
        />
      </Head>
      

      <header>

        <ResponsiveAppBar/>

      </header>


      <main>{children}</main>

      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to homepage</a>
          </Link>
        </div>
      )}
    </div>
  );
}