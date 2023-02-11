import "../styles/globals.scss";
import localFont from "@next/font/local";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo";
import Head from 'next/head'
import NProgress from 'nprogress'; 
import Router from 'next/router';
import 'nprogress/nprogress.css';

const gtWalsheim = localFont({
  src: [
    {
      path: "../public/fonts/GTWalsheimPro-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/GTWalsheimPro-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GTWalsheimPro-RegularOblique.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/GTWalsheimPro-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/GTWalsheimPro-BoldOblique.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/GTWalsheimPro-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
});


//Route Events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());


function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Head>
               <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs    /nprogress/0.2.0/nprogress.min.css"
          />
             </Head>
    <main className={gtWalsheim.className}>
      <Component {...pageProps} />
    </main>
    </ApolloProvider>
  );
}

export default MyApp;
