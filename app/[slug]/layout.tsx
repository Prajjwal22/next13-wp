import Script from "next/script";
import React from "react";

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {" "}
      <Script
        strategy="worker"
        src="https://www.googletagmanager.com/gtag/js?id=G-LFFTL0Y202"
      />
      <Script
        id="adsbygoogle-init"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5253670042601731"
      />
      {children}
    </>
  );
}
