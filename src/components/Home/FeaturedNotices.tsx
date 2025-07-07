import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Clock, ArrowRight, AlertTriangle, Image as ImageIcon, Eye } from 'lucide-react';
import { strapiApi } from '../../services/api';
import { getItemImageUrl } from '../../utils/imageUtils';
import type { NoticeBoardItem } from '../../types';

const FeaturedNotices: React.FC = () => {
  const [notices, setNotices] = useState<NoticeBoardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await strapiApi.getNoticeBoardItems(1, 3);
        setNotices(response.data); // Show only first 3
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Mock data if no notices from API
  const mockNotices: NoticeBoardItem[] = [
    {
      id: 1,
      type: 'text',
      title: 'Easter Sunday Services',
      content: 'Join us for our special Easter Sunday celebration with services at 8:00 AM, 10:30 AM, and 6:00 PM. Special music and decorations will enhance our worship.',
      publishedAt: '2024-03-20',
      urgent: true,
      slug: 'easter-sunday-services'
    },
    {
      id: 2,
      type: 'poster',
      title: 'Lenten Prayer Schedule',
      content: 'Special prayer times and devotions during the holy season of Lent',
      imageUrl: 'https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: '2024-03-18',
      urgent: false,
      slug: 'lenten-prayer-schedule'
    },
    {
      id: 3,
      type: 'image',
      title: 'Parish Picnic Photos',
      content: 'Beautiful moments captured from our recent parish community picnic',
      imageUrl: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: '2024-03-15',
      urgent: false,
      slug: 'parish-picnic-photos'
    }
  ];

  const displayNotices = notices.length > 0 ? notices : mockNotices;

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Parish Notices</h2>
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-100 p-1 mr-3">
              <img 
                src="/rita.png"
                alt="St. Rita's Parish Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Latest Parish Notices
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest announcements, photos, and important updates from our parish community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {displayNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-xl"
            >
              {notice.type === 'text' ? (
                // Announcement Card
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-full mr-3 ${
                      notice.urgent ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {notice.urgent ? (
                        <AlertTriangle className={`h-5 w-5 ${notice.urgent ? 'text-red-600' : 'text-blue-600'}`} />
                      ) : (
                        <Bell className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <span className={`text-xs font-semibold uppercase tracking-wide ${
                        notice.urgent ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {notice.urgent ? 'Urgent Notice' : 'Announcement'}
                      </span>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(notice.publishedAt)}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {notice.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {notice.content}
                  </p>
                  
                  <Link
                    to={`/notice-board`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              ) : (
                // Image/Poster Card
                <div>
                  <div className="relative h-48 bg-gray-200 overflow-hidden group">
                    {getItemImageUrl(notice, 'medium') ? (
                      <img
                        src={getItemImageUrl(notice, 'medium')}
                        alt={notice.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-blue-400" />
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Eye className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        notice.type === 'poster' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {notice.type === 'poster' ? 'Poster' : 'Photo'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {notice.title}
                    </h3>
                    
                    {notice.content && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {notice.content}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(notice.publishedAt)}
                      </div>
                      
                      <Link
                        to="/notice-board"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                      >
                        View
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/notice-board"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            View All Notices
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNotices;