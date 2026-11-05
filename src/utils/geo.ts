import { Destination } from '../types';

/**
 * Calculates Haversine distance in kilometers between two lat/lng coordinates
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

/**
 * Estimates realistic travel time in minutes based on distance and mode
 */
export function estimateTravelTimeMinutes(
  distanceKm: number,
  mode: 'walking-rickshaw' | 'car-taxi'
): number {
  if (distanceKm <= 0.2) return 5;
  if (mode === 'walking-rickshaw') {
    // Average speed in bustling Ambala lanes: ~15 km/h for e-rickshaw + 3 min boarding buffer
    return Math.max(5, Math.round((distanceKm / 15) * 60) + 3);
  }
  // Car / Cab: ~25 km/h in city traffic + 5 min parking buffer
  return Math.max(8, Math.round((distanceKm / 25) * 60) + 5);
}

/**
 * Generates Google Maps Directions URL for a single destination
 */
export function getSingleDestinationMapUrl(dest: Destination): string {
  const query = encodeURIComponent(`${dest.name}, ${dest.location.address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Generates a multi-stop sequential Google Maps Route URL
 */
export function getMultiStopRouteUrl(destinations: Destination[]): string {
  if (destinations.length === 0) return 'https://www.google.com/maps';
  if (destinations.length === 1) return getSingleDestinationMapUrl(destinations[0]);

  const origin = encodeURIComponent(
    `${destinations[0].name}, ${destinations[0].location.address}`
  );
  const destination = encodeURIComponent(
    `${destinations[destinations.length - 1].name}, ${destinations[destinations.length - 1].location.address}`
  );

  if (destinations.length === 2) {
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
  }

  // Waypoints between origin and destination
  const waypoints = destinations
    .slice(1, destinations.length - 1)
    .map(d => encodeURIComponent(`${d.name}, ${d.location.address}`))
    .join('|');

  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=driving`;
}
