import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { strapiApi } from '../../services/api';
import type { ParishInfo } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [parishInfo, setParishInfo] = useState<ParishInfo | null>(null);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;