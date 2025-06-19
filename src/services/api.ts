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

const API_BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const strapiApi = {
  // Notice Board Items (includes announcements, images, and posters)
  async getNoticeBoardItems(): Promise<NoticeBoardItem[]> {
    try {
      const response = await api.get('/notice-board-items?sort=publishedAt:desc');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching notice board items:', error);
      return [];
    }
  },

  async getNoticeBoardItem(slug: string): Promise<NoticeBoardItem | null> {
    try {
      const response = await api.get(`/notice-board-items?filters[slug][$eq]=${slug}`);
      return response.data.data[0] || null;
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
      const response = await api.get('/mass-times?sort=day:asc');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching mass times:', error);
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