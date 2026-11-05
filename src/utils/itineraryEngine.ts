import {
  Destination,
  ItineraryPreference,
  ItineraryStop,
  GeneratedItinerary,
  Category,
  StartingLocation,
  TravelMode
} from '../types';
import { DESTINATIONS, STARTING_LOCATIONS } from '../data/destinations';
import {
  calculateDistanceKm,
  estimateTravelTimeMinutes,
  getMultiStopRouteUrl,
  getSingleDestinationMapUrl
} from './geo';

/**
 * Format minutes from midnight to readable "HH:MM AM/PM"
 */
export function minutesToTimeString(totalMinutes: number): string {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours24 = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const formattedMins = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours12}:${formattedMins} ${period}`;
}

/**
 * Parses "09:00" or "14:30" string to minutes from midnight
 */
export function parseStartTimeToMinutes(timeStr: string): number {
  if (!timeStr || !timeStr.includes(':')) return 9 * 60; // Default 09:00 AM
  const [h, m] = timeStr.split(':').map(Number);
  return (isNaN(h) ? 9 : h) * 60 + (isNaN(m) ? 0 : m);
}

/**
 * Detailed verified budget info without inventing prices
 */
export function getVerifiedBudgetInfo(dest: Destination): string {
  const fee = dest.practicalInfo.entryFee.toLowerCase();
  if (fee.includes('free') && dest.category === 'Spiritual') {
    return 'Entry: ₹0 (Free). 24/7 Guru Ka Langar / sacred Prasad provided at no cost.';
  }
  if (fee.includes('free')) {
    if (dest.category === 'Shopping' || dest.category === 'Culture') {
      return 'Entry: ₹0 (Free public access). Food and textile shopping costs vary at personal discretion.';
    }
    return 'Entry: ₹0 (Free verified public heritage access). No mandatory fee.';
  }
  if (dest.id === 'kranti-udyan-memorial') {
    return 'Entry: ₹20 per adult (official Department of Archaeology & Museums tariff); children under 10 free.';
  }
  if (dest.id === 'subhash-chandra-bose-park') {
    return 'Entry: ₹10 nominal municipal upkeep fee.';
  }
  return `Entry: ${dest.practicalInfo.entryFee}. Additional guided facility costs are not officially verified.`;
}

/**
 * Explains transparently why a place was selected by the rule-based engine
 */
export function generateSelectionReason(
  dest: Destination,
  prefs: ItineraryPreference,
  startLocation: StartingLocation,
  distFromPrevKm: number,
  isAnchor: boolean
): string {
  const reasons: string[] = [];

  // Interest alignment
  if (prefs.interests.includes(dest.category)) {
    reasons.push(`Directly matches your interest in ${dest.category}`);
  }

  // Proximity to starting point or previous stop
  if (isAnchor) {
    reasons.push(`Sensibly positioned near your starting point at ${startLocation.name} (~${distFromPrevKm} km)`);
  } else {
    reasons.push(`Logically sequenced ~${distFromPrevKm} km from the previous stop to prevent backtracking`);
  }

  // Hidden gem characteristic
  if (dest.isGem) {
    reasons.push('Uncovers a lesser-known authentic Ambala landmark often missed by transit visitors');
  }

  return reasons.join('. ') + '.';
}

/**
 * Generates transit advice between two specific geographical points
 */
export function getTransitAdviceText(
  fromName: string,
  toName: string,
  distKm: number,
  mode: TravelMode
): string {
  if (distKm <= 0.8) {
    return `Short walk (~${distKm} km) through local lanes from ${fromName} to ${toName}.`;
  }
  if (mode === 'walking-rickshaw') {
    return `Electric rickshaw / auto ride (~${distKm} km) connecting ${fromName} with ${toName}.`;
  }
  return `Direct drive via main thoroughfare (~${distKm} km) between ${fromName} and ${toName}.`;
}

/**
 * Generates curator context note for an individual stop
 */
function getCuratorNote(dest: Destination, stopIndex: number, totalStops: number): string {
  if (stopIndex === 0) {
    return `Recommended starting point. Arrive at ${dest.name} early to enjoy serene atmosphere before midday warmth.`;
  }
  if (stopIndex === totalStops - 1) {
    if (dest.category === 'Shopping' || dest.category === 'Culture') {
      return `Ideal finale. Immerse yourself in Ambala's evening bazaar glow and indulge in local street treats.`;
    }
    if (dest.category === 'Nature') {
      return `Perfect winding-down destination to catch golden sunset reflections and cool evening breeze.`;
    }
    return `Concluding heritage stop. Reflect on Ambala's untold history as dusk settles over the city.`;
  }
  if (dest.category === 'Spiritual') {
    return `Take time to experience peace, observe architectural artistry, and savor sacred Prasad / Langar.`;
  }
  return `Explore the intricate details and hidden corners that casual travelers frequently overlook.`;
}

/**
 * Recalculates timeline for a sequence of stops starting from a StartingLocation
 */
export function recalculateStopsTimelineWithStart(
  destinations: Destination[],
  startingLocation: StartingLocation,
  startMinutes: number,
  mode: TravelMode = 'car-taxi'
): ItineraryStop[] {
  let currentMinutes = startMinutes;
  const stops: ItineraryStop[] = [];

  for (let i = 0; i < destinations.length; i++) {
    const dest = destinations[i];
    const visitDuration = dest.practicalInfo.suggestedDurationMinutes || 45;

    // Calculate transit from previous point
    let distFromPrev = 0;
    let travelTimeFromPrev = 0;
    let fromName = startingLocation.name;

    if (i === 0) {
      // Transit from Starting Location
      distFromPrev = calculateDistanceKm(
        startingLocation.coordinates.lat,
        startingLocation.coordinates.lng,
        dest.location.coordinates.lat,
        dest.location.coordinates.lng
      );
      travelTimeFromPrev = estimateTravelTimeMinutes(distFromPrev, mode);
      fromName = startingLocation.name;
    } else {
      // Transit from previous destination
      const prevDest = destinations[i - 1];
      distFromPrev = calculateDistanceKm(
        prevDest.location.coordinates.lat,
        prevDest.location.coordinates.lng,
        dest.location.coordinates.lat,
        dest.location.coordinates.lng
      );
      travelTimeFromPrev = estimateTravelTimeMinutes(distFromPrev, mode);
      fromName = prevDest.name;
    }

    // Arrival time at this destination
    const arrivalMinutes = currentMinutes + travelTimeFromPrev;
    const startStr = minutesToTimeString(arrivalMinutes);
    const departureMinutes = arrivalMinutes + visitDuration;
    const endStr = minutesToTimeString(departureMinutes);

    // Calculate travel to next destination if not last
    let travelTimeToNext: number | undefined = undefined;
    let distToNext: number | undefined = undefined;
    let transitTip: string | undefined = undefined;

    if (i < destinations.length - 1) {
      const nextDest = destinations[i + 1];
      distToNext = calculateDistanceKm(
        dest.location.coordinates.lat,
        dest.location.coordinates.lng,
        nextDest.location.coordinates.lat,
        nextDest.location.coordinates.lng
      );
      travelTimeToNext = estimateTravelTimeMinutes(distToNext, mode);
      transitTip = getTransitAdviceText(dest.name, nextDest.name, distToNext, mode);
    }

    const transitAdviceFromPrev = getTransitAdviceText(fromName, dest.name, distFromPrev, mode);

    stops.push({
      stopNumber: i + 1,
      destination: dest,
      startTime: startStr,
      endTime: endStr,
      visitDurationMinutes: visitDuration,
      travelFromPrevious: {
        distanceKm: distFromPrev,
        travelMinutes: travelTimeFromPrev,
        mode,
        transitAdvice: transitAdviceFromPrev
      },
      travelTimeToNextMinutes: travelTimeToNext,
      distanceToNextKm: distToNext,
      transitTip,
      selectionReason: generateSelectionReason(
        dest,
        {
          duration: '4h',
          interests: [dest.category],
          budget: 'Flexible',
          startingLocationId: startingLocation.id,
          travelMode: mode,
          startTime: '09:00'
        },
        startingLocation,
        distFromPrev,
        i === 0
      ),
      verifiedBudgetInfo: getVerifiedBudgetInfo(dest),
      curatorNote: getCuratorNote(dest, i, destinations.length)
    });

    currentMinutes = departureMinutes;
  }

  return stops;
}

/**
 * Backward compatibility recalculateStopsTimeline
 */
export function recalculateStopsTimeline(
  destinations: Destination[],
  startMinutes: number,
  mode: TravelMode = 'car-taxi'
): ItineraryStop[] {
  const defaultStart = STARTING_LOCATIONS[0];
  return recalculateStopsTimelineWithStart(destinations, defaultStart, startMinutes, mode);
}

export type ItineraryEngineResult =
  | { success: true; itinerary: GeneratedItinerary }
  | { success: false; reason: 'incomplete_preferences' | 'no_matching_destinations' | 'insufficient_time'; message: string };

/**
 * REAL Rule-Based Recommendation Algorithm
 * - Respects selected interests strictly.
 * - Does NOT recommend destinations just to fill time.
 * - Uses real Haversine distance from chosen Starting Location.
 * - Respects time budget (2h = max 120m, 4h = max 240m, full-day = max 480m).
 */
export function generateSmartItinerary(prefs: ItineraryPreference): ItineraryEngineResult {
  const { duration, interests, budget, startingLocationId, travelMode, startTime } = prefs;

  // 1. Incomplete preferences check
  if (!interests || interests.length === 0) {
    return {
      success: false,
      reason: 'incomplete_preferences',
      message: 'Please select at least one area of interest (e.g. Heritage, Spiritual, Culture) to generate your journey.'
    };
  }

  // 2. Identify Starting Location
  const startLocation = STARTING_LOCATIONS.find(s => s.id === startingLocationId) || STARTING_LOCATIONS[0];

  // 3. Time Budget in Minutes
  let maxTotalMinutes = 120; // 2 hours
  let maxStopLimit = 2;
  if (duration === '4h') {
    maxTotalMinutes = 240; // 4 hours
    maxStopLimit = 3;
  } else if (duration === 'full-day') {
    maxTotalMinutes = 480; // 8 hours
    maxStopLimit = 5;
  }

  // 4. Filter Candidate Destinations by Selected Interests ONLY
  // "Do not recommend destinations just to fill the itinerary"
  let candidates = DESTINATIONS.filter(dest => interests.includes(dest.category));

  if (candidates.length === 0) {
    return {
      success: false,
      reason: 'no_matching_destinations',
      message: `No destinations currently match the selected interest categories: ${interests.join(', ')}.`
    };
  }

  // 5. Budget Filtering based on verified data
  if (budget === 'Free') {
    candidates = candidates.filter(dest => {
      const fee = dest.practicalInfo.entryFee.toLowerCase();
      return fee.includes('free');
    });
  } else if (budget === 'Low-cost') {
    candidates = candidates.filter(dest => {
      const fee = dest.practicalInfo.entryFee.toLowerCase();
      // Allow free sites or nominal tickets <= ₹50
      return fee.includes('free') || fee.includes('nominal') || fee.includes('20') || fee.includes('10');
    });
  }

  if (candidates.length === 0) {
    return {
      success: false,
      reason: 'no_matching_destinations',
      message: `No destinations match your combination of interests (${interests.join(', ')}) under the "${budget}" budget filter. Try selecting "Flexible" budget.`
    };
  }

  // 6. Proximity Scoring from Starting Location
  // Score candidates based on:
  // - Distance from start
  // - Hidden gem promotion (bonus)
  // - High visitor rating
  const scoredCandidates = candidates.map(dest => {
    const distToStart = calculateDistanceKm(
      startLocation.coordinates.lat,
      startLocation.coordinates.lng,
      dest.location.coordinates.lat,
      dest.location.coordinates.lng
    );

    let score = 100;
    // Distance penalty: prioritize closer sites to starting point
    score -= distToStart * 4;

    // Bonus for Hidden Gems
    if (dest.isGem) score += 20;

    // Rating contribution
    score += dest.rating * 5;

    return { dest, distToStart, score };
  });

  scoredCandidates.sort((a, b) => b.score - a.score);

  // 7. Sequential Greedy Selection respecting Time Budget
  const selectedDestinations: Destination[] = [];
  let accumulatedMinutes = 0;
  let currentLat = startLocation.coordinates.lat;
  let currentLng = startLocation.coordinates.lng;

  // Pool of remaining candidates
  let remaining = [...scoredCandidates];

  while (remaining.length > 0 && selectedDestinations.length < maxStopLimit) {
    let bestNextIndex = -1;
    let bestHeuristic = -Infinity;
    let bestTravelTime = 0;

    for (let i = 0; i < remaining.length; i++) {
      const item = remaining[i];
      const dist = calculateDistanceKm(currentLat, currentLng, item.dest.location.coordinates.lat, item.dest.location.coordinates.lng);
      const travelTime = estimateTravelTimeMinutes(dist, travelMode);
      const visitTime = item.dest.practicalInfo.suggestedDurationMinutes || 45;

      // Check if adding this stop fits within max time budget
      if (accumulatedMinutes + travelTime + visitTime <= maxTotalMinutes) {
        // Heuristic: high score minus distance from current stop
        const heuristic = item.score - dist * 5;
        if (heuristic > bestHeuristic) {
          bestHeuristic = heuristic;
          bestNextIndex = i;
          bestTravelTime = travelTime;
        }
      }
    }

    if (bestNextIndex !== -1) {
      const chosen = remaining[bestNextIndex];
      selectedDestinations.push(chosen.dest);
      accumulatedMinutes += bestTravelTime + (chosen.dest.practicalInfo.suggestedDurationMinutes || 45);
      currentLat = chosen.dest.location.coordinates.lat;
      currentLng = chosen.dest.location.coordinates.lng;
      remaining.splice(bestNextIndex, 1);
    } else {
      // No more stops fit within the time constraint
      break;
    }
  }

  // If even the first destination could not fit in the time
  if (selectedDestinations.length === 0) {
    return {
      success: false,
      reason: 'insufficient_time',
      message: `The available time of ${duration === '2h' ? '2 hours' : duration} is too short to comfortably visit the selected destinations and travel from ${startLocation.name}. Try extending your time or picking a closer starting point.`
    };
  }

  // 8. Build timeline with exact timestamps
  const startMinutes = parseStartTimeToMinutes(startTime);
  const stops = recalculateStopsTimelineWithStart(
    selectedDestinations,
    startLocation,
    startMinutes,
    travelMode
  );

  // Re-inject customized selection reasons
  for (let i = 0; i < stops.length; i++) {
    const s = stops[i];
    const prevDist = s.travelFromPrevious ? s.travelFromPrevious.distanceKm : 0;
    s.selectionReason = generateSelectionReason(s.destination, prefs, startLocation, prevDist, i === 0);
  }

  const totalVisitMinutes = stops.reduce((acc, s) => acc + s.visitDurationMinutes, 0);
  const totalTravelMinutes = stops.reduce((acc, s) => acc + (s.travelFromPrevious?.travelMinutes || 0), 0);
  const totalDurationMinutes = totalVisitMinutes + totalTravelMinutes;

  const primaryZone = Array.from(new Set(selectedDestinations.map(d => d.zone))).join(' & ');
  const categoryLabels = Array.from(new Set(selectedDestinations.map(d => d.category))).join(', ');

  const titlePrefix =
    duration === '2h'
      ? '2-Hour Express Discovery'
      : duration === '4h'
      ? 'Half-Day Cultural Sojourn'
      : 'Full-Day Grand Exploration';

  const title = `${titlePrefix} from ${startLocation.name}`;
  const summary = `Rule-based sequence starting at ${startLocation.name}, linking ${stops.length} verified destination${stops.length > 1 ? 's' : ''} across ${primaryZone} focusing on ${categoryLabels}. Arranged in geographical proximity to minimize transit time.`;

  // Calculate estimated budget only when reliable data exists
  let estimatedCost = '₹0 (100% Free Public Heritage)';
  if (budget === 'Free') {
    estimatedCost = '₹0 (All stops feature free verified public access)';
  } else {
    const hasTicketedMemorial = selectedDestinations.some(d => d.id === 'kranti-udyan-memorial');
    const hasTicketedPark = selectedDestinations.some(d => d.id === 'subhash-chandra-bose-park');
    let totalKnownTickets = 0;
    if (hasTicketedMemorial) totalKnownTickets += 20;
    if (hasTicketedPark) totalKnownTickets += 10;

    if (totalKnownTickets > 0) {
      estimatedCost = `₹${totalKnownTickets} verified entry tickets (all other stops are free)`;
    } else {
      estimatedCost = '₹0 verified entry fees (food/shopping discretionary)';
    }
  }

  const googleMapsRouteUrl = getMultiStopRouteUrl(selectedDestinations);

  const algorithmSummary = `Deterministic calculation: Evaluated candidate sites matching [${interests.join(', ')}] with budget '${budget}'. Clustered from '${startLocation.name}' using Haversine transit matrices to cap journey at ${Math.floor(totalDurationMinutes / 60)}h ${totalDurationMinutes % 60}m.`;

  const generatedItinerary: GeneratedItinerary = {
    id: `itin-${Date.now()}`,
    title,
    summary,
    startingLocation: startLocation,
    totalDurationMinutes,
    totalVisitMinutes,
    totalTravelMinutes,
    stops,
    estimatedCost,
    primaryZone,
    googleMapsRouteUrl,
    createdAt: new Date().toISOString(),
    algorithmSummary
  };

  return { success: true, itinerary: generatedItinerary };
}

/**
 * Backward compatibility wrapper
 */
export function generateItinerary(prefs: any): GeneratedItinerary {
  const result = generateSmartItinerary({
    duration: prefs.duration || '4h',
    interests: prefs.interests || ['Heritage'],
    budget: prefs.budget === 'free-only' ? 'Free' : 'Flexible',
    startingLocationId: prefs.startingLocationId || 'cantt-station',
    travelMode: prefs.travelMode || 'car-taxi',
    startTime: prefs.startTime || '09:00'
  });

  if (result.success) {
    return result.itinerary;
  }

  // Fallback to minimal safe itinerary
  const defaultDest = DESTINATIONS[0];
  const start = STARTING_LOCATIONS[0];
  const stops = recalculateStopsTimelineWithStart([defaultDest], start, 9 * 60, 'car-taxi');
  return {
    id: `itin-${Date.now()}`,
    title: `Ambala Discovery from ${start.name}`,
    summary: 'Curated itinerary based on verified Ambala landmarks.',
    startingLocation: start,
    totalDurationMinutes: 60,
    totalVisitMinutes: 45,
    totalTravelMinutes: 15,
    stops,
    estimatedCost: '₹0 (Free entry)',
    primaryZone: defaultDest.zone,
    googleMapsRouteUrl: getSingleDestinationMapUrl(defaultDest),
    createdAt: new Date().toISOString(),
    algorithmSummary: 'Single-stop default sequence.'
  };
}
