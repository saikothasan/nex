import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
}

export default function SEO({ title, description, canonical, ogImage }: SEOProps) {
  const siteName = 'AI Prompt Generator'
  const fullTitle = `${title} | ${siteName}`
  const defaultOgImage = '/og-image.png' // Make sure to add this image to your public folder

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImage || defaultOgImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />
    </Head>
  )
}

