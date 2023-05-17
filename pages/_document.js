import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script';


export default function Document() {
  return (
    <Html lang='en'>
      <Head>
      <Script strategy="afterInteractive" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5253670042601731"
     crossOrigin="anonymous"/>
      <script
    data-partytown-config
    dangerouslySetInnerHTML={{
      __html: `
          partytown = {
            lib: "/_next/static/~partytown/",
            forward: ["gtag"]           
          };
        `,
    }}
/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}