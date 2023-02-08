import "../styles/globals.scss";
// import localFont from "@next/font/local";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo";

// const gtWalsheim = localFont({
//   src: [
//     {
//       path: "../public/fonts/GTWalsheimPro-Light.woff",
//       weight: "300",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/GTWalsheimPro-Regular.woff",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/GTWalsheimPro-RegularOblique.woff",
//       weight: "400",
//       style: "italic",
//     },
//     {
//       path: "../public/fonts/GTWalsheimPro-Bold.woff",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/GTWalsheimPro-BoldOblique.woff",
//       weight: "700",
//       style: "italic",
//     },
//     {
//       path: "../public/fonts/GTWalsheimPro-Black.woff",
//       weight: "900",
//       style: "normal",
//     },
//   ],
// });

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
    {/* <main className={gtWalsheim.className}> */}
      <Component {...pageProps} />
    {/* </main> */}
    </ApolloProvider>
  );
}

export default MyApp;
