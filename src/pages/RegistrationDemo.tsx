import React, { useState } from 'react';
import { strapiApi } from '../services/api';
import { registrationService } from '../services/registrationService';
import type { RegistrationFormData } from '../types';

const RegistrationDemo: React.FC = () => {
  const [useStrapi, setUseStrapi] = useState(true);
  const [eventId] = useState(4); // Parish Picnic from mock data
  const [registering, setRegistering] = useState(false);
  const [result, setResult] = useState<string>('');
  const [registrationData, setRegistrationData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    phone: '',
    additionalInfo: '',
    attendeeCount: 1
  });

  const handleTest = async () => {
    if (!registrationData.name || !registrationData.email || !registrationData.phone) {
      setResult('❌ Please fill in all required fields');
      return;
    }

    setRegistering(true);
    setResult('🔄 Testing registration...');

    try {
      if (useStrapi) {
        // Test Strapi API
        const registration = await strapiApi.registerForEvent(eventId, registrationData);
        if (registration) {
          setResult(`✅ Strapi Registration Successful!\nID: ${registration.id}\nEmail: ${registration.email}\nAttendees: ${registration.attendeeCount}`);
        } else {
          setResult('❌ Strapi registration returned null');
        }
      } else {
        // Test Local Storage
        const registration = await registrationService.registerForEvent(eventId, registrationData);
        setResult(`✅ Local Storage Registration Successful!\nID: ${registration.id}\nEmail: ${registration.email}\nAttendees: ${registration.attendeeCount}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResult(`❌ Registration Failed:\n${errorMessage}`);
    } finally {
      setRegistering(false);
    }
  };

  const handleClear = () => {
    setRegistrationData({
      name: '',
      email: '',
      phone: '',
      additionalInfo: '',
      attendeeCount: 1
    });
    setResult('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Registration System Demo</h1>
      
      {/* Service Toggle */}
      <div className="mb-6">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={useStrapi}
            onChange={(e) => setUseStrapi(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Use Strapi API (unchecked = Local Storage)
          </span>
        </label>
        <p className="text-xs text-gray-500 mt-1">
          Current: {useStrapi ? 'Strapi Backend' : 'Local Storage'} | Event: Parish Picnic (ID: 4)
        </p>
      </div>

      {/* Registration Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={registrationData.name}
            onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={registrationData.email}
            onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="john@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            value={registrationData.phone}
            onChange={(e) => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="(555) 123-4567"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Attendees
          </label>
          <select
            value={registrationData.attendeeCount}
            onChange={(e) => setRegistrationData(prev => ({ ...prev, attendeeCount: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Information
          </label>
          <textarea
            rows={3}
            value={registrationData.additionalInfo}
            onChange={(e) => setRegistrationData(prev => ({ ...prev, additionalInfo: e.target.value }))}
            placeholder="Any special requirements..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleTest}
          disabled={registering}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {registering ? 'Testing...' : 'Test Registration'}
        </button>
        <button
          onClick={handleClear}
          disabled={registering}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Test Result:</h3>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">{result}</pre>
        </div>
      )}

      {/* API Status Check */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-2">API Endpoints Configuration:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Strapi URL: {import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'}</p>
          <p>• Registration Endpoint: /api/event-registrations</p>
          <p>• Events Endpoint: /api/events</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDemo;
