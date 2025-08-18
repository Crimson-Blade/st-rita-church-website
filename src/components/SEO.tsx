import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'event';
  noindex?: boolean;
  keywords?: string[];
  twitterCard?: 'summary' | 'summary_large_image';
  jsonLd?: object | object[];
  author?: string;
  publishedTime?: string; // ISO
  modifiedTime?: string; // ISO
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = "St. Rita's Church, Maina – Catholic Church in Curtorim, South Goa. Mass timings, sacraments, events, and parish life.",
  canonical,
  image = '/rita.png',
  type = 'website',
  noindex = false,
  keywords,
  twitterCard = 'summary_large_image',
  jsonLd,
  author,
  publishedTime,
  modifiedTime,
}) => {
  const siteName = "St. Rita's Church"; // moved inside to satisfy fast refresh rule
  const siteUrl = 'https://saintritamaina.org';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} – Catholic Church in Curtorim, South Goa`;
  const url = canonical || (typeof window !== 'undefined' ? window.location.href : siteUrl);
  const metaKeywords = keywords?.join(', ');

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {author && <meta name="author" content={author} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      {author && type === 'article' && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {(modifiedTime || publishedTime) && <meta property="article:modified_time" content={modifiedTime || publishedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {jsonLd && (
        Array.isArray(jsonLd)
          ? jsonLd.map((obj, i) => (
              <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>
            ))
          : <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
