export type MessageType = 'user' | 'bot';

export interface Message {
  id: string;
  text: string;
  type: MessageType;
  timestamp: Date;
}

export interface Course {
  courses: string[];
  info: string;
}

export interface Department {
  departments: string[];
  info: string;
}

export interface Facility {
  name: string;
  description: string;
}

export interface Facilities {
  facilities: Facility[];
  info: string;
}

export interface Eligibility {
  btech: string;
  mtech: string;
  mba: string;
}

export interface Admission {
  admission: {
    process: string;
    eligibility: Eligibility;
    entranceExams: string[];
    documents: string[];
    applicationPeriod: string;
  };
  info: string;
}

export interface Event {
  name: string;
  type: string;
  description: string;
  date: string;
}

export interface Events {
  events: Event[];
  info: string;
}

export interface Club {
  name: string;
  description: string;
}

export interface Clubs {
  clubs: Club[];
  info: string;
}

export interface PlacementStats {
  placementPercentage: string;
  averagePackage: string;
  highestPackage: string;
  internships: string;
}

export interface Placements {
  placements: {
    overview: string;
    stats: PlacementStats;
    topRecruiters: string[];
    sectors: string[];
  };
  info: string;
}

export interface SocialMedia {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

export interface AdmissionsContact {
  phone: string;
  email: string;
}

export interface PlacementContact {
  phone: string;
  email: string;
}

export interface Contact {
  contact: {
    address: string;
    phone: string[];
    email: string;
    website: string;
    socialMedia: SocialMedia;
    admissionsContact: AdmissionsContact;
    placementContact: PlacementContact;
  };
  info: string;
}

export interface PredefinedQuestion {
  id: string;
  text: string;
  category: string;
}