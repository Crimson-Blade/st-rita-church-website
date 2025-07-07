import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Mail, Phone } from '../components/Icons';
import { strapiApi } from '../services/api';
import type { Event, RegistrationFormData } from '../types';

// Mock data for events
const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Good Friday Service',
    description: 'Join us for our solemn Good Friday service as we commemorate the crucifixion of Jesus Christ. This sacred liturgy includes the reading of the Passion, veneration of the Cross, and Holy Communion. It is a time for prayer, reflection, and remembrance of our Lord\'s ultimate sacrifice for humanity.',
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
    description: 'Celebrate the resurrection with our special Easter Vigil service. This beautiful liturgy marks the beginning of Easter and includes the lighting of the Easter candle, readings from Scripture, baptisms, and the first Mass of Easter. Join us for this most sacred night of the Christian year.',
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
    description: 'Join us for our joyful Easter Sunday celebration as we commemorate the resurrection of Jesus Christ. This festive Mass includes special music, flowers, and the renewal of baptismal promises. All are welcome to join us for this celebration of new life.',
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
    description: 'Join us for our annual parish picnic with food, games, and fellowship. Bring your family and friends for a day of community fun! We\'ll have activities for all ages, including games for children, live music, and delicious food. This is a wonderful opportunity to connect with fellow parishioners and enjoy the beautiful weather together.',
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
    description: 'Preparation classes for children receiving their First Holy Communion. Parents are encouraged to attend the first session. These classes will help children understand the significance of the Eucharist and prepare them to receive Jesus for the first time. Classes include prayer, instruction, and activities appropriate for young children.',
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
    description: 'Weekly meeting for our parish youth group. All teenagers are welcome to join us for fellowship and activities. We\'ll have discussions about faith, service projects, games, and snacks. This is a great place for young people to make friends and grow in their relationship with God.',
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
    description: 'Join our weekly Bible study group as we explore Scripture together and grow in faith. This week we\'ll be studying the Gospel of Matthew. All levels of biblical knowledge are welcome. We provide study materials and refreshments.',
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
    description: 'A special retreat weekend for our confirmation candidates to prepare for the sacrament. The retreat includes prayer, reflection, group activities, and talks by guest speakers. Meals and accommodations are provided. This is a required event for all confirmation candidates.',
    date: '2025-09-15',
    time: '9:00 AM',
    location: 'Retreat Center',
    registrationRequired: true,
    maxAttendees: 50,
    currentAttendees: 32,
    slug: 'confirmation-retreat'
  }
];

const EventDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    phone: '',
    additionalInfo: '',
    attendeeCount: 1
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const events = await strapiApi.getEvents();
        const foundEvent = events.find((e) => e.slug === slug);
        
        if (!foundEvent) {
          // Try mock data
          const mockEvent = mockEvents.find((e) => e.slug === slug);
          setEvent(mockEvent || null);
        } else {
          setEvent(foundEvent);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        // Fallback to mock data
        const mockEvent = mockEvents.find((e) => e.slug === slug);
        setEvent(mockEvent || null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchEvent();
    }
  }, [slug]);

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

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    // Validate form data
    if (!registrationData.name.trim()) {
      alert('Please enter your full name.');
      return;
    }
    if (!registrationData.email.trim()) {
      alert('Please enter your email address.');
      return;
    }
    if (!registrationData.phone.trim()) {
      alert('Please enter your phone number.');
      return;
    }

    // Check capacity before submitting
    if (event.maxAttendees && 
        event.currentAttendees + registrationData.attendeeCount > event.maxAttendees) {
      alert(`Sorry, only ${event.maxAttendees - event.currentAttendees} spots remaining. Please reduce the number of attendees.`);
      return;
    }

    setRegistering(true);
    try {
      console.log('Submitting registration:', {
        eventId: event.id,
        eventTitle: event.title,
        registrationData
      });

      const registration = await strapiApi.registerForEvent(event.id, registrationData);
      
      if (registration) {
        // Show success message with more details
        const message = `🎉 Registration Successful!\n\n` +
          `Event: ${event.title}\n` +
          `Confirmation ID: ${registration.id}\n` +
          `Attendees: ${registrationData.attendeeCount}\n` +
          `Contact: ${registrationData.email}\n\n` +
          `You will receive a confirmation email shortly with event details.`;
        
        alert(message);
        
        // Reset form
        setRegistrationData({
          name: '',
          email: '',
          phone: '',
          additionalInfo: '',
          attendeeCount: 1
        });

        // Update local event state with new attendee count
        setEvent(prev => prev ? {
          ...prev,
          currentAttendees: prev.currentAttendees + registrationData.attendeeCount
        } : null);
        
        console.log('Registration completed successfully:', registration);
      } else {
        alert('Registration failed. Please try again or contact us directly.');
      }
    } catch (error: unknown) {
      console.error('Registration error:', error);
      let errorMessage = 'Registration failed. Please try again or contact us directly.';
      
      if (error instanceof Error) {
        if (error.message.includes('Event not found')) {
          errorMessage = 'This event is no longer available for registration.';
        } else if (error.message.includes('fully booked')) {
          errorMessage = 'Sorry, this event is now fully booked.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      alert(`❌ Registration Failed\n\n${errorMessage}\n\nIf the problem persists, please contact us at events@stritaparish.org or call (555) 123-4567.`);
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="h-8 bg-gray-300 rounded w-2/3 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-20 bg-gray-300 rounded"></div>
                <div className="h-20 bg-gray-300 rounded"></div>
                <div className="h-20 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div>
        {/* Hero Section */}
        <section 
          className="relative bg-gradient-to-r from-blue-900/80 to-blue-700/80 text-white py-12"
          style={{
            backgroundImage: 'url("/outside.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center justify-between">
              <Link
                to="/events"
                className="inline-flex items-center text-white hover:text-blue-200 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Events
              </Link>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 p-2 mr-3">
                  <img 
                    src="/rita.png"
                    alt="St. Rita's Parish Logo" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold">Event Not Found</h1>
              </div>
            </div>
          </div>
        </section>

        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h1>
              <p className="text-gray-600 mb-6">
                The event you're looking for doesn't exist or may have been removed.
              </p>
              <Link
                to="/events"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                View All Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isPastEvent = !isUpcoming(event.date);
  const canRegister = event.registrationRequired && isUpcoming(event.date);
  const isFullyBooked = event.maxAttendees && event.currentAttendees >= event.maxAttendees;

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-r from-blue-900/80 to-blue-700/80 text-white py-12"
        style={{
          backgroundImage: 'url("/outside.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <Link
              to="/events"
              className="inline-flex items-center text-white hover:text-blue-200 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Events
            </Link>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 p-2 mr-3">
                <img 
                  src="/rita.png"
                  alt="St. Rita's Parish Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold">{event.title}</h1>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
              {/* Event Status Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  {isPastEvent && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      Past Event
                    </span>
                  )}
                  {event.registrationRequired && isUpcoming(event.date) && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Registration Required
                    </span>
                  )}
                  {isFullyBooked && (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      Fully Booked
                    </span>
                  )}
                </div>
              </div>

              {/* Event Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {event.title}
              </h1>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center text-blue-600 mb-2">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="font-medium">Date</span>
                  </div>
                  <p className="text-gray-900">{formatDate(event.date)}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center text-blue-600 mb-2">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="font-medium">Time</span>
                  </div>
                  <p className="text-gray-900">{formatTime(event.time)}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center text-blue-600 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="font-medium">Location</span>
                  </div>
                  <p className="text-gray-900">{event.location}</p>
                </div>
              </div>

              {/* Event Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {event.description}
                </p>
              </div>

              {/* Additional Information */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
                <div className="space-y-3">
                  {event.registrationRequired && (
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-3 text-blue-600" />
                      <span>Registration is required for this event</span>
                    </div>
                  )}
                  {event.maxAttendees && (
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-3 text-blue-600" />
                      <span>Limited to {event.maxAttendees} attendees</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-3 text-blue-600" />
                    <span>For questions, contact us at events@stritaparish.org</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-3 text-blue-600" />
                    <span>Or call (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Registration Card */}
            {canRegister && !isFullyBooked && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Register for Event</h3>
                
                {event.maxAttendees && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Spots Available</span>
                      <span>{event.maxAttendees - event.currentAttendees} of {event.maxAttendees}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleRegistration} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={registrationData.name}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={registrationData.email}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={registrationData.phone}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="attendeeCount" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Attendees
                    </label>
                    <select
                      id="attendeeCount"
                      value={registrationData.attendeeCount}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, attendeeCount: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => {
                        // Check if this selection would exceed capacity
                        const wouldExceedCapacity = Boolean(event.maxAttendees && 
                          event.currentAttendees + num > event.maxAttendees);
                        
                        return (
                          <option key={num} value={num} disabled={wouldExceedCapacity}>
                            {num} {num === 1 ? 'person' : 'people'}
                            {wouldExceedCapacity ? ' (would exceed capacity)' : ''}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      rows={3}
                      value={registrationData.additionalInfo}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                      placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Show capacity warning if getting close to full */}
                  {event.maxAttendees && 
                   event.currentAttendees + registrationData.attendeeCount > (event.maxAttendees - 5) && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">
                        ⚠️ Only {event.maxAttendees - event.currentAttendees} spots remaining!
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={registering || Boolean(event.maxAttendees && 
                      event.currentAttendees + registrationData.attendeeCount > event.maxAttendees)}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 disabled:cursor-not-allowed"
                  >
                    {registering ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Registration...
                      </span>
                    ) : (
                      `Register ${registrationData.attendeeCount > 1 ? `${registrationData.attendeeCount} People` : 'Now'}`
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Event Info Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-3 text-blue-600" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-3 text-blue-600" />
                  {formatTime(event.time)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-3 text-blue-600" />
                  {event.location}
                </div>
                {event.registrationRequired && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-3 text-blue-600" />
                    {event.maxAttendees 
                      ? `${event.currentAttendees}/${event.maxAttendees} registered`
                      : `${event.currentAttendees} registered`
                    }
                  </div>
                )}
              </div>

              {isPastEvent && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    This event has already taken place. Check out our other upcoming events!
                  </p>
                  <Link
                    to="/events"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-2 text-sm font-medium"
                  >
                    View Upcoming Events
                    <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                  </Link>
                </div>
              )}

              {isFullyBooked && isUpcoming(event.date) && (
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-700 font-medium mb-2">
                    Event is Fully Booked
                  </p>
                  <p className="text-sm text-red-600">
                    This event has reached capacity. Contact us to be added to the waiting list.
                  </p>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
