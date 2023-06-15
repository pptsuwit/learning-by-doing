import "../styles/globals.css";
import Layout from "@/components/Layout";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});
// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <ThemeProvider theme={theme}>
//       {/* <Layout> */}
//       <Component {...pageProps} />
//       {/* </Layout> */}
//     </ThemeProvider>
//   );
// }
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  if (Component.getLayout) {
    return <ThemeProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ThemeProvider>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }
}
