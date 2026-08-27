export type EventCategory = 
  | 'Cinema & Production'
  | 'Classical Studies'
  | 'VFX & Technology'
  | 'Screenwriting & Narrative'
  | 'Keynote Gala'
  | 'Film Screening'
  | 'Data Science & Machine Learning'
  | 'Entrepreneurship & Innovation'
  | 'Sports & Gaming Strategy';

export interface Speaker {
  name: string;
  role: string;
  affiliation: string;
  avatar: string;
  bio: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  speaker?: string;
  description: string;
}

export interface GalleryMedia {
  url: string;
  caption: string;
  type?: 'image' | 'video';
}

export interface VenueInfo {
  name: string;
  hall: string;
  address: string;
  mapUrl?: string;
  isVirtual: boolean;
  streamUrl?: string;
  capacity: number;
  seatsLeft: number;
}

export interface RegistrationInfo {
  url: string;
  qrValue: string;
  deadline: string;
  fee: string;
  perks: string[];
}

export interface DepartmentEvent {
  id: string;
  title: string;
  subtitle: string;
  category: EventCategory;
  badge: string;
  date: string;
  isoDate: string;
  time: string;
  venue: VenueInfo;
  heroImage: string;
  videoTrailerUrl?: string;
  gallery: GalleryMedia[];
  description: string;
  synopsis: string;
  speakers: Speaker[];
  agenda: AgendaItem[];
  registration: RegistrationInfo;
  voyageMilestone: string;
  curatorNotes?: string;
  tags: string[];
  featured?: boolean;
}

export type ViewMode = '3d-grid' | 'voyage-timeline' | 'cinematic-reel';
