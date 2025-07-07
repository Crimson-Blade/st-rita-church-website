# Pagination Implementation for St. Rita's Church Website

## Overview

This document describes the implementation of pagination for the Notice Board and Blog sections using the Strapi pagination format.

## Strapi Pagination Format

The API returns data in the following format:

```json
{
  "data": [
    // ... array of items
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

## Implementation Details

### API Service Updates (`src/services/api.ts`)

1. **Updated Methods**:
   - `getNoticeBoardItems(page, pageSize, search)` - Added pagination and optional search
   - `getBlogPosts(page, pageSize, search)` - Added pagination and optional search

2. **Features**:
   - Server-side pagination using Strapi's pagination parameters
   - Server-side search using Strapi's filtering capabilities
   - Fallback pagination metadata when API doesn't provide it

### Blog Page (`src/pages/Blog.tsx`)

1. **State Management**:
   - Added pagination state with page, pageSize, pageCount, and total
   - Implemented debounced search (500ms delay)
   - Removed client-side filtering in favor of server-side search

2. **Features**:
   - Server-side search across title, excerpt, and author fields
   - Automatic page reset when search term changes
   - Pagination component that shows/hides based on available pages
   - Loading states during pagination and search

### Notice Board Page (`src/pages/NoticeBoard.tsx`)

1. **State Management**:
   - Added pagination state
   - Maintained client-side filtering for type filters (text, image, poster)
   - Server-side search for title and content fields

2. **Features**:
   - Pagination only shows when no search/filters are applied
   - Hybrid approach: server pagination + client filtering
   - Loading states during page changes

### Pagination Component (`src/components/Pagination.tsx`)

The existing pagination component was already compatible with the Strapi format:

1. **Props**:
   - `pagination`: PaginationMeta object containing page info
   - `onPageChange`: Callback function for page changes
   - `className`: Optional styling classes

2. **Features**:
   - Smart page number display with ellipsis
   - Previous/Next buttons with disabled states
   - Results information display
   - Responsive design

### Featured Components Updates

Updated the home page featured components to use the new paginated API:

1. **FeaturedBlogs** - Now requests only first 3 items: `getBlogPosts(1, 3)`
2. **FeaturedNotices** - Now requests only first 3 items: `getNoticeBoardItems(1, 3)`

## Usage Examples

### Basic Pagination
```typescript
// Fetch first page with default page size (12 items)
const response = await strapiApi.getBlogPosts(1, 12);
```

### Pagination with Search
```typescript
// Fetch second page with search term
const response = await strapiApi.getBlogPosts(2, 12, "prayer");
```

### Using Pagination Component
```tsx
<Pagination
  pagination={pagination}
  onPageChange={handlePageChange}
/>
```

## Search Implementation

### Blog Search
- Searches across: title, excerpt, author
- Debounced input (500ms delay)
- Resets to page 1 when search changes
- Server-side implementation using Strapi filters

### Notice Board Search
- Searches across: title, content
- Immediate search (no debouncing for simpler UX)
- Disables pagination when search is active
- Server-side implementation using Strapi filters

## Performance Considerations

1. **Debounced Search**: Blog search is debounced to reduce API calls
2. **Pagination Hiding**: Pagination is hidden during search to avoid confusion
3. **Loading States**: Clear loading indicators during API calls
4. **Fallback Data**: Mock data is used when API is unavailable

## Future Enhancements

1. **Server-side Filtering**: Implement server-side type filtering for Notice Board
2. **Category/Tag Filtering**: Add blog category filtering
3. **Advanced Search**: Multi-field search with operators
4. **Infinite Scroll**: Alternative to pagination for mobile users
5. **Search History**: Remember recent searches

## Error Handling

- API errors are logged to console
- Fallback pagination metadata prevents crashes
- Mock data ensures UI remains functional
- Loading states provide user feedback

## Testing

To test the pagination:

1. Start the development server: `npm run dev`
2. Navigate to `/blog` or `/notice-board`
3. Test pagination controls (if multiple pages exist)
4. Test search functionality
5. Verify loading states and error handling
