import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import Homepage from "@/components/templates/Homepage";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { getMenu } from "@/lib/wordpress";

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

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenu("dGVybToxMw==");

  return (
    <html lang="en">
      <body className={gtWalsheim.className}>
        <Header menu={menu} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
