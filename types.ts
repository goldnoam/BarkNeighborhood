
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

export enum Tab {
  FEED = 'FEED',
  MAP = 'MAP',
  STORES = 'STORES'
}
