import type { AppProps } from 'next/app';
import '../styles/global.css'
import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";

const clientSideEmotionCache = createEmotionCache();

type Props = {
  Component: React.FC
  pageProps: any
  emotionCache: any
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
 }: Props) {
  return (
    <CacheProvider value={emotionCache}>
     <ThemeProvider theme={theme}>
       <Component {...pageProps} />
     </ThemeProvider>
   </CacheProvider>
  );
}

export default MyApp;
