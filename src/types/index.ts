export type Category = 'Heritage' | 'Spiritual' | 'Culture' | 'Shopping' | 'Nature';

export type Zone = 'Ambala Cantt' | 'Ambala City' | 'Ambala Rural';

export interface Destination {
  id: string;
  name: string;
  hindiName: string;
  tagline: string;
  zone: Zone;
  category: Category;
  isGem: boolean; // Hidden Gem
  image: string;
  imageAlt: string;
  rating: number;
  reviewsCount: number;
  location: {
    address: string;
    neighborhood: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  historicalSignificance: string;
  architecturalStyle?: string;
  practicalInfo: {
    timings: string;
    entryFee: string;
    suggestedDurationMinutes: number;
    bestTimeToVisit: string;
    dressCode?: string;
    photography: string;
    accessibility: string;
    idealFor: string[];
  };
  source: {
    name: string;
    url: string;
  };
  tags: string[];
  highlights: string[];
}

export type ItineraryDuration = '2h' | '4h' | 'full-day';
export type ItineraryPace = 'relaxed' | 'packed';
export type ItineraryBudgetOption = 'Free' | 'Low-cost' | 'Flexible';
export type ItineraryBudget = ItineraryBudgetOption | 'all' | 'free-only';
export type TravelMode = 'walking-rickshaw' | 'car-taxi';

export interface StartingLocation {
  id: string;
  name: string;
  label: string;
  zone: Zone;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
}

export interface ItineraryPreference {
  duration: ItineraryDuration;
  interests: Category[];
  budget: ItineraryBudgetOption | any;
  startingLocationId?: string;
  pace?: ItineraryPace;
  preferredZone?: 'all' | Zone;
  travelMode: TravelMode;
  startTime: string; // e.g. "09:00"
}

export interface ItineraryStop {
  stopNumber: number;
  destination: Destination;
  startTime: string; // "09:00 AM"
  endTime: string;   // "10:15 AM"
  visitDurationMinutes: number;
  travelFromPrevious?: {
    distanceKm: number;
    travelMinutes: number;
    mode: TravelMode;
    transitAdvice: string;
  };
  travelTimeToNextMinutes?: number;
  distanceToNextKm?: number;
  transitTip?: string;
  selectionReason: string;
  verifiedBudgetInfo: string;
  curatorNote: string;
}

export interface GeneratedItinerary {
  id: string;
  title: string;
  summary: string;
  startingLocation: StartingLocation;
  totalDurationMinutes: number;
  totalVisitMinutes: number;
  totalTravelMinutes: number;
  stops: ItineraryStop[];
  estimatedCost: string;
  primaryZone: string;
  googleMapsRouteUrl: string;
  createdAt: string;
  algorithmSummary: string;
}

export interface VisitedRecord {
  date: string;
  note?: string;
  rating?: number;
}

export interface PassportState {
  favorites: string[];
  visited: Record<string, VisitedRecord>;
  unlockedBadges: Record<string, string>; // badgeId -> dateUnlocked
  customItineraries: GeneratedItinerary[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  criteriaDescription: string;
  category: Category | 'Mastery';
}

export interface CuratedTrail {
  id: string;
  title: string;
  subtitle: string;
  durationLabel: string;
  distanceLabel: string;
  highlightTag: string;
  destinationIds: string[];
  description: string;
  themeColor: string;
}

export interface LocalFoodSpot {
  id: string;
  name: string;
  zone: Zone;
  specialty: string;
  historicalContext: string;
  estimatedCost: string;
  timings: string;
  location: string;
  coordinates: { lat: number; lng: number };
}
