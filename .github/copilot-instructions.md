# St. Rita's Church Website - Developer Instructions

A modern Catholic church website built with React 18, TypeScript, Vite, and Tailwind CSS, integrated with Strapi CMS for content management.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Initial Setup and Build Process
Execute these commands in order for a fresh development environment:

```bash
npm install
npm run build
npm run dev
```

- **npm install** - Install all dependencies (~25 seconds, NEVER CANCEL)
- **npm run build** - Build for production with sitemap generation (~5 seconds, timeout: 30 seconds)
- **npm run dev** - Start development server on http://localhost:5173
- **npm run preview** - Preview built application on http://localhost:4173
- **npm run lint** - Run ESLint code quality checks (~3 seconds)
- **npm run sitemap** - Generate sitemap.xml only (~0.3 seconds)

### Environment Configuration

Create `.env` file with Strapi CMS configuration:
```bash
VITE_STRAPI_URL=http://localhost:1337/api
VITE_STRAPI_TOKEN=your_strapi_api_token_here
```

**IMPORTANT**: The application works perfectly WITHOUT Strapi CMS running. It uses graceful fallback with static content and local storage for event registrations.

## Build & Test Validation

### Required Commands Before Every Commit
```bash
npm run lint    # Fix any warnings (current: 2 minor warnings, safe to ignore)
npm run build   # NEVER CANCEL - Build takes ~5 seconds maximum
```

### Manual Validation Scenarios
After making code changes, ALWAYS test these complete user workflows:

1. **Navigation Flow**: Test all main navigation links (Home → About → Mass Timings → Contact → Donate)
2. **Content Loading**: Verify pages load with proper content even when Strapi is unavailable
3. **Responsive Design**: Check mobile responsiveness using browser dev tools
4. **Event Registration**: Test the registration form on event detail pages
5. **SEO Elements**: Verify page titles and meta descriptions are working
6. **Contact Forms**: Test contact form submission (uses local storage fallback)

### Browser Testing Setup
```bash
# Start dev server
npm run dev

# Navigate to http://localhost:5173 in browser
# Test key pages: /, /about, /mass-timings, /contact, /blog, /donate
```

**VALIDATION REQUIREMENT**: Always test actual user scenarios, not just page loading. Test form submissions, navigation flows, and responsive behavior.

## Project Structure and Key Locations

### Core Application Files
- **`src/App.tsx`** - Main React Router setup and page routing
- **`src/main.tsx`** - Application entry point with React strict mode
- **`src/services/api.ts`** - Strapi CMS integration with fallback handling
- **`src/types/index.ts`** - TypeScript type definitions for all data structures

### Important Page Components
- **`src/pages/Home.tsx`** - Homepage with hero, featured content, and quick actions
- **`src/pages/About.tsx`** - Rich content about Saint Rita and parish history
- **`src/pages/EventDetail.tsx`** - Event details with registration functionality
- **`src/pages/Blog.tsx`** & **`src/pages/BlogPost.tsx`** - Blog system with Strapi integration
- **`src/pages/MassTimes.tsx`** - Mass schedule and confession times

### Key Components
- **`src/components/Layout/`** - Header, Footer, and main layout components
- **`src/components/RegistrationManager.tsx`** - Event registration system
- **`src/components/SEO.tsx`** - SEO optimization component for all pages
- **`src/components/Pagination.tsx`** - Pagination for blog and event listings

### Configuration Files
- **`package.json`** - Dependencies and npm scripts
- **`vite.config.ts`** - Vite build configuration
- **`tailwind.config.js`** - Tailwind CSS customization
- **`eslint.config.js`** - ESLint rules and TypeScript support
- **`tsconfig.json`** - TypeScript compiler configuration

## Strapi CMS Integration

### Content Types Required (Optional - App Works Without)
If setting up Strapi CMS, these content types should be created:

1. **Blog Posts**: Title, Content (Rich Text), Excerpt, Author, Slug, Featured Image, Gallery
2. **Events**: Title, Description, Date, Time, Location, Registration Settings, Slug  
3. **Announcements**: Title, Content, Urgent flag, Slug
4. **Contact Submissions**: Name, Email, Phone, Subject, Message
5. **Event Registrations**: Name, Email, Phone, Attendee Count, Additional Info

### API Endpoints
- `GET /api/blog-posts` - Blog posts with pagination
- `GET /api/events` - Events with registration status
- `POST /api/event-registrations` - Submit event registration
- `GET /api/notice-board-items` - Announcements and notices
- `GET /api/mass-timings` - Mass schedule data

**Fallback Behavior**: When Strapi is unavailable, the app shows static content and stores form data in localStorage.

## Common Development Tasks

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Include SEO component with appropriate meta data
4. Test navigation and mobile responsiveness

### Modifying Styles
- Use Tailwind CSS utility classes
- Custom styles in `src/index.css` if needed
- Always test responsive breakpoints (sm, md, lg, xl)

### Event Registration System
- **Primary**: Uses Strapi API (`strapiApi.registerForEvent()`)
- **Fallback**: Local storage (`registrationService.registerForEvent()`)
- **Validation**: Client-side form validation with capacity checking
- **Testing**: Use test data: Name: "John Doe", Email: "john@example.com", Phone: "(555) 123-4567"

### Blog Content Management
- Rich text content using `@strapi/blocks-react-renderer`
- Featured images and galleries supported
- SEO-friendly slugs and meta descriptions
- Search functionality built-in

## Deployment and Production

### Build Process
```bash
npm run build  # Creates dist/ folder with optimized assets
```

**Build Output**:
- `dist/index.html` - Main HTML file
- `dist/assets/` - CSS and JavaScript bundles
- `dist/sitemap.xml` - Auto-generated sitemap
- Static assets (images, fonts, etc.)

### Deployment Targets
- **Netlify** (recommended) - Use `netlify.toml` configuration
- **Vercel** - Ready for deployment
- **Static hosting** - Any static file hosting service

### Environment Variables for Production
```bash
VITE_STRAPI_URL=https://your-strapi-cms.herokuapp.com/api
VITE_STRAPI_TOKEN=your_production_strapi_token
```

## Troubleshooting

### Common Issues and Solutions

1. **Strapi Connection Errors**: Expected behavior when CMS is offline - app continues working with static content
2. **Build Warnings**: Current TypeScript version warning is safe to ignore
3. **Lint Warnings**: 2 minor React hooks warnings are acceptable and don't affect functionality
4. **Image Loading**: Ensure images are in `public/` directory for proper asset handling

### Performance Notes
- Build is very fast (~5 seconds) due to Vite optimization
- Images are optimized with `OptimizedImage` component
- Lazy loading implemented for better performance
- CSS is purged and minified in production

## Testing Strategy

### Manual Testing Checklist
- [ ] Homepage loads with all sections (Hero, Featured Notices, Clergy, Quick Actions)
- [ ] About page displays Saint Rita content and parish information
- [ ] Mass Timings page shows complete schedule
- [ ] Contact page form submissions work (localStorage fallback)
- [ ] Blog section loads and displays properly
- [ ] Event registration forms validate and submit correctly
- [ ] Navigation works on all screen sizes
- [ ] SEO meta tags populate correctly on all pages

### Automated Validation
```bash
npm run lint     # Code quality checks
npm run build    # Production build validation
```

**CRITICAL**: Always run manual testing scenarios after making changes. The application is designed for parish staff with minimal technical knowledge, so user experience is paramount.

## Quick Reference Commands

```bash
# Development
npm install          # Install dependencies (30 seconds max)
npm run dev         # Start dev server (http://localhost:5173)
npm run build       # Build for production (5 seconds max)
npm run preview     # Preview production build (http://localhost:4173)

# Quality Assurance  
npm run lint        # ESLint code checking (3 seconds max)
npm run sitemap     # Generate sitemap only (0.3 seconds max)

# Project Structure
├── src/
│   ├── pages/          # React page components
│   ├── components/     # Reusable components
│   ├── services/       # API and service functions
│   ├── types/          # TypeScript definitions
│   └── utils/          # Utility functions
├── public/             # Static assets
└── dist/              # Production build output
```

Remember: This is a production Catholic church website serving real parishioners. Always prioritize user experience, accessibility, and reliability in your changes.