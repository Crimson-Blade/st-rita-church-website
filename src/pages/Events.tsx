import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight, Filter, Search } from '../components/Icons';
import { strapiApi } from '../services/api';
import type { Event } from '../types';

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'registration' | 'past'>('upcoming');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await strapiApi.getEvents();
        setEvents(data);
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
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const isUpcoming = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  };

  const isPast = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate < today;
  };

  // Mock data if no events from API
  const mockEvents: Event[] = [
    {
      id: 1,
      title: 'Good Friday Service',
      description: 'Join us for our solemn Good Friday service as we commemorate the crucifixion of Jesus Christ. This is a time for prayer, reflection, and remembrance of our Lord\'s sacrifice.',
      date: '2025-04-18',
      time: '3:00 PM',
      location: 'Main Church',
      registrationRequired: false,
      currentAttendees: 0,
      slug: 'good-friday-service'
    },
    {
      id: 2,
      title: 'Easter Vigil',
      description: 'Celebrate the resurrection with our special Easter Vigil service. This beautiful liturgy marks the beginning of Easter and includes the lighting of the Easter candle.',
      date: '2025-04-19',
      time: '8:00 PM',
      location: 'Main Church',
      registrationRequired: false,
      currentAttendees: 0,
      slug: 'easter-vigil'
    },
    {
      id: 3,
      title: 'Easter Sunday Mass',
      description: 'Join us for our joyful Easter Sunday celebration as we commemorate the resurrection of Jesus Christ.',
      date: '2025-04-20',
      time: '10:00 AM',
      location: 'Main Church',
      registrationRequired: false,
      currentAttendees: 0,
      slug: 'easter-sunday-mass'
    },
    {
      id: 4,
      title: 'Parish Picnic',
      description: 'Join us for our annual parish picnic with food, games, and fellowship. Bring your family and friends for a day of community fun!',
      date: '2025-07-15',
      time: '12:00 PM',
      location: 'Parish Grounds',
      registrationRequired: true,
      maxAttendees: 200,
      currentAttendees: 45,
      slug: 'parish-picnic'
    },
    {
      id: 5,
      title: 'First Communion Classes',
      description: 'Preparation classes for children receiving their First Holy Communion. Parents are encouraged to attend the first session.',
      date: '2025-08-20',
      time: '10:00 AM',
      location: 'Parish Hall',
      registrationRequired: true,
      maxAttendees: 30,
      currentAttendees: 18,
      slug: 'first-communion-classes'
    },
    {
      id: 6,
      title: 'Youth Group Meeting',
      description: 'Weekly meeting for our parish youth group. All teenagers are welcome to join us for fellowship and activities.',
      date: '2025-06-28',
      time: '7:00 PM',
      location: 'Youth Center',
      registrationRequired: false,
      currentAttendees: 0,
      slug: 'youth-group-meeting'
    },
    {
      id: 7,
      title: 'Bible Study Group',
      description: 'Join our weekly Bible study group as we explore Scripture together and grow in faith.',
      date: '2025-06-25',
      time: '7:30 PM',
      location: 'Parish Hall',
      registrationRequired: false,
      currentAttendees: 0,
      slug: 'bible-study-group'
    },
    {
      id: 8,
      title: 'Confirmation Retreat',
      description: 'A special retreat weekend for our confirmation candidates to prepare for the sacrament.',
      date: '2025-09-15',
      time: '9:00 AM',
      location: 'Retreat Center',
      registrationRequired: true,
      maxAttendees: 50,
      currentAttendees: 32,
      slug: 'confirmation-retreat'
    }
  ];

  const displayEvents = events.length > 0 ? events : mockEvents;

  // Filter events based on search term and filter type
  const filteredEvents = displayEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());

    switch (filterType) {
      case 'upcoming':
        return matchesSearch && isUpcoming(event.date);
      case 'registration':
        return matchesSearch && event.registrationRequired && isUpcoming(event.date);
      case 'past':
        return matchesSearch && isPast(event.date);
      default:
        return matchesSearch;
    }
  });

  // Sort events by date
  const sortedEvents = filteredEvents.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return filterType === 'past' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-r from-blue-900/80 to-blue-700/80 text-white py-16"
        style={{
          backgroundImage: 'url("/outside.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 p-2 mr-4">
                <img 
                  src="/rita.png"
                  alt="St. Rita's Parish Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">Parish Events</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay connected with our parish community through worship services, fellowship events, 
              educational programs, and special celebrations throughout the year.
            </p>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as typeof filterType)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Events</option>
                <option value="upcoming">Upcoming</option>
                <option value="registration">Registration Required</option>
                <option value="past">Past Events</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedEvents.length} {sortedEvents.length === 1 ? 'event' : 'events'}
          </p>
        </div>

        {/* Events Grid */}
        {sortedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-sm p-6 transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-blue-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">
                        {formatDate(event.date)}
                      </span>
                    </div>
                    {isPast(event.date) && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        Past Event
                      </span>
                    )}
                    {event.registrationRequired && isUpcoming(event.date) && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Registration Required
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                    {formatTime(event.time)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    {event.location}
                  </div>
                  {event.registrationRequired && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2 flex-shrink-0" />
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
                  {event.registrationRequired && isUpcoming(event.date) ? 'Register Now' : 'Learn More'}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Check back soon for upcoming events and activities.'
              }
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Events;
