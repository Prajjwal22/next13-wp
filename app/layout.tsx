import type { Metadata, ResolvingMetadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { GoogleAnalytics } from '@next/third-parties/google'
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { getHomePageData, getMenu } from "@/lib/wordpress";

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
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenu("dGVybToyNzA=");

  return (
    <html lang="en">
      <body className={gtWalsheim.className}>
        <Header menu={menu} />
        {children}
        <Footer />
        <GoogleAnalytics gaId="G-LFFTL0Y202" />

      </body>
    </html>
  );
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  
  // fetch data
  const homeData = await getHomePageData()
  // optionally access and extend (rather than replace) parent metadata

  return {
    title: homeData.seo.meta.homepage.title,
    description:  homeData.seo.meta.homepage.description,

    openGraph: {
      images: homeData.seo.openGraph.frontPage.image.sourceUrl,
    },
    alternates: {
      canonical: `https://howtoshout.com/`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
