import type { BlocksContent } from '@strapi/blocks-react-renderer';

export interface BlogPost {
  id: number;
  title: string;
  content: BlocksContent;
  excerpt: string;
  publishedAt: string;
  author: string;
  slug: string;
  featuredImage?: StrapiImage;
  gallery?: StrapiImage[];
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  registrationRequired: boolean;
  maxAttendees?: number;
  currentAttendees: number;
  slug: string;
}

export interface EventRegistration {
  id: number;
  name: string;
  email: string;
  phone: string;
  attendeeCount: number;
  additionalInfo?: string;
  event: Event | number; // Can be populated event or just ID
  registrationDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  attendeeCount: number;
  additionalInfo?: string;
}

export interface Ministry {
  id: number;
  name: string;
  description: string;
  leader: string;
  meetingTime: string;
  contactEmail: string;
  slug: string;
  category?: string;
  image?: string;
  requirements?: string;
  timeCommitment?: string;
  benefits?: string;
}

export interface MassTime {
  id: number;
  day: string;
  time: string;
  type: 'Daily' | 'Sunday' | 'Holy Day' | 'Special';
  language?: string;
  location?: string;
  celebrant?: string;
  notes?: string;
}

export interface AdorationTime {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  type: 'Adoration' | 'Benediction';
  location?: string;
  notes?: string;
}

export interface ConfessionTime {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  location?: string;
  priest?: string;
  notes?: string;
  availableByAppointment?: boolean;
}

export interface Priest {
  id: number;
  name: string;
  title: string;
  bio: string;
  photo?: string;
  email?: string;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface NoticeBoardItem {
  id: number;
  type: 'text' | 'image' | 'poster';
  title: string;
  content?: string;
  image?: StrapiImage;
  imageUrl?: string; // For backward compatibility with mock data
  publishedAt: string;
  urgent?: boolean;
  slug: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: PaginationMeta;
  };
}

export interface ParishInfo {
  id: number;
  parishName: string;
  parishSubtitle: string;
  officePhone: string;
  parishPriestPhone?: string;
  officeEmail: string;
  parishPriestEmail?: string;
  address: string;
  officeWeekdayHours: string;
  officeSaturdayHours: string;
  officeSundayHours: string;
  sundayMass: string;
  weekdayMass: string;
  saturdayMass: string;
  confessionTimings?: string;
}