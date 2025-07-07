import type { StrapiImage } from '../types';

/**
 * Utility function to get image URL - handles both string URLs and StrapiImage objects
 * @param image - StrapiImage object or string URL
 * @param size - The desired image size format
 * @returns The image URL or undefined if no image
 */
export const getImageUrl = (
  image: StrapiImage | string | undefined, 
  size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium'
): string | undefined => {
  if (!image) return undefined;
  
  // If it's already a string URL, return it
  if (typeof image === 'string') {
    return image;
  }

  // Handle StrapiImage object
  const baseUrl = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

  let imageUrl: string;
  if (size === 'original') {
    imageUrl = image.url;
  } else {
    imageUrl = image.formats?.[size]?.url || image.url;
  }

  // If the URL is relative, prepend the base URL
  if (imageUrl.startsWith('/')) {
    return `${baseUrl}${imageUrl}`;
  }

  return imageUrl;
};

/**
 * Get image URL for an item that might have both Strapi format and legacy imageUrl property
 * @param item - Object that might have both image and imageUrl properties
 * @param size - The desired image size format
 * @returns The image URL or undefined if no image
 */
export const getItemImageUrl = (
  item: { image?: StrapiImage; imageUrl?: string }, 
  size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium'
): string | undefined => {
  if (item.image) {
    return getImageUrl(item.image, size);
  }
  return item.imageUrl; // Fallback for mock data
};
