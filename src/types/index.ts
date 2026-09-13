export type UserRole = 'farmer' | 'beekeeper';

export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

export type FarmStatus = 'available' | 'requested' | 'booked';

export interface User {
  id: string;
  name: string;
  mobile: string;
  password: string;
  role: UserRole;
  village?: string;
  district?: string;
  state?: string;
}

export interface BeekeeperProfile {
  userId: string;
  totalBoxes: number;
  availableBoxes: number;
  deployedBoxes: number;
  availableFrom?: string;
  availableUntil?: string;
  preferredCrops: string[];
  latitude?: number;
  longitude?: number;
}

export interface Farm {
  id: string;
  farmerId: string;
  name: string;
  village: string;
  district: string;
  state: string;
  area: number;
  latitude: number;
  longitude: number;
  crop: string;
  cropVariety: string;
  sowingDate: string;
  floweringStart: string;
  floweringEnd: string;
  harvestDate: string;
  irrigationAvailable: boolean;
  farmingMethod: string;
  pesticideUsage: string;
  notes: string;
  status: FarmStatus;
}

export interface Request {
  id: string;
  farmId: string;
  farmerId: string;
  beekeeperId: string;
  beeBoxes: number;
  startDate: string;
  endDate: string;
  message: string;
  status: RequestStatus;
  createdAt: string;
}

export interface Session {
  userId: string;
  role: UserRole;
}

export interface MatchBreakdown {
  crop: boolean;
  flowering: boolean;
  distance: boolean;
  area: boolean;
  availability: boolean;
}

export interface MatchResult {
  score: number;
  breakdown: MatchBreakdown;
}
