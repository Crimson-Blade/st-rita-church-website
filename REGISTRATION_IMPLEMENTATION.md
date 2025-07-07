# Event Registration Implementation Guide

## Overview

This implementation provides a comprehensive event registration system for the St. Rita Church website with support for both Strapi CMS backend and local storage fallback.

## Features Implemented

### 1. Enhanced Type Safety
- Added `EventRegistration` interface for registration data structure
- Added `RegistrationFormData` interface for form validation
- Updated API service with proper TypeScript typing

### 2. Strapi Backend Integration

#### API Endpoints Required in Strapi:
```javascript
// Content Type: event-registration
{
  "name": { "type": "string", "required": true },
  "email": { "type": "email", "required": true },
  "phone": { "type": "string", "required": true },
  "attendeeCount": { "type": "integer", "default": 1 },
  "additionalInfo": { "type": "text" },
  "event": { "type": "relation", "relation": "manyToOne", "target": "api::event.event" },
  "registrationDate": { "type": "datetime", "default": "now" },
  "status": { "type": "enumeration", "enum": ["confirmed", "pending", "cancelled"] }
}
```

#### Key Strapi API Methods:
- `registerForEvent()` - Creates new registration with capacity validation
- `getEventRegistrations()` - Retrieves all registrations for an event
- `cancelRegistration()` - Cancels existing registration
- `updateEventAttendeeCount()` - Updates event capacity tracking

### 3. Local Storage Fallback

#### Features:
- Complete registration management without backend dependency
- Email confirmation system (EmailJS integration ready)
- Data export/import functionality
- Admin interface for registration management

#### Files:
- `src/services/registrationService.ts` - Local storage implementation
- `src/components/RegistrationManager.tsx` - Admin interface

### 4. Enhanced EventDetail Component

#### New Features:
- Email field added to registration form
- Improved error handling with specific error messages
- Capacity validation before registration
- Dynamic attendee count updates
- Registration confirmation with unique ID

## Usage Examples

### 1. Basic Registration (Strapi)
```typescript
import { strapiApi } from '../services/api';

const registrationData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '555-1234',
  attendeeCount: 2,
  additionalInfo: 'Dietary restrictions: vegetarian'
};

try {
  const registration = await strapiApi.registerForEvent(eventId, registrationData);
  console.log('Registration successful:', registration.id);
} catch (error) {
  console.error('Registration failed:', error.message);
}
```

### 2. Local Storage Registration
```typescript
import { registrationService } from '../services/registrationService';

try {
  const registration = await registrationService.registerForEvent(eventId, registrationData);
  console.log('Local registration successful:', registration.id);
} catch (error) {
  console.error('Registration failed:', error.message);
}
```

### 3. Using Registration Manager Component
```tsx
import RegistrationManager from '../components/RegistrationManager';

// For Strapi backend
<RegistrationManager eventId={123} useStrapi={true} />

// For local storage
<RegistrationManager useStrapi={false} />
```

## Configuration

### Environment Variables
```env
VITE_STRAPI_URL=http://localhost:1337
```

### Email Service Integration (Optional)
For email confirmations with local storage, install EmailJS:
```bash
npm install @emailjs/browser
```

Then configure in `registrationService.ts`:
```typescript
// Uncomment and configure the email service in sendConfirmationEmail method
const emailjs = await import('@emailjs/browser');
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData, 'YOUR_PUBLIC_KEY');
```

## Error Handling

The implementation includes comprehensive error handling:

1. **Capacity Validation**: Prevents over-registration for events with limits
2. **Network Failures**: Graceful degradation with fallback to mock data
3. **Form Validation**: Required field validation and type checking
4. **User Feedback**: Clear error messages and confirmation dialogs

## Security Considerations

1. **Input Validation**: All form inputs are validated on both client and server
2. **Type Safety**: Strong TypeScript typing prevents runtime errors
3. **Data Sanitization**: Strapi provides built-in sanitization
4. **Rate Limiting**: Consider implementing rate limiting on the Strapi API

## Deployment Notes

1. **Strapi Setup**: Ensure event-registration content type is created in Strapi
2. **Permissions**: Configure proper API permissions for registration endpoints
3. **Email Service**: Set up email service for confirmations (recommended)
4. **Backup Strategy**: Regular backups of registration data

## Testing Strategy

1. **Unit Tests**: Test individual API methods and form validation
2. **Integration Tests**: Test full registration flow
3. **Load Testing**: Test with high registration volumes
4. **Error Scenarios**: Test network failures and capacity limits

## Future Enhancements

1. **Payment Integration**: Add payment processing for paid events
2. **QR Code Tickets**: Generate QR codes for event entry
3. **Waitlist Management**: Automatic waitlist handling for full events
4. **SMS Notifications**: Add SMS confirmations and reminders
5. **Calendar Integration**: Generate calendar events for registrants
6. **Admin Dashboard**: Comprehensive admin interface for event management

## API Documentation

### Strapi Endpoints

#### Create Registration
```
POST /api/event-registrations
Content-Type: application/json

{
  "data": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "attendeeCount": number,
    "additionalInfo": "string",
    "event": number,
    "status": "confirmed"
  }
}
```

#### Get Event Registrations
```
GET /api/event-registrations?filters[event][id][$eq]={eventId}&populate[event]=*
```

#### Cancel Registration
```
PUT /api/event-registrations/{id}
Content-Type: application/json

{
  "data": {
    "status": "cancelled"
  }
}
```

#### Update Event Capacity
```
PUT /api/events/{id}
Content-Type: application/json

{
  "data": {
    "currentAttendees": number
  }
}
```

This implementation provides a robust, scalable solution for event registration management with excellent user experience and administrative capabilities.
