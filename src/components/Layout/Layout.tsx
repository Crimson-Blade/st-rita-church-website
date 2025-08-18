import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { strapiApi } from '../../services/api';
import type { ParishInfo } from '../../types';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  /**
   * @deprecated Per-page titles & descriptions should be set via the <SEO /> component, not Layout.
   */
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [parishInfo, setParishInfo] = useState<ParishInfo | null>(null);
  const location = useLocation();

  // Fetch parish info once (used for structured data / header / footer)
  useEffect(() => {
    const fetchParishInfo = async () => {
      try {
        const info = await strapiApi.getParishInfo();
        setParishInfo(info);
      } catch (e) {
        // Silently fail – SEO component provides fallbacks
        console.warn('Failed to load parish info', e);
      }
    };
    fetchParishInfo();
  }, []);

  // Church schema (site-wide)
  const churchJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: parishInfo?.parishName || "St. Rita's Church",
    alternateName: 'St. Rita Parish Maina',
    url: 'https://saintritamaina.org',
    image: 'https://saintritamaina.org/rita.png',
    telephone: parishInfo?.officePhone || '08326638644',
    email: parishInfo?.officeEmail || 'st.rita.maina1960@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: "St Rita's Church Maina",
      addressLocality: 'Curtorim',
      addressRegion: 'Goa',
      postalCode: '403709',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 15.290889,
      longitude: 74.007056
    },
    hasMap: 'https://www.google.com/maps?q=15.290889,74.007056',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '12:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '12:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '00:00',
        closes: '00:00'
      }
    ],
    sameAs: [
      'https://www.instagram.com/maina_parish_youth/'
    ],
  };

  // Simple breadcrumb only for top-level static routes (page-specific SEO still handled in pages via <SEO />)
  const path = location.pathname;
  const segment = path.split('/').filter(Boolean);
  const labelMap: Record<string, string> = {
    about: 'About',
    contact: 'Contact',
    'mass-timings': 'Mass Timings',
    'notice-board': 'Notice Board',
    blog: 'Blog',
    events: 'Events',
    donate: 'Donate',
  };
  const isTopLevel = segment.length === 1 && labelMap[segment[0]];
  const breadcrumbsJsonLd = isTopLevel ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://saintritamaina.org/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: labelMap[segment[0]],
        item: `https://saintritamaina.org/${segment[0]}`
      }
    ]
  } : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        {/* Global-only tags (page-level SEO handled by <SEO /> component). */}
        <meta name="theme-color" content="#0b5cff" />
        {/* Structured data */}
        <script type="application/ld+json">{JSON.stringify(churchJsonLd)}</script>
        {breadcrumbsJsonLd && (
          <script type="application/ld+json">{JSON.stringify(breadcrumbsJsonLd)}</script>
        )}
      </Helmet>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;