import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Clock, ArrowRight } from 'lucide-react';
import { strapiApi } from '../../services/api';
import type { Announcement } from '../../types';

const FeaturedAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await strapiApi.getAnnouncements();
        setAnnouncements(data.slice(0, 3)); // Show only first 3
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Parish Announcements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="h-3 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Mock data if no announcements from API
  const mockAnnouncements: Announcement[] = [
    {
      id: 1,
      title: 'Easter Sunday Services',
      content: 'Join us for our special Easter Sunday celebration with services at 8:00 AM, 10:30 AM, and 6:00 PM.',
      publishedAt: '2024-03-20',
      urgent: true,
      slug: 'easter-sunday-services'
    },
    {
      id: 2,
      title: 'Food Drive Collection',
      content: 'Help us support local families in need. Drop off non-perishable items in the church lobby.',
      publishedAt: '2024-03-18',
      urgent: false,
      slug: 'food-drive-collection'
    },
    {
      id: 3,
      title: 'Youth Group Meeting',
      content: 'All high school students are invited to join our youth group meeting this Friday at 7:00 PM.',
      publishedAt: '2024-03-15',
      urgent: false,
      slug: 'youth-group-meeting'
    }
  ];

  const displayAnnouncements = announcements.length > 0 ? announcements : mockAnnouncements;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Parish Announcements
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news and important information from our parish community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {displayAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className={`bg-white rounded-lg shadow-lg p-6 transition-transform duration-200 hover:scale-105 ${
                announcement.urgent ? 'border-l-4 border-red-500' : 'border-l-4 border-blue-500'
              }`}
            >
              <div className="flex items-center mb-4">
                <Bell className={`h-5 w-5 mr-2 ${announcement.urgent ? 'text-red-500' : 'text-blue-500'}`} />
                <span className={`text-xs font-semibold uppercase tracking-wide ${
                  announcement.urgent ? 'text-red-500' : 'text-blue-500'
                }`}>
                  {announcement.urgent ? 'Urgent' : 'Announcement'}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {announcement.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {announcement.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatDate(announcement.publishedAt)}
                </div>
                <Link
                  to={`/announcements/${announcement.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/announcements"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            View All Announcements
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAnnouncements;