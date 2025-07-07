import React from 'react';
import Hero from '../components/Home/Hero';
import FeaturedNotices from '../components/Home/FeaturedNotices';
import FeaturedBlogs from '../components/Home/FeaturedBlogs';
import UpcomingEvents from '../components/Home/UpcomingEvents';
import OurClergy from '../components/Home/OurClergy';
import QuickActions from '../components/Home/QuickActions';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedNotices />
      <FeaturedBlogs />
      <UpcomingEvents />
      <OurClergy />
      <QuickActions />
    </div>
  );
};

export default Home;