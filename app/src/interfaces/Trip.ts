export interface Trip {
  eid: string;
  title: string;
  url: string;
  description: string;
  photos: string[];
  tags: string[];
}

export interface TripCardProps {
  trip: Trip;
  onTagClick: (tag: string) => void;
}
