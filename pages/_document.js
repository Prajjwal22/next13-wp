import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script';


export default function Document() {
  return (
    <Html lang='en'>
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
