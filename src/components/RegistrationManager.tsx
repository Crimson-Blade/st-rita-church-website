import React, { useState, useEffect } from 'react';
import { Users, Calendar, Mail, Phone, Download, Trash2 } from './Icons';
import { strapiApi } from '../services/api';
import { registrationService } from '../services/registrationService';
import type { EventRegistration, Event } from '../types';

interface RegistrationManagerProps {
  eventId?: number;
  useStrapi?: boolean;
}

const RegistrationManager: React.FC<RegistrationManagerProps> = ({ 
  eventId, 
  useStrapi = true 
}) => {
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(eventId || null);

  useEffect(() => {
    loadData();
  }, [selectedEvent, useStrapi]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load events
      const eventsData = await strapiApi.getEvents();
      setEvents(eventsData);

      // Load registrations
      if (selectedEvent) {
        if (useStrapi) {
          const regs = await strapiApi.getEventRegistrations(selectedEvent);
          setRegistrations(regs);
        } else {
          const localRegs = registrationService.getEventRegistrations(selectedEvent);
          // Convert local registrations to match EventRegistration interface
          const convertedRegs: EventRegistration[] = localRegs.map(reg => ({
            ...reg,
            event: selectedEvent
          }));
          setRegistrations(convertedRegs);
        }
      }
    } catch (error) {
      console.error('Error loading registration data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async (registrationId: number) => {
    if (!confirm('Are you sure you want to cancel this registration?')) {
      return;
    }

    try {
      let success = false;
      if (useStrapi) {
        success = await strapiApi.cancelRegistration(registrationId);
      } else {
        success = await registrationService.cancelRegistration(registrationId);
      }

      if (success) {
        alert('Registration cancelled successfully');
        loadData(); // Reload data
      } else {
        alert('Failed to cancel registration');
      }
    } catch (error) {
      console.error('Error cancelling registration:', error);
      alert('Error cancelling registration');
    }
  };

  const exportRegistrations = () => {
    if (useStrapi) {
      // For Strapi, export current registrations as JSON
      const dataStr = JSON.stringify(registrations, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `event-${selectedEvent}-registrations.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } else {
      // For local storage, use the service export function
      const dataStr = registrationService.exportRegistrations();
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'all-registrations.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  const getTotalAttendees = () => {
    return registrations.reduce((total, reg) => total + reg.attendeeCount, 0);
  };

  const getConfirmedRegistrations = () => {
    return registrations.filter(reg => reg.status === 'confirmed');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Registration Management
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Source: {useStrapi ? 'Strapi' : 'Local Storage'}</span>
        </div>
      </div>

      {/* Event Selector */}
      <div className="mb-6">
        <label htmlFor="event-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Event
        </label>
        <select
          id="event-select"
          value={selectedEvent || ''}
          onChange={(e) => setSelectedEvent(e.target.value ? parseInt(e.target.value) : null)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select an event...</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>
              {event.title} - {new Date(event.date).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      {selectedEvent && (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-blue-600">Total Registrations</p>
                  <p className="text-2xl font-bold text-blue-900">{registrations.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-green-600">Confirmed</p>
                  <p className="text-2xl font-bold text-green-900">{getConfirmedRegistrations().length}</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-purple-600">Total Attendees</p>
                  <p className="text-2xl font-bold text-purple-900">{getTotalAttendees()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Registrations</h3>
            <button
              onClick={exportRegistrations}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>

          {/* Registrations List */}
          {registrations.length > 0 ? (
            <div className="space-y-4">
              {registrations.map((registration) => (
                <div
                  key={registration.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{registration.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          registration.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : registration.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {registration.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {registration.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {registration.phone}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {registration.attendeeCount} attendee{registration.attendeeCount !== 1 ? 's' : ''}
                        </div>
                      </div>

                      {registration.additionalInfo && (
                        <div className="mt-2 text-sm text-gray-600">
                          <strong>Notes:</strong> {registration.additionalInfo}
                        </div>
                      )}

                      <div className="mt-2 text-xs text-gray-500">
                        Registered: {new Date(registration.registrationDate).toLocaleString()}
                      </div>
                    </div>

                    {registration.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancelRegistration(registration.id)}
                        className="ml-4 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                        title="Cancel Registration"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No registrations found for this event.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RegistrationManager;
