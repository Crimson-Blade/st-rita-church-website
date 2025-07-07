import axios from 'axios';
import type { 
  BlogPost, 
  Event, 
  Ministry, 
  MassTime, 
  AdorationTime, 
  ConfessionTime, 
  Priest, 
  NoticeBoardItem,
  PaginatedResponse,
  EventRegistration,
  RegistrationFormData,
  ParishInfo,
} from '../types';

const API_BASE_URL = (import.meta.env.VITE_STRAPI_URL?.replace(/\/+$/, '') || 'http://localhost:1337') + '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Sanitize notice board item to ensure it has the correct structure
const sanitizeNoticeBoardItem = (item: NoticeBoardItem): NoticeBoardItem => {
  const sanitized = { ...item };

  // Check if item has image data
  const hasImage = Boolean(item.image || item.imageUrl);

  // If type is text but has image data, change to image type
  if (item.type === 'text' && hasImage) {
    sanitized.type = 'image';
    // Keep the urgent flag but note it's not typically used for image types
    console.log(`Auto-corrected: "${item.title}" changed from text to image due to presence of image data`);
  }

  // If type is image/poster but no image data, change to text type
  if ((item.type === 'image' || item.type === 'poster') && !hasImage) {
    sanitized.type = 'text';
    // Ensure content exists for text type
    if (!sanitized.content) {
      sanitized.content = sanitized.title; // Use title as fallback content
    }
    console.log(`Auto-corrected: "${item.title}" changed from ${item.type} to text due to missing image data`);
  }

  // Clean up fields based on final type
  if (sanitized.type === 'text') {
    // For text items, remove image data and ensure content exists
    sanitized.image = undefined;
    sanitized.imageUrl = undefined;
    if (!sanitized.content) {
      sanitized.content = sanitized.title;
    }
  } else {
    // For image/poster items, urgent flag is not applicable
    sanitized.urgent = undefined;
  }

  return sanitized;
};

export const strapiApi = {
  // Notice Board Items (includes announcements, images, and posters)
  async getNoticeBoardItems(page: number = 1, pageSize: number = 12, search?: string): Promise<PaginatedResponse<NoticeBoardItem>> {
    try {
      let url = `/notice-board-items?sort=publishedAt:desc&populate=image&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
      
      // Add search filter if provided
      if (search && search.trim()) {
        const searchQuery = encodeURIComponent(search.trim());
        url += `&filters[$or][0][title][$containsi]=${searchQuery}&filters[$or][1][content][$containsi]=${searchQuery}`;
      }
      
      const response = await api.get(url);
      const items = response.data.data || [];
      const meta = response.data.meta || {
        pagination: {
          page: 1,
          pageSize: pageSize,
          pageCount: 1,
          total: items.length
        }
      };
      
      return {
        data: items.map(sanitizeNoticeBoardItem),
        meta
      };
    } catch (error) {
      console.error('Error fetching notice board items:', error);
      return {
        data: [],
        meta: {
          pagination: {
            page: 1,
            pageSize: pageSize,
            pageCount: 0,
            total: 0
          }
        }
      };
    }
  },

  // Legacy method for backward compatibility
  async getAllNoticeBoardItems(): Promise<NoticeBoardItem[]> {
    try {
      const response = await this.getNoticeBoardItems(1, 1000); // Get all items
      return response.data;
    } catch (error) {
      console.error('Error fetching all notice board items:', error);
      return [];
    }
  },

  async getNoticeBoardItem(slug: string): Promise<NoticeBoardItem | null> {
    try {
      const response = await api.get(`/notice-board-items?filters[slug][$eq]=${slug}&populate=image`);
      const item = response.data.data[0] || null;
      return item ? sanitizeNoticeBoardItem(item) : null;
    } catch (error) {
      console.error('Error fetching notice board item:', error);
      return null;
    }
  },

  // Blog Posts
  async getBlogPosts(page: number = 1, pageSize: number = 12, search?: string): Promise<PaginatedResponse<BlogPost>> {
    try {
      let url = `/blog-posts?sort=publishedAt:desc&populate[0]=featuredImage&populate[1]=gallery&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
      
      // Add search filter if provided
      if (search && search.trim()) {
        const searchQuery = encodeURIComponent(search.trim());
        url += `&filters[$or][0][title][$containsi]=${searchQuery}&filters[$or][1][excerpt][$containsi]=${searchQuery}&filters[$or][2][author][$containsi]=${searchQuery}`;
      }
      
      const response = await api.get(url);
      const items = response.data.data || [];
      const meta = response.data.meta || {
        pagination: {
          page: 1,
          pageSize: pageSize,
          pageCount: 1,
          total: items.length
        }
      };
      
      return {
        data: items,
        meta
      };
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return {
        data: [],
        meta: {
          pagination: {
            page: 1,
            pageSize: pageSize,
            pageCount: 0,
            total: 0
          }
        }
      };
    }
  },

  // Legacy method for backward compatibility
  async getAllBlogPosts(): Promise<BlogPost[]> {
    try {
      const response = await this.getBlogPosts(1, 1000); // Get all items
      return response.data;
    } catch (error) {
      console.error('Error fetching all blog posts:', error);
      return [];
    }
  },

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
      const response = await api.get(`/blog-posts?filters[slug][$eq]=${slug}&populate[0]=featuredImage&populate[1]=gallery`);
      return response.data.data[0] || null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  },

  async getEvents(): Promise<Event[]> {
    try {
      const response = await api.get('/events?sort=date:asc');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  async getEvent(eventId: number): Promise<Event | null> {
    try {
      const response = await api.get(`/events/${eventId}`);
      return response.data.data || null;
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  },

  async registerForEvent(eventId: number, registrationData: RegistrationFormData): Promise<EventRegistration | null> {
    try {
      // First, check if event exists and has capacity
      const event = await this.getEvent(eventId);
      if (!event) {
        throw new Error('Event not found');
      }

      if (event.maxAttendees && event.currentAttendees + registrationData.attendeeCount > event.maxAttendees) {
        throw new Error('Event is fully booked');
      }

      // Create the registration
      const response = await api.post('/event-registrations', {
        data: {
          name: registrationData.name,
          email: registrationData.email,
          phone: registrationData.phone,
          attendeeCount: registrationData.attendeeCount,
          additionalInfo: registrationData.additionalInfo || '',
          event: eventId,
          status: 'confirmed',
        },
      });

      const registration = response.data.data;

      // Update event attendee count
      await this.updateEventAttendeeCount(eventId, registrationData.attendeeCount);

      return registration;
    } catch (error) {
      console.error('Error registering for event:', error);
      throw error;
    }
  },

  async updateEventAttendeeCount(eventId: number, additionalAttendees: number): Promise<boolean> {
    try {
      // Get current event data
      const event = await this.getEvent(eventId);
      if (!event) {
        return false;
      }

      const newCount = event.currentAttendees + additionalAttendees;

      const response = await api.put(`/events/${eventId}`, {
        data: {
          currentAttendees: newCount,
        },
      });

      return response.status === 200;
    } catch (error) {
      console.error('Error updating attendee count:', error);
      return false;
    }
  },

  async getEventRegistrations(eventId: number): Promise<EventRegistration[]> {
    try {
      const response = await api.get(
        `/event-registrations?filters[event][id][$eq]=${eventId}&populate[event]=*&sort=createdAt:desc`
      );
      
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching event registrations:', error);
      return [];
    }
  },

  async getRegistration(registrationId: number): Promise<EventRegistration | null> {
    try {
      const response = await api.get(`/event-registrations/${registrationId}?populate[event]=*`);
      return response.data.data || null;
    } catch (error) {
      console.error('Error fetching registration:', error);
      return null;
    }
  },

  async cancelRegistration(registrationId: number): Promise<boolean> {
    try {
      // Get registration to get attendee count for updating event
      const registration = await this.getRegistration(registrationId);
      if (!registration) {
        return false;
      }

      // Update registration status
      const response = await api.put(`/event-registrations/${registrationId}`, {
        data: {
          status: 'cancelled',
        },
      });

      if (response.status === 200) {
        // Update event attendee count (subtract the cancelled attendees)
        const eventId = typeof registration.event === 'object' ? registration.event.id : registration.event;
        await this.updateEventAttendeeCount(eventId, -registration.attendeeCount);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error cancelling registration:', error);
      return false;
    }
  },

  // Legacy method for backward compatibility - now properly typed
  async registerForEvent_legacy(eventId: number, userData: Record<string, unknown>): Promise<boolean> {
    try {
      await api.post('/event-registrations', {
        data: {
          event: eventId,
          ...userData,
        },
      });
      return true;
    } catch (error) {
      console.error('Error registering for event:', error);
      return false;
    }
  },

  // Ministries
  async getMinistries(): Promise<Ministry[]> {
    try {
      const response = await api.get('/ministries');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching ministries:', error);
      return [];
    }
  },

  // Mass Times
  async getMassTimes(): Promise<MassTime[]> {
    try {
      const response = await api.get('/mass-timings?sort=day:asc');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching mass timings:', error);
      return [];
    }
  },

  // Adoration Times
  async getAdorationTimes(): Promise<AdorationTime[]> {
    try {
      const response = await api.get('/adoration-times?sort=day:asc');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching adoration times:', error);
      return [];
    }
  },

  // Confession Times
  async getConfessionTimes(): Promise<ConfessionTime[]> {
    try {
      const response = await api.get('/confession-times?sort=day:asc');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching confession times:', error);
      return [];
    }
  },

  // Priests
  async getPriests(): Promise<Priest[]> {
    try {
      const response = await api.get('/priests');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching priests:', error);
      return [];
    }
  },

  // Contact Form
  async submitContactForm(formData: Record<string, unknown>): Promise<boolean> {
    try {
      await api.post('/contact-submissions', {
        data: formData,
      });
      return true;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return false;
    }
  },

  // Feedback Form
  async submitFeedback(feedbackData: Record<string, unknown>): Promise<boolean> {
    try {
      await api.post('/feedback-submissions', {
        data: feedbackData,
      });
      return true;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return false;
    }
  },

  // Parish Info
  async getParishInfo(): Promise<ParishInfo | null> {
    try {
      const response = await api.get('/parish-info');
      return response.data.data || null;
    } catch (error) {
      console.error('Error fetching parish info:', error);
      return null;
    }
  },
};