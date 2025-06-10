import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight } from '../Icons';
import { strapiApi } from '../../services/api';
import type { Event } from '../../types';

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await strapiApi.getEvents();
        setEvents(data.slice(0, 4)); // Show only first 4
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  // Mock data if no events from API
  const mockEvents: Event[] = [
    {
      id: 1,
      title: 'Good Friday Service',
      description: 'Join us for our solemn Good Friday service as we commemorate the crucifixion of Jesus Christ.',
      date: '2024-03-29',
      time: '3:00 PM',
      location: 'Main Church',
      registrationRequired: false,
      currentAttendees: 0,
      slug: 'good-friday-service'
    },
    {
      id: 2,
      title: 'Easter Vigil',
      description: 'Celebrate the resurrection with our special Easter Vigil service.',
      date: '2024-03-30',
      time: '8:00 PM',
      location: 'Main Church',
      registrationRequired: false,
      currentAttendees: 0,
      slug: 'easter-vigil'
    },
    {
      id: 3,
      title: 'Parish Picnic',
      description: 'Join us for our annual parish picnic with food, games, and fellowship.',
      date: '2024-04-15',
      time: '12:00 PM',
      location: 'Parish Grounds',
      registrationRequired: true,
      maxAttendees: 200,
      currentAttendees: 45,
      slug: 'parish-picnic'
    },
    {
      id: 4,
      title: 'First Communion Classes',
      description: 'Preparation classes for children receiving their First Holy Communion.',
      date: '2024-04-20',
      time: '10:00 AM',
      location: 'Parish Hall',
      registrationRequired: true,
      maxAttendees: 30,
      currentAttendees: 18,
      slug: 'first-communion-classes'
    }
  ];

  const displayEvents = events.length > 0 ? events : mockEvents;

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 animate-pulse">
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
    <section className="py-16 bg-white">
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
              Upcoming Events
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us for worship, fellowship, and community events throughout the month.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {displayEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-50 rounded-lg p-6 transition-transform duration-200 hover:scale-105 hover:shadow-lg"
            >
              <div className="mb-4">
                <div className="flex items-center text-blue-600 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">
                    {formatDate(event.date)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                {event.registrationRequired && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    {event.maxAttendees 
                      ? `${event.currentAttendees}/${event.maxAttendees} registered`
                      : `${event.currentAttendees} registered`
                    }
                  </div>
                )}
              </div>

              <Link
                to={`/events/${event.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                {event.registrationRequired ? 'Register Now' : 'Learn More'}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/events"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            View All Events
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;