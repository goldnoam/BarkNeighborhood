
export interface DogPost {
  id: string;
  author: string;
  dogName: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export interface LocationInfo {
  title: string;
  uri: string;
  type: 'park' | 'store' | 'vet' | 'playground';
  description?: string;
}

export interface Ad {
  id: string;
  title: string;
  image: string;
  link: string;
  sponsor: string;
}

export enum Tab {
  FEED = 'FEED',
  MAP = 'MAP',
  STORES = 'STORES',
  AI = 'AI'
}
