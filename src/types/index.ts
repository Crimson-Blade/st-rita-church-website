export interface Announcement {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
  urgent: boolean;
  slug: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  slug: string;
  featuredImage?: string;
  gallery?: string[];
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

export interface NoticeBoardItem {
  id: number;
  type: 'announcement' | 'image' | 'poster';
  title: string;
  content?: string;
  imageUrl?: string;
  publishedAt: string;
  urgent?: boolean;
  slug: string;
  category?: string;
  description?: string;
}