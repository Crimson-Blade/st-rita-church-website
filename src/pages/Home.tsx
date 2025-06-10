import React from 'react';
import Hero from '../components/Home/Hero';
import FeaturedAnnouncements from '../components/Home/FeaturedAnnouncements';
import FeaturedBlogs from '../components/Home/FeaturedBlogs';
import UpcomingEvents from '../components/Home/UpcomingEvents';
import QuickActions from '../components/Home/QuickActions';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedAnnouncements />
      <FeaturedBlogs />
      <UpcomingEvents />
      <QuickActions />
    </div>
  );
};

export default Home;