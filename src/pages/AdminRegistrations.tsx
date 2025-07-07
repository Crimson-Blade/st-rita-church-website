import React, { useState, useEffect } from 'react';
import { Calendar, Download } from '../components/Icons';
import RegistrationManager from '../components/RegistrationManager';
import { strapiApi } from '../services/api';
import { registrationService } from '../services/registrationService';
import type { Event } from '../types';

const AdminRegistrations: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [useStrapi, setUseStrapi] = useState(true);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'overview' | 'detailed'>('overview');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const eventsData = await strapiApi.getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventStats = (event: Event) => {
    let registrationCount = 0;
    let attendeeCount = 0;

    if (useStrapi) {
      // For Strapi, use the currentAttendees field
      attendeeCount = event.currentAttendees;
      registrationCount = event.currentAttendees; // Simplified - could be fetched separately
    } else {
      // For local storage, calculate from registrationService
      const localRegs = registrationService.getEventRegistrations(event.id);
      registrationCount = localRegs.length;
      attendeeCount = localRegs.reduce((total, reg) => total + reg.attendeeCount, 0);
    }

    return { registrationCount, attendeeCount };
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return events.filter(event => new Date(event.date) >= now);
  };

  const getPastEvents = () => {
    const now = new Date();
    return events.filter(event => new Date(event.date) < now);
  };

  const exportAllRegistrations = () => {
    if (useStrapi) {
      // This would need to fetch all registrations from Strapi
      alert('Bulk export for Strapi not implemented yet. Use individual event exports.');
    } else {
      const dataStr = registrationService.exportRegistrations();
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', 'all-registrations.json');
      linkElement.click();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Management</h1>
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="useStrapi"
                  checked={useStrapi}
                  onChange={(e) => setUseStrapi(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="useStrapi" className="text-sm text-gray-700">
                  Use Strapi Backend
                </label>
              </div>
              
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setView('overview')}
                  className={`px-4 py-2 text-sm font-medium ${
                    view === 'overview' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setView('detailed')}
                  className={`px-4 py-2 text-sm font-medium ${
                    view === 'detailed' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Detailed View
                </button>
              </div>
            </div>

            <button
              onClick={exportAllRegistrations}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export All
            </button>
          </div>
        </div>

        {view === 'overview' ? (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Events</p>
                    <p className="text-3xl font-bold text-gray-900">{events.length}</p>
                  </div>
                  <Calendar className="h-12 w-12 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Upcoming Events</p>
                    <p className="text-3xl font-bold text-green-600">{getUpcomingEvents().length}</p>
                  </div>
                  <Calendar className="h-12 w-12 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Past Events</p>
                    <p className="text-3xl font-bold text-gray-600">{getPastEvents().length}</p>
                  </div>
                  <Calendar className="h-12 w-12 text-gray-600" />
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {getUpcomingEvents().map(event => {
                  const stats = getEventStats(event);
                  const isFullyBooked = event.maxAttendees && stats.attendeeCount >= event.maxAttendees;
                  
                  return (
                    <div key={event.id} className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                            <p>📍 {event.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {event.registrationRequired && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              Registration Required
                            </span>
                          )}
                          {isFullyBooked && (
                            <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                              Full
                            </span>
                          )}
                        </div>
                      </div>

                      {event.registrationRequired && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>Registrations: {stats.registrationCount}</span>
                            <span>Attendees: {stats.attendeeCount}</span>
                            {event.maxAttendees && (
                              <span>Capacity: {event.maxAttendees}</span>
                            )}
                          </div>
                          
                          {event.maxAttendees && (
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  isFullyBooked ? 'bg-red-500' : 'bg-blue-600'
                                }`}
                                style={{ 
                                  width: `${Math.min((stats.attendeeCount / event.maxAttendees) * 100, 100)}%` 
                                }}
                              ></div>
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        onClick={() => {
                          setSelectedEventId(event.id);
                          setView('detailed');
                        }}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Registrations
                      </button>
                    </div>
                  );
                })}
              </div>
              
              {getUpcomingEvents().length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No upcoming events found.
                </div>
              )}
            </div>

            {/* Past Events */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Events</h2>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {getPastEvents().length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {getPastEvents().slice(0, 5).map(event => {
                      const stats = getEventStats(event);
                      
                      return (
                        <div key={event.id} className="p-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{event.title}</h4>
                              <p className="text-sm text-gray-600">
                                {new Date(event.date).toLocaleDateString()} • {event.location}
                              </p>
                            </div>
                            
                            {event.registrationRequired && (
                              <div className="text-right">
                                <p className="text-sm text-gray-600">
                                  {stats.registrationCount} registrations
                                </p>
                                <p className="text-sm text-gray-600">
                                  {stats.attendeeCount} attendees
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No past events found.
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Detailed View */
          <RegistrationManager 
            eventId={selectedEventId || undefined} 
            useStrapi={useStrapi} 
          />
        )}
      </div>
    </div>
  );
};

export default AdminRegistrations;
