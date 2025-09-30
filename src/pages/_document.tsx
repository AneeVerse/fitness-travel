import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to image domains */}
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
        
        {/* Add resource hints for critical resources */}
        <link rel="preload" href="/video/BG2.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/images/left-logo.svg" as="image" type="image/svg+xml" />
        
        {/* Add meta tags for better caching */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}