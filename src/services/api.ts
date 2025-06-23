import axios from 'axios';
import type { 
  BlogPost, 
  Event, 
  Ministry, 
  MassTime, 
  AdorationTime, 
  ConfessionTime, 
  Priest, 
  NoticeBoardItem 
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
  async getNoticeBoardItems(): Promise<NoticeBoardItem[]> {
    try {
      const response = await api.get('/notice-board-items?sort=publishedAt:desc&populate=image');
      const items = response.data.data || [];
      return items.map(sanitizeNoticeBoardItem);
    } catch (error) {
      console.error('Error fetching notice board items:', error);
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
  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      const response = await api.get('/blog-posts?sort=publishedAt:desc');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  },

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
      const response = await api.get(`/blog-posts?filters[slug][$eq]=${slug}`);
      return response.data.data[0] || null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  },

  // Events
  async getEvents(): Promise<Event[]> {
    try {
      const response = await api.get('/events?sort=date:asc');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  async registerForEvent(eventId: number, userData: any): Promise<boolean> {
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
  async submitContactForm(formData: any): Promise<boolean> {
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
  async submitFeedback(feedbackData: any): Promise<boolean> {
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
};