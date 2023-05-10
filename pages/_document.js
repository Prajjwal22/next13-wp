import { Html, Head, Main, NextScript } from 'next/document'
import { Partytown } from '@builder.io/partytown/react';
import Script from 'next/script';


export default function Document() {
  return (
    <Html lang='en'>
      <Head>
      <Partytown debug={true} forward={['dataLayer.push']} />
      <Script type='text/partytown'
   strategy="worker"
   src="https://www.googletagmanager.com/gtag/js?id=G-LFFTL0Y202"
/> 
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}