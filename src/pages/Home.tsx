import React from 'react';
import Hero from '../components/Home/Hero';
import FeaturedNotices from '../components/Home/FeaturedNotices';
import FeaturedBlogs from '../components/Home/FeaturedBlogs';
// import UpcomingEvents from '../components/Home/UpcomingEvents';
import OurClergy from '../components/Home/OurClergy';
import QuickActions from '../components/Home/QuickActions';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <div>
      <SEO
        // Provide only the page-specific part; component will append site name
        title="Home"
        description="Official site of St. Rita's Church, Maina (Curtorim, South Goa). Mass timings, sacraments, parish office info, events, notices, and ministries. All are welcome."
        keywords={[
          'saint rita parish',
          'maina parish',
          'maina church',
          'south goa churches',
          'curtorim church',
          'curtorim parish',
          'st rita church maina',
          'mass times curtorim',
          'catholic church south goa'
        ]}
        canonical="https://saintritamaina.org/"
        image="https://saintritamaina.org/rita.png"
      />
      <Hero />
      <FeaturedNotices />
      <FeaturedBlogs />
      {/* <UpcomingEvents /> */}
      <OurClergy />
      <QuickActions />
    </div>
  );
};

export default Home;