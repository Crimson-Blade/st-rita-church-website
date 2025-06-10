# St. Rita's Parish Website

A modern, responsive website for Catholic parishes built with React, TypeScript, and Tailwind CSS, integrated with Strapi CMS for easy content management.

## Features

### For Parishioners
- **Homepage**: Welcome message, featured announcements, recent blog posts, and upcoming events
- **Mass Times**: Complete schedule of all masses and services
- **Blog**: Spiritual reflections and teachings from parish clergy
- **Events**: Parish events with registration capabilities
- **Announcements**: Important parish news and updates
- **Ministries**: Information about parish ministries and volunteer opportunities
- **Faith Formation**: Religious education resources and programs
- **Contact**: Easy ways to get in touch with the parish office
- **Donations**: Secure online giving platform
- **Vocations**: Information about religious vocations

### For Parish Staff
- **Strapi CMS Integration**: Easy content management without coding
- **Blog Management**: Create and publish blog posts with featured images and galleries
- **Event Management**: Create events with registration tracking
- **Announcement System**: Publish urgent and regular announcements
- **Contact Form Management**: Receive and manage contact submissions
- **Responsive Design**: Works perfectly on all devices

## Visual Design

The website features beautiful background images of the church:

- **outside.jpg**: Used as hero background on About page and homepage to showcase the church building
- **inside.jpg**: Used as background on Contact page, Blog pages, and featured blog sections to create a welcoming, contemplative atmosphere
- **Parallax Effect**: Background images use fixed attachment for an engaging scroll experience
- **Overlay System**: Semi-transparent overlays ensure text readability while preserving image beauty

## Blog System

The blog system is designed specifically for parish clergy to easily share spiritual content:

### Features
- **Rich Text Editor**: Easy-to-use editor in Strapi for creating blog posts
- **Featured Images**: Add compelling visuals to blog posts
- **Image Galleries**: Include multiple images in blog posts
- **Author Attribution**: Automatic author information for each post
- **Search Functionality**: Parishioners can search through blog posts
- **Responsive Design**: Beautiful presentation on all devices
- **SEO Optimized**: Proper meta tags and structured data

### Content Management
Parish staff can easily manage blog content through Strapi:

1. **Create Posts**: Use the rich text editor to write spiritual reflections
2. **Add Images**: Upload featured images and gallery photos
3. **Publish**: Set publication dates and author information
4. **Organize**: Use categories and tags to organize content

## Strapi CMS Setup

To set up the Strapi backend for content management:

### Required Content Types

#### Blog Posts
- Title (Text)
- Content (Rich Text)
- Excerpt (Text)
- Author (Text)
- Slug (Text)
- Featured Image (Media)
- Gallery (Media - Multiple)
- Published At (DateTime)

#### Announcements
- Title (Text)
- Content (Rich Text)
- Urgent (Boolean)
- Slug (Text)
- Published At (DateTime)

#### Events
- Title (Text)
- Description (Rich Text)
- Date (Date)
- Time (Text)
- Location (Text)
- Registration Required (Boolean)
- Max Attendees (Number)
- Current Attendees (Number)
- Slug (Text)

#### Contact Submissions
- Name (Text)
- Email (Email)
- Phone (Text)
- Subject (Text)
- Message (Rich Text)
- Submitted At (DateTime)

### Environment Variables
Create a `.env` file with:
```
VITE_STRAPI_URL=http://localhost:1337/api
VITE_STRAPI_TOKEN=your_strapi_api_token_here
```

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Start development server: `npm run dev`
5. Set up Strapi CMS separately with the required content types

## Deployment

The application is ready for deployment to Netlify, Vercel, or any static hosting service.

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons
- **Strapi** - Headless CMS for content management

## Support

This website is designed to be maintained by parish staff with minimal technical knowledge. The Strapi CMS provides an intuitive interface for managing all content, while the frontend automatically displays the content in a beautiful, responsive design.