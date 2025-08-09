import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { strapiApi } from '../../services/api';
import type { ParishInfo } from '../../types';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [parishInfo, setParishInfo] = useState<ParishInfo | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchParishInfo = async () => {
      const info = await strapiApi.getParishInfo();
      setParishInfo(info);
    };
    fetchParishInfo();
  }, []);

  useEffect(() => {
    if (parishInfo) {
      const parishName = parishInfo.parishName || 'St. Rita\'s Parish';
      const parishSubtitle = parishInfo.parishSubtitle || 'Catholic Church';
      const pageTitle = title ? `${title} - ${parishName}` : `${parishName} - ${parishSubtitle}`;
      document.title = pageTitle;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `${parishName} - A welcoming Catholic community dedicated to faith, fellowship, and service.`
        );
      }
    }
  }, [parishInfo, title]);

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

  // Breadcrumbs for top-level static routes
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
        <meta name="theme-color" content="#0b5cff" />
        <meta property="og:site_name" content={parishInfo?.parishName || "St. Rita's Church"} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://saintritamaina.org'} />
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