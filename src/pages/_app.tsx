
import '../styles/global.css'
import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

const clientSideEmotionCache = createEmotionCache();

type Props = {
  Component: React.FC
  session: any
  pageProps: any
  emotionCache: any
}

function App({
  Component,
  emotionCache = clientSideEmotionCache,
  session,
  pageProps,
 }: Props) {
  return (
  <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
       <ThemeProvider theme={theme}>
         <Component {...pageProps} />
       </ThemeProvider>
     </CacheProvider>
   </SessionProvider>
  );
}

export default App;
