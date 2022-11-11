import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import styles from './layout.module.css';
import ResponsiveAppBar from './resp-app-bar';
import OfferCard from './cards/offer-card';
import ClippedDrawer from './resp-side-bar';

const appName = 'Studylink';
export const siteTitle = 'Studylink';

type Props = {
  children: React.ReactNode;
  home: boolean;
};

export default function Layout({ children, home }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="{name}Website" />
      </Head>

      <header>
        <ClippedDrawer />
      </header>

      <main className={styles.main}>{children}</main>

      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to homepage</Link>
        </div>
      )}
    </div>
  );
}
