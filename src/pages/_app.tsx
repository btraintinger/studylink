import Head from 'next/head';
import type { AppProps } from 'next/app';
import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../utils/apolloClient';
import createEmotionCache from '../utils/createEmotionCache';
import { getDesignTokens } from '../utils/theme';
import React from 'react';
import ThemeModeContextProvider from '../context/mode-context';
import { DrawerContextProvider } from '../context/app-context';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  session: any;
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
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeModeContextProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline enableColorScheme />
        <ApolloProvider client={apolloClient}>
          <SessionProvider session={session}>
            <DrawerContextProvider>
              <Component {...pageProps} />
            </DrawerContextProvider>
          </SessionProvider>
        </ApolloProvider>
      </ThemeModeContextProvider>
    </CacheProvider>
  );
}
