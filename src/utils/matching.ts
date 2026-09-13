import type { Farm, BeekeeperProfile, MatchResult } from '@/types';

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function calculateMatchScore(
  farm: Farm,
  beekeeper: BeekeeperProfile
): MatchResult {
  const weights = { crop: 25, flowering: 25, distance: 20, area: 15, availability: 15 };
  let score = 0;

  const cropMatch = beekeeper.preferredCrops.includes(farm.crop);
  if (cropMatch) score += weights.crop;

  const now = new Date();
  const floweringStart = new Date(farm.floweringStart);
  const floweringEnd = new Date(farm.floweringEnd);
  const floweringMatch =
    floweringEnd >= now &&
    (!beekeeper.availableFrom ||
      new Date(beekeeper.availableFrom) <= floweringEnd) &&
    (!beekeeper.availableUntil ||
      new Date(beekeeper.availableUntil) >= floweringStart);
  if (floweringMatch) score += weights.flowering;

  const bkLat = beekeeper.latitude ?? 22.3039;
  const bkLon = beekeeper.longitude ?? 70.8022;
  const distance = calculateDistance(bkLat, bkLon, farm.latitude, farm.longitude);
  const distanceMatch = distance <= 50;
  if (distanceMatch) score += weights.distance;

  const areaMatch = farm.area >= 5;
  if (areaMatch) score += weights.area;

  const availabilityMatch = beekeeper.availableBoxes >= 10;
  if (availabilityMatch) score += weights.availability;

  return {
    score,
    breakdown: {
      crop: cropMatch,
      flowering: floweringMatch,
      distance: distanceMatch,
      area: areaMatch,
      availability: availabilityMatch,
    },
  };
}

export function getRecommendedBeeBoxes(area: number): string {
  const min = Math.max(5, Math.floor(area * 1.5));
  const max = Math.max(min + 5, Math.floor(area * 2.5));
  return `${min}–${max} bee boxes`;
}
