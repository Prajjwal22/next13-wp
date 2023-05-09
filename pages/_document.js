import { Html, Head, Main, NextScript } from 'next/document'
import { Partytown } from '@builder.io/partytown/react';
import Script from 'next/script';


export default function Document() {
  return (
    <Html>
      <Head>
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