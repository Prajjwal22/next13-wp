import "../styles/globals.scss";
import localFont from "@next/font/local";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";
import Head from "next/head";
import Script from "next/script";

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
  display: 'swap' 
});

//Route Events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Head>
      <Script
   strategy="worker"
   src={`https://www.googletagmanager.com/gtag/js?id=G-LFFTL0Y202`}
/> <script
    type="text/partytown" dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)}
        gtag('js', new Date());
      
        gtag('config', 'G-LFFTL0Y202');
        `,
    }}/>
      </Head>
      <main className={gtWalsheim.className}>
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}

export default MyApp;
