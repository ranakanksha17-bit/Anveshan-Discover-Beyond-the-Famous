import React, { useState } from 'react';
import { PassportState, Destination, Badge, VisitedRecord, GeneratedItinerary, Category } from '../types';
import { DESTINATIONS, BADGES } from '../data/destinations';
import { getSingleDestinationMapUrl } from '../utils/geo';
import { getBadgeProgressList, BadgeProgress } from '../utils/storage';
import {
  Award,
  Heart,
  CheckCircle2,
  Calendar,
  Star,
  MapPin,
  ExternalLink,
  Trash2,
  Download,
  RotateCcw,
  Compass,
  ShieldAlert,
  HeartHandshake,
  Gem,
  ShoppingBag,
  Trees,
  Landmark,
  Crown,
  Share2,
  FileText,
  Stamp,
  Sparkles,
  ArrowRight,
  Layers,
  Clock,
  Navigation
} from 'lucide-react';

interface TravelPassportProps {
  passport: PassportState;
  onRemoveFavorite: (destId: string) => void;
  onRemoveVisited: (destId: string) => void;
  onUpdateVisitedNote: (destId: string, record: VisitedRecord) => void;
  onDeleteItinerary: (itineraryId: string) => void;
  onReopenItinerary?: (itinerary: GeneratedItinerary) => void;
  onResetPassport: () => void;
  onSelectDestination: (dest: Destination) => void;
  onExploreClick: () => void;
}

export const TravelPassport: React.FC<TravelPassportProps> = ({
  passport,
  onRemoveFavorite,
  onRemoveVisited,
  onUpdateVisitedNote,
  onDeleteItinerary,
  onReopenItinerary,
  onResetPassport,
  onSelectDestination,
  onExploreClick
}) => {
  const [activePassportTab, setActivePassportTab] = useState<'stamps' | 'badges' | 'saved-journeys' | 'favorites'>('stamps');
  const [selectedBadgeForDetail, setSelectedBadgeForDetail] = useState<BadgeProgress | null>(null);

  // Visited Calculations
  const totalDestinations = DESTINATIONS.length;
  const visitedIds = Object.keys(passport.visited);
  const visitedCount = visitedIds.length;
  const progressPercent = Math.round((visitedCount / totalDestinations) * 100);

  // Visited destinations list
  const visitedDestinationsWithRecords = visitedIds
    .map(id => ({
      destination: DESTINATIONS.find(d => d.id === id),
      record: passport.visited[id]
    }))
    .filter((item): item is { destination: Destination; record: VisitedRecord } => Boolean(item.destination));

  // Categories Explored calculation
  const allCategories: Category[] = ['Heritage', 'Spiritual', 'Culture', 'Shopping', 'Nature'];
  const exploredCategories = Array.from(
    new Set(visitedDestinationsWithRecords.map(item => item.destination.category))
  );

  // Badges & Progress
  const badgeProgressList = getBadgeProgressList(passport);
  const unlockedBadgesCount = badgeProgressList.filter(b => b.isUnlocked).length;

  // Favorites
  const favoriteDestinations: Destination[] = passport.favorites
    .map(id => DESTINATIONS.find(d => d.id === id))
    .filter((d): d is Destination => Boolean(d));

  // Dynamic Title
  const getTravelerTitle = () => {
    if (visitedCount >= 8) return 'Grand Anveshak (Master Voyager)';
    if (visitedCount >= 5) return 'Ambala Local Legend';
    if (visitedCount >= 3) return 'Heritage & Cultural Seeker';
    if (visitedCount >= 1) return 'First Explorer';
    return 'Aspiring Voyager';
  };

  // Export JSON Backup
  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(passport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `anveshan_passport_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const renderBadgeIcon = (iconName: string, isUnlocked: boolean) => {
    const colorClass = isUnlocked ? 'text-amber-500 fill-amber-100' : 'text-charcoal-400';
    const props = { className: `w-7 h-7 ${colorClass}` };
    switch (iconName) {
      case 'Compass':
        return <Compass {...props} />;
      case 'Landmark':
        return <Landmark {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'HeartHandshake':
        return <HeartHandshake {...props} />;
      case 'Crown':
        return <Crown {...props} />;
      case 'Gem':
        return <Gem {...props} />;
      case 'Award':
        return <Award {...props} />;
      default:
        return <Award {...props} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* 1. OFFICIAL PASSPORT BOOKLET BANNER */}
      <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 text-ivory-100 rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-forest-700/80 mb-10 relative overflow-hidden">
        
        {/* Subtle Guilloché / Texture Effect */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D96B27_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-saffron-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          
          {/* Passport Masthead */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-forest-700/80 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-forest-800 text-saffron-400 border border-saffron-500/40 flex items-center justify-center shadow-gold">
                <Stamp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-saffron-400 uppercase font-bold block">
                  OFFICIAL DIGITAL CITIZEN PASSPORT • AMBALA
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-black tracking-wide text-white">
                  ANVESHAN PASSPORT
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right font-mono text-xs text-forest-300">
              <div>DOCUMENT: <strong className="text-white">ANV-AMB-{(visitedCount * 137 + 1042).toString(16).toUpperCase()}</strong></div>
              <div>STATUS: <strong className="text-emerald-400">ACTIVE &amp; VERIFIED</strong></div>
            </div>
          </div>

          {/* Traveler Dossier & Metrics Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
            
            {/* Identity & Rank */}
            <div className="lg:col-span-5 space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-saffron-500/20 text-saffron-300 text-xs font-mono font-bold border border-saffron-500/30">
                DISCOVERY TIER: LEVEL {Math.max(1, Math.min(5, Math.floor(visitedCount / 2) + 1))}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {getTravelerTitle()}
              </h2>
              <p className="text-xs sm:text-sm text-ivory-200/80 leading-relaxed max-w-md">
                Every verified destination you visit earns an official indelible visa stamp and advances your mastery of Haryana’s historic crossroads.
              </p>
            </div>

            {/* 4 Core Quantitative Metrics */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-forest-900/90 rounded-2xl p-4 border border-forest-700/60 text-center">
              <div className="p-2">
                <span className="block text-2xl sm:text-3xl font-serif font-black text-saffron-400">
                  {visitedCount}
                </span>
                <span className="text-[11px] text-forest-200 uppercase tracking-wider font-semibold block mt-0.5">
                  Visited ({progressPercent}%)
                </span>
              </div>

              <div className="p-2">
                <span className="block text-2xl sm:text-3xl font-serif font-black text-white">
                  {favoriteDestinations.length}
                </span>
                <span className="text-[11px] text-forest-200 uppercase tracking-wider font-semibold block mt-0.5">
                  Saved Places
                </span>
              </div>

              <div className="p-2">
                <span className="block text-2xl sm:text-3xl font-serif font-black text-amber-400">
                  {unlockedBadgesCount} / {BADGES.length}
                </span>
                <span className="text-[11px] text-forest-200 uppercase tracking-wider font-semibold block mt-0.5">
                  Badges Earned
                </span>
              </div>

              <div className="p-2">
                <span className="block text-2xl sm:text-3xl font-serif font-black text-white">
                  {exploredCategories.length} / {allCategories.length}
                </span>
                <span className="text-[11px] text-forest-200 uppercase tracking-wider font-semibold block mt-0.5">
                  Categories
                </span>
              </div>
            </div>

          </div>

          {/* Progress Bar & Categories Strip */}
          <div className="mt-8 pt-6 border-t border-forest-800 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-ivory-300 mb-2 font-mono">
                <span>AMBALA REGION DISCOVERED: <strong>{progressPercent}%</strong></span>
                <span>{visitedCount} of {totalDestinations} SITES VISITED</span>
              </div>
              <div className="w-full h-3 bg-forest-950 rounded-full overflow-hidden p-0.5 border border-forest-700">
                <div
                  className="h-full bg-gradient-to-r from-saffron-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Categories Explored Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-forest-400 text-[11px] uppercase tracking-wider font-semibold mr-1 flex items-center space-x-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Categories Explored:</span>
              </span>
              {allCategories.map(cat => {
                const isExplored = exploredCategories.includes(cat);
                const count = visitedDestinationsWithRecords.filter(item => item.destination.category === cat).length;
                return (
                  <span
                    key={cat}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      isExplored
                        ? 'bg-saffron-500/20 text-saffron-300 border-saffron-500/40 shadow-sm'
                        : 'bg-forest-900/50 text-forest-400 border-forest-800 line-through opacity-60'
                    }`}
                  >
                    <span>{cat}</span>
                    <strong className="text-white font-mono">({count})</strong>
                  </span>
                );
              })}
            </div>

          </div>

        </div>

      </div>

      {/* 2. PASSPORT NAVIGATION TABS */}
      <div className="bg-white rounded-2xl p-2 shadow-card border border-ivory-300 mb-8 flex flex-wrap gap-2 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActivePassportTab('stamps')}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 ${
            activePassportTab === 'stamps'
              ? 'bg-forest-800 text-white shadow-sm'
              : 'text-charcoal-700 hover:bg-ivory-100'
          }`}
        >
          <Stamp className="w-4 h-4 text-saffron-400" />
          <span>Visa Stamps &amp; Memories ({visitedCount})</span>
        </button>

        <button
          onClick={() => setActivePassportTab('badges')}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 ${
            activePassportTab === 'badges'
              ? 'bg-forest-800 text-white shadow-sm'
              : 'text-charcoal-700 hover:bg-ivory-100'
          }`}
        >
          <Award className="w-4 h-4 text-amber-500" />
          <span>Milestone Badges ({unlockedBadgesCount}/{BADGES.length})</span>
        </button>

        <button
          onClick={() => setActivePassportTab('saved-journeys')}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 ${
            activePassportTab === 'saved-journeys'
              ? 'bg-forest-800 text-white shadow-sm'
              : 'text-charcoal-700 hover:bg-ivory-100'
          }`}
        >
          <FileText className="w-4 h-4 text-forest-700" />
          <span>Saved Journeys ({passport.customItineraries.length})</span>
        </button>

        <button
          onClick={() => setActivePassportTab('favorites')}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 ${
            activePassportTab === 'favorites'
              ? 'bg-forest-800 text-white shadow-sm'
              : 'text-charcoal-700 hover:bg-ivory-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${favoriteDestinations.length > 0 ? 'text-saffron-600 fill-saffron-600' : ''}`} />
          <span>Saved Favourites ({favoriteDestinations.length})</span>
        </button>
      </div>

      {/* TAB 1: VISAS, STAMPS & VISITED MEMORIES */}
      {activePassportTab === 'stamps' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2">
            <div>
              <h3 className="font-serif text-2xl font-bold text-forest-900">
                Official Passport Visa Stamps ({visitedCount} Visited)
              </h3>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Each destination you explore receives an official indelible stamp recorded with your personal memories.
              </p>
            </div>
            <button
              onClick={onExploreClick}
              className="text-xs font-semibold text-saffron-600 hover:underline flex items-center space-x-1"
            >
              <span>Explore More Destinations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {visitedCount === 0 ? (
            <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-ivory-300 shadow-card">
              <div className="w-16 h-16 rounded-2xl bg-ivory-100 border border-ivory-300 text-forest-800 flex items-center justify-center mx-auto mb-4">
                <Stamp className="w-8 h-8 opacity-70" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-forest-950 mb-2">
                No Passport Stamps Issued Yet
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto mb-6 leading-relaxed">
                Start your adventure in Ambala. Open any destination card or details page and click <strong>“Mark as Visited”</strong> to collect your first official stamp and unlock achievement badges.
              </p>
              <button
                onClick={onExploreClick}
                className="px-6 py-3 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white text-xs sm:text-sm font-semibold shadow-md transition-all inline-flex items-center space-x-2"
              >
                <Compass className="w-4 h-4 text-saffron-400" />
                <span>Discover Ambala Landmarks</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visitedDestinationsWithRecords.map(({ destination, record }) => (
                <div
                  key={destination.id}
                  className="bg-white rounded-3xl p-6 shadow-card border border-ivory-300 hover:border-forest-600/40 transition-all flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Visual Rubber Passport Stamp in Background Corner */}
                  <div className="absolute top-4 right-4 pointer-events-none opacity-85 rotate-[-8deg]">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-forest-800/60 p-1 flex items-center justify-center">
                      <div className="w-full h-full rounded-full border border-forest-800/40 flex flex-col items-center justify-center text-center p-1">
                        <span className="text-[7px] font-mono uppercase tracking-widest text-forest-900 font-bold">OFFICIAL</span>
                        <span className="text-[9px] font-serif font-black text-forest-950 leading-none">AMBALA</span>
                        <span className="text-[7px] font-mono text-saffron-700 font-bold mt-0.5">{record.date}</span>
                        <span className="text-[7px] text-forest-800 tracking-tighter">★ VISITED ★</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Destination Header */}
                    <div className="flex items-start space-x-4 pr-24">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-16 h-16 rounded-2xl object-cover shadow-sm flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-semibold text-saffron-700 uppercase">
                            {destination.category}
                          </span>
                          <span className="text-charcoal-300">•</span>
                          <span className="text-[10px] text-charcoal-500">{destination.zone}</span>
                        </div>

                        <h4
                          onClick={() => onSelectDestination(destination)}
                          className="font-serif text-lg font-bold text-forest-950 hover:text-saffron-600 cursor-pointer transition-colors leading-snug"
                        >
                          {destination.name}
                        </h4>
                      </div>
                    </div>

                    {/* Stamp Visit Details */}
                    <div className="mt-4 pt-3 border-t border-ivory-200 flex items-center justify-between text-xs">
                      <span className="text-charcoal-600 font-medium">
                        Stamped on: <strong className="text-charcoal-900 font-mono">{record.date}</strong>
                      </span>
                      {record.rating && (
                        <span className="text-amber-500 font-bold flex items-center space-x-1">
                          <span>{'★'.repeat(record.rating)}</span>
                          <span className="text-charcoal-500 text-[11px]">({record.rating}/5)</span>
                        </span>
                      )}
                    </div>

                    {/* Personal Field Note */}
                    {record.note ? (
                      <div className="mt-3 bg-ivory-100 p-3 rounded-2xl border border-ivory-200 text-xs text-charcoal-700 italic">
                        “{record.note}”
                      </div>
                    ) : (
                      <div className="mt-3 text-[11px] text-charcoal-400 italic">
                        No personal note added yet. Click edit to log your memory.
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-5 pt-3 border-t border-ivory-200 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onSelectDestination(destination)}
                      className="font-semibold text-forest-800 hover:text-forest-950 hover:underline"
                    >
                      Edit Memory / Dossier →
                    </button>

                    <div className="flex items-center space-x-2">
                      <a
                        href={getSingleDestinationMapUrl(destination)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-charcoal-600 hover:text-forest-800 hover:bg-ivory-200"
                        title="Directions in Google Maps"
                      >
                        <MapPin className="w-3.5 h-3.5 text-forest-700" />
                      </a>

                      <button
                        onClick={() => {
                          if (window.confirm(`Undo visited stamp for ${destination.name}?`)) {
                            onRemoveVisited(destination.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-600 hover:bg-red-50"
                        title="Undo visited status"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ACHIEVEMENTS & BADGES WITH PROGRESS BARS */}
      {activePassportTab === 'badges' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2">
            <div>
              <h3 className="font-serif text-2xl font-bold text-forest-900">
                Milestone Discovery Badges
              </h3>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Earn badges as you explore Ambala. Badges unlock automatically when their conditions are met.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full self-start sm:self-auto">
              {unlockedBadgesCount} of {BADGES.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {badgeProgressList.map(({ badge, current, target, percent, isUnlocked, unlockedAt }) => {
              return (
                <div
                  key={badge.id}
                  className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                    isUnlocked
                      ? 'bg-white border-amber-300 shadow-card hover:shadow-gold'
                      : 'bg-ivory-100/70 border-ivory-300/80 opacity-80'
                  }`}
                >
                  <div>
                    {/* Badge Icon & Status */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        isUnlocked
                          ? 'bg-gradient-to-tr from-amber-100 to-saffron-50 border border-amber-300 shadow-sm'
                          : 'bg-ivory-200 border border-ivory-300'
                      }`}>
                        {renderBadgeIcon(badge.iconName, isUnlocked)}
                      </div>

                      {isUnlocked ? (
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full uppercase">
                          Unlocked ✓
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-charcoal-500 bg-ivory-200 px-2 py-0.5 rounded">
                          In Progress
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-lg font-bold text-forest-950 mb-1">
                      {badge.title}
                    </h4>

                    <p className="text-xs text-charcoal-600 leading-relaxed mb-4">
                      {badge.description}
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="pt-4 border-t border-ivory-200">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                      <span className="text-charcoal-500">{badge.criteriaDescription}</span>
                      <span className="font-mono font-bold text-charcoal-800">
                        {current} / {target}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-ivory-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isUnlocked ? 'bg-amber-500' : 'bg-forest-700'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    {isUnlocked && unlockedAt && (
                      <span className="block text-[10px] text-amber-800 font-mono mt-2">
                        Earned on {unlockedAt.split('T')[0]}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SAVED JOURNEYS (ITINERARIES) */}
      {activePassportTab === 'saved-journeys' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2">
            <div>
              <h3 className="font-serif text-2xl font-bold text-forest-900">
                Saved Travel Journeys ({passport.customItineraries.length})
              </h3>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Custom itineraries created using the Smart Local Itinerary Engine and saved locally.
              </p>
            </div>
          </div>

          {passport.customItineraries.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-ivory-300 shadow-card">
              <div className="w-16 h-16 rounded-2xl bg-ivory-100 border border-ivory-300 text-forest-800 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 opacity-70" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-forest-950 mb-2">
                No Saved Itineraries Yet
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto mb-6 leading-relaxed">
                Open <strong>"Plan My Journey"</strong> to generate a custom sequence tailored to your available time and interests, then click <strong>"Save Itinerary"</strong>.
              </p>
              <button
                onClick={() => onExploreClick()}
                className="px-6 py-3 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white text-xs sm:text-sm font-semibold shadow-md inline-flex items-center space-x-2"
              >
                <Compass className="w-4 h-4 text-saffron-400" />
                <span>Explore Destinations</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {passport.customItineraries.map(itin => (
                <div
                  key={itin.id}
                  className="bg-white rounded-3xl p-6 shadow-card border border-ivory-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono text-saffron-600 uppercase font-bold bg-saffron-50 px-2 py-0.5 rounded border border-saffron-200">
                        {itin.stops.length} STOPS SEQUENCE
                      </span>
                      <span className="text-xs text-charcoal-500">
                        Starts at {itin.startingLocation?.name || 'Ambala'}
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-forest-950">
                      {itin.title}
                    </h4>

                    <p className="text-xs text-charcoal-600 max-w-2xl leading-relaxed">
                      {itin.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-600 pt-1">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-forest-700" />
                        <span>Duration: <strong>{Math.floor(itin.totalDurationMinutes / 60)}h {itin.totalDurationMinutes % 60}m</strong></span>
                      </span>
                      <span>•</span>
                      <span>Budget: <strong>{itin.estimatedCost}</strong></span>
                      <span>•</span>
                      <span className="truncate max-w-xs">Route: {itin.stops.map(s => s.destination.name).join(' → ')}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-end lg:self-center">
                    {onReopenItinerary && (
                      <button
                        onClick={() => onReopenItinerary(itin)}
                        className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold shadow-sm transition-all flex items-center space-x-1.5"
                      >
                        <Compass className="w-3.5 h-3.5 text-saffron-400" />
                        <span>Reopen Journey</span>
                      </button>
                    )}

                    <a
                      href={itin.googleMapsRouteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl border border-ivory-300 hover:bg-ivory-100 text-charcoal-800 text-xs font-semibold flex items-center space-x-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5 text-saffron-600" />
                      <span>Google Maps Route</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => {
                        if (window.confirm('Delete this saved itinerary?')) {
                          onDeleteItinerary(itin.id);
                        }
                      }}
                      className="p-2 rounded-xl text-charcoal-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200"
                      title="Delete saved itinerary"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SAVED FAVOURITES */}
      {activePassportTab === 'favorites' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2">
            <div>
              <h3 className="font-serif text-2xl font-bold text-forest-900">
                Bookmarked Favourites ({favoriteDestinations.length})
              </h3>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Places you have bookmarked across Ambala for your next journey.
              </p>
            </div>
          </div>

          {favoriteDestinations.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-ivory-300 shadow-card">
              <Heart className="w-12 h-12 text-saffron-600 mx-auto mb-3 opacity-60" />
              <h4 className="font-serif text-xl font-bold text-forest-950 mb-2">No favourites saved yet</h4>
              <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto mb-6">
                Click the heart icon on any destination card to bookmark places into your passport.
              </p>
              <button
                onClick={onExploreClick}
                className="px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs sm:text-sm font-semibold shadow-md transition-all"
              >
                Discover Destinations
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteDestinations.map(dest => (
                <div
                  key={dest.id}
                  className="bg-white rounded-3xl overflow-hidden border border-ivory-300 shadow-card flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] bg-ivory-200">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => onRemoveFavorite(dest.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-saffron-600 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                      title="Remove from favorites"
                    >
                      <Heart className="w-4 h-4 fill-saffron-600" />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-saffron-700">{dest.category}</span>
                      <h4
                        onClick={() => onSelectDestination(dest)}
                        className="font-serif text-lg font-bold text-forest-950 hover:text-saffron-600 cursor-pointer mt-1"
                      >
                        {dest.name}
                      </h4>
                      <p className="text-xs text-charcoal-600 mt-1 line-clamp-2">{dest.tagline}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-ivory-200 flex items-center justify-between">
                      <button
                        onClick={() => onSelectDestination(dest)}
                        className="text-xs font-bold text-forest-800 hover:text-forest-950"
                      >
                        View Story →
                      </button>
                      <a
                        href={getSingleDestinationMapUrl(dest)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-charcoal-600 hover:text-forest-800 flex items-center space-x-1"
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. PASSPORT FOOTER: DATA PERSISTENCE & RESTORE CONTROLS */}
      <div className="mt-14 pt-6 border-t border-ivory-300 flex flex-wrap items-center justify-between gap-4 text-xs text-charcoal-600">
        <div>
          <span>Local Storage Persistence active: All your visits, stamps, notes &amp; itineraries stay on this device.</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportData}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-ivory-300 bg-white hover:bg-ivory-100 font-semibold text-charcoal-700 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-forest-700" />
            <span>Export Passport (JSON)</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset your passport, badges, and saved favorites? This cannot be undone.')) {
                onResetPassport();
              }
            }}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-semibold shadow-sm transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Passport Data</span>
          </button>
        </div>
      </div>

    </div>
  );
};
