import { ApolloProvider } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DrawerContextProvider } from '../context/app-context';
import ThemeModeContextProvider from '../context/mode-context';
import { useApollo } from '../utils/apolloClient';
import createEmotionCache from '../utils/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  session: Session;
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    session,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props;
  const apolloClient = useApollo(pageProps);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Studylink</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no viewport-fit=cover"
        />
      </Head>

      <ThemeModeContextProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline enableColorScheme />
          <ApolloProvider client={apolloClient}>
            <SessionProvider session={session}>
              <DrawerContextProvider>
                <Component {...pageProps} />
              </DrawerContextProvider>
            </SessionProvider>
          </ApolloProvider>
        </LocalizationProvider>
      </ThemeModeContextProvider>
    </CacheProvider>
  );
}
