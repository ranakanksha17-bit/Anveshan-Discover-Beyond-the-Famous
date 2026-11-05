import { PassportState, GeneratedItinerary, Destination, Badge, VisitedRecord } from '../types';
import { DESTINATIONS, BADGES } from '../data/destinations';

const STORAGE_KEY = 'anveshan_passport_v1';

export const INITIAL_PASSPORT_STATE: PassportState = {
  favorites: ['european-cemetery', 'ambala-cloth-market'],
  visited: {},
  unlockedBadges: {},
  customItineraries: []
};

export function loadPassportState(): PassportState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PASSPORT_STATE;
    const parsed = JSON.parse(raw);
    return {
      favorites: Array.isArray(parsed.favorites) ? Array.from(new Set(parsed.favorites.filter((f: any) => typeof f === 'string'))) : [],
      visited: parsed.visited && typeof parsed.visited === 'object' && !Array.isArray(parsed.visited) ? parsed.visited : {},
      unlockedBadges: parsed.unlockedBadges && typeof parsed.unlockedBadges === 'object' && !Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : {},
      customItineraries: Array.isArray(parsed.customItineraries) ? parsed.customItineraries : []
    };
  } catch (e) {
    console.error('Error loading passport from localStorage:', e);
    return INITIAL_PASSPORT_STATE;
  }
}

export function savePassportState(state: PassportState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving passport to localStorage:', e);
  }
}

export interface BadgeProgress {
  badge: Badge;
  current: number;
  target: number;
  percent: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}

/**
 * Calculates current progress for all achievement badges
 */
export function getBadgeProgressList(state: PassportState): BadgeProgress[] {
  const visitedIds = Object.keys(state.visited);
  const visitedDestinations: Destination[] = visitedIds
    .map(id => DESTINATIONS.find(d => d.id === id))
    .filter((d): d is Destination => Boolean(d));

  const totalCount = visitedDestinations.length;
  const heritageCount = visitedDestinations.filter(d => d.category === 'Heritage').length;
  const cultureCount = visitedDestinations.filter(d => d.category === 'Culture' || d.category === 'Shopping').length;
  const spiritualCount = visitedDestinations.filter(d => d.category === 'Spiritual').length;
  const gemCount = visitedDestinations.filter(d => d.isGem).length;

  return BADGES.map(badge => {
    let current = 0;
    let target = 1;

    switch (badge.id) {
      case 'badge-first-explorer':
        current = totalCount;
        target = 1;
        break;
      case 'badge-heritage-hunter':
        current = heritageCount;
        target = 3;
        break;
      case 'badge-culture-explorer':
        current = cultureCount;
        target = 3;
        break;
      case 'badge-spiritual-seeker':
        current = spiritualCount;
        target = 3;
        break;
      case 'badge-local-legend':
        current = totalCount;
        target = 5;
        break;
      case 'badge-hidden-gem-hunter':
        current = gemCount;
        target = 2;
        break;
      case 'badge-grand-anveshak':
        current = totalCount;
        target = 8;
        break;
      default:
        current = totalCount;
        target = 1;
    }

    const isUnlocked = Boolean(state.unlockedBadges[badge.id]) || current >= target;
    const clampedCurrent = Math.min(target, current);
    const percent = Math.min(100, Math.round((clampedCurrent / target) * 100));

    return {
      badge,
      current: clampedCurrent,
      target,
      percent,
      isUnlocked,
      unlockedAt: state.unlockedBadges[badge.id]
    };
  });
}

/**
 * Evaluates achievement criteria and returns any newly unlocked badge
 */
export function evaluateBadges(
  currentState: PassportState
): { updatedBadges: Record<string, string>; newlyUnlocked: Badge[] } {
  const visitedIds = Object.keys(currentState.visited);
  const visitedDestinations: Destination[] = visitedIds
    .map(id => DESTINATIONS.find(d => d.id === id))
    .filter((d): d is Destination => Boolean(d));

  const updatedBadges = { ...currentState.unlockedBadges };
  const newlyUnlocked: Badge[] = [];
  const nowISO = new Date().toISOString();

  const tryUnlock = (badgeId: string, condition: boolean) => {
    if (condition && !updatedBadges[badgeId]) {
      updatedBadges[badgeId] = nowISO;
      const badgeObj = BADGES.find(b => b.id === badgeId);
      if (badgeObj) newlyUnlocked.push(badgeObj);
    }
  };

  const totalCount = visitedDestinations.length;
  const heritageCount = visitedDestinations.filter(d => d.category === 'Heritage').length;
  const cultureCount = visitedDestinations.filter(d => d.category === 'Culture' || d.category === 'Shopping').length;
  const spiritualCount = visitedDestinations.filter(d => d.category === 'Spiritual').length;
  const gemCount = visitedDestinations.filter(d => d.isGem).length;

  // 1. First Explorer: Visit your first destination
  tryUnlock('badge-first-explorer', totalCount >= 1);

  // 2. Heritage Hunter: Visit 3 heritage destinations
  tryUnlock('badge-heritage-hunter', heritageCount >= 3);

  // 3. Culture Explorer: Explore 3 cultural/bazaar destinations
  tryUnlock('badge-culture-explorer', cultureCount >= 3);

  // 4. Spiritual Seeker: Visit 3 spiritual destinations
  tryUnlock('badge-spiritual-seeker', spiritualCount >= 3);

  // 5. Local Legend: Visit 5 different destinations
  tryUnlock('badge-local-legend', totalCount >= 5);

  // 6. Hidden Gem Hunter: Visit 2+ hidden gems
  tryUnlock('badge-hidden-gem-hunter', gemCount >= 2);

  // 7. Grand Anveshak: Visit 8+ destinations
  tryUnlock('badge-grand-anveshak', totalCount >= 8);

  return { updatedBadges, newlyUnlocked };
}
