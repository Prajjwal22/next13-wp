import { Suspense } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { ApolloWrapper } from "../../lib/apollo";

import localFont from "@next/font/local";
import Loading from "./loading";

const gtWalsheim = localFont({
  src: [
    {
      path: "../../public/fonts/GTWalsheimPro-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/GTWalsheimPro-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GTWalsheimPro-RegularOblique.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/GTWalsheimPro-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/GTWalsheimPro-BoldOblique.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/GTWalsheimPro-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function SingleLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <Header/>
          <Suspense fallback={<Loading/>}>
          <main className={gtWalsheim.className}>
            {children}
          </main>
          </Suspense>
          <Footer/>
        </ApolloWrapper>
      </body>
    </html>
  );
}
